import { useKeepAwake } from 'expo-keep-awake';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { scale, ScaledSheet } from 'react-native-size-matters';
import TcpSocket from 'react-native-tcp-socket';
// @ts-ignore
import Zeroconf from 'react-native-zeroconf';

import DjScreen from '../components/DjScreen';
import TeamAScreen from '../components/TeamAScreen';
import TeamBScreen from '../components/TeamBScreen';

const PORT = 8080;
const SERVICE_TYPE = 'funfriday';
const SERVICE_NAME = 'dj-server';

const zeroconf = new Zeroconf();

export default function Results() {
    useKeepAwake();

    const { myIp, role } = useLocalSearchParams();

    const [djIp, setDjIp] = useState<string | null>(null);
    const [message, setMessage] = useState('');

    const serverRef = useRef<any>(null);
    const clientsRef = useRef<Record<string, any>>({});
    const clientRef = useRef<any>(null);

    /* ===================== DJ: PUBLISH + SERVER ===================== */
    useEffect(() => {
        if (role !== 'DJ') return;

        // Publish DJ service
        zeroconf.publishService(
            SERVICE_TYPE,
            'tcp',
            'local.',
            SERVICE_NAME,
            PORT,
            { role: 'DJ' }
        );

        // Start TCP server
        const server = TcpSocket.createServer((socket) => {
            const remoteIp = socket.remoteAddress!;
            console.log(`📥 Client connected: ${remoteIp}`);

            clientsRef.current[remoteIp] = socket;

            socket.on('data', (data) => {
                const msg = data.toString().trim();
                console.log(`📩 From ${remoteIp}: ${msg}`);

                // DJ = source of truth
                setMessage(msg);

                // Broadcast to ALL teams
                Object.values(clientsRef.current).forEach((client: any) => {
                    client.write(`${msg}\n`);
                });
            });

            socket.on('close', () => {
                delete clientsRef.current[remoteIp];
                console.log(`🔌 Client disconnected: ${remoteIp}`);
            });

            socket.on('error', (err) => {
                console.log('❌ Server socket error', err);
            });
        });

        server.listen({ port: PORT, host: '0.0.0.0' }, () => {
            console.log(`🚀 DJ server listening on ${PORT}`);
        });

        serverRef.current = server;

        return () => {
            zeroconf.stop();
            zeroconf.removeAllListeners();
            server.close();
            serverRef.current = null;
        };
    }, [role]);

    /* ===================== TEAM: DISCOVER DJ ===================== */
    useEffect(() => {
        if (role === 'DJ') return;

        zeroconf.on('resolved', (service: any) => {
            // HARD FILTER: only accept DJ
            if (service.name !== SERVICE_NAME) return;

            const ip = service.addresses?.[0];
            if (!ip || clientRef.current) return;

            console.log(`🎯 Found DJ at ${ip}`);
            setDjIp(ip);
        });

        zeroconf.scan(SERVICE_TYPE, 'tcp', 'local.');

        return () => {
            zeroconf.stop();
            zeroconf.removeAllListeners();
        };
    }, [role]);

    /* ===================== TEAM: CONNECT TO DJ ===================== */
    useEffect(() => {
        if (role === 'DJ') return;
        if (!djIp) return;
        if (clientRef.current) return;

        console.log(`🔗 Connecting to DJ at ${djIp}`);

        const client = TcpSocket.createConnection(
            { host: djIp, port: PORT },
            () => console.log('✅ Connected to DJ')
        );

        client.on('data', (data) => {
            const msg = data.toString().trim();
            console.log(`📩 From DJ: ${msg}`);
            setMessage(msg);
        });

        client.on('close', () => {
            console.log('🔌 Disconnected from DJ');
            clientRef.current = null;
        });

        client.on('error', (err) => {
            console.log('❌ Client error', err);
        });

        clientRef.current = client;

        return () => {
            client.destroy();
            clientRef.current = null;
        };
    }, [djIp, role]);

    /* ===================== SEND MESSAGE ===================== */
    const sendMessage = (value: string) => {
        if (role === 'DJ') {
            // DJ sets and broadcasts
            setMessage(value);
            Object.values(clientsRef.current).forEach((client: any) => {
                client.write(`${value}\n`);
            });
        } else {
            // Teams send ONLY to DJ
            clientRef.current?.write(`${value}\n`);
        }
    };

    /* ===================== UI ===================== */
    return (
        <View style={styles.container}>
            {role === "DJ" ? (
                <DjScreen message={message} sendMessage={sendMessage} />
            ) : role === "TEAMA" ? (
                <TeamAScreen message={message} sendMessage={sendMessage} />
            ) : (
                <TeamBScreen message={message} sendMessage={sendMessage} />
            )}
        </View>
    );
}


const styles = ScaledSheet.create({
    container: { paddingVertical: scale(40), flex: 1, backgroundColor: "black" },
    title: { fontSize: scale(18), fontWeight: 'bold', color: '#fff' },
    subtitle: { marginTop: scale(10), fontWeight: 'bold' },
    button: { marginTop: scale(20), backgroundColor: '#000', padding: scale(10) },
    buttonText: { color: '#fff', textAlign: 'center' },


});

{/* <Text style={styles.title}>My IP: {myIp}</Text>

            <Text style={styles.subtitle}>Discovered Devices:</Text>
            {devices.map((ip) => (
                <Text key={ip}>🔗 {ip}</Text>
            ))}

            <TouchableOpacity style={styles.button} onPress={() => {
                setDevices([]);
                setRefresh((r) => !r);
            }}>
                <Text style={styles.buttonText}>Refresh</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={sendMessage}>
                <Text style={styles.buttonText}>Send Message</Text>
            </TouchableOpacity> */}