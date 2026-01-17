import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
// @ts-ignore
import Zeroconf from "react-native-zeroconf";
import { ScaledSheet, scale } from "react-native-size-matters";
import TcpSocket from "react-native-tcp-socket";
import AsyncStorage from "@react-native-async-storage/async-storage";

const zeroconf = new Zeroconf();

const djColor = "#7e6ee8";
const teamColorA = "#ff0000";
const teamColorB = "#2eba2e";

const Roles = () => {

    const [isScanning, setIsScanning] = useState(false);
    const [devices, setDevices] = useState<string[]>([]);


    useEffect(() => {
        const server = TcpSocket.createServer(socket => {
            socket.on("data", data => {
                const msg = JSON.parse(data.toString());
                console.log("📩 Received:", msg);
            });
        });

        server.listen({ port: 8080 });

        return () => {
            server.close();
        };
    }, []);


    useEffect(() => {

        zeroconf.on("start", () => {
            setIsScanning(true);
        });
        zeroconf.on('stop', () => {
            setIsScanning(false);
        })

        setTimeout(() => {
            zeroconf.stop();
        }, 10000);


        zeroconf.publishService('funfriday', 'tcp', 'local.', 'MyWebServer', 8080, {
            path: '/api',
            version: '1.0',
        })


        zeroconf.on("resolved", async (service: any) => {
            setDevices(prev => {
                const newAddresses = service.addresses.filter((addr: string) => !prev.includes(addr));
                return [...prev, ...newAddresses];
            });
        });
        zeroconf.on("remove", (name: string) => {
            setDevices(prev => prev.filter(device => device !== name));
        });

        zeroconf.scan("funfriday", "tcp", "local.");


        return () => {
            zeroconf.stop();
            zeroconf.removeAllListeners();
        };
    }, []);
    const services = zeroconf.getServices()

    console.log('IIIII:', devices)

    const clearData = async () => {
        await AsyncStorage.clear();
        router.replace("/");
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text onPress={clearData} style={styles.title}>Continue as</Text>

            {/* DJ */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => router.push("/pages/Results")}
                    style={[styles.button, styles.djColor]}
                >
                    <MaterialCommunityIcons
                        name="account-music"
                        size={scale(60)}
                        color={djColor}
                    />
                </TouchableOpacity>
                <Text
                    onPress={() => router.push("/pages/Results")}
                    style={[styles.buttonText, styles.djColorText]}
                >
                    DJ
                </Text>
            </View>

            {/* Teams */}
            <View style={styles.flexRow}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.teamColorA]}>
                        <FontAwesome
                            name="users"
                            size={scale(42)}
                            color={teamColorA}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.buttonText, styles.teamColorAText]}>
                        TEAM A
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.teamColorB]}>
                        <FontAwesome
                            name="users"
                            size={scale(42)}
                            color={teamColorB}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.buttonText, styles.teamColorBText]}>
                        TEAM B
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const BUTTON_SIZE = scale(110);

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: "20@s",
        backgroundColor: '#101010ff',
    },

    title: {
        marginBottom: "40@vs",
        fontSize: "36@s",
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        fontFamily: "roboto",
    },

    flexRow: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20@vs",
    },

    buttonContainer: {
        alignItems: "center",
        marginHorizontal: "14@s",
    },

    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: scale(4),
        marginBottom: "6@vs",
    },

    buttonText: {
        fontSize: "20@s",
        fontWeight: "bold",
        marginTop: "-6@vs",
    },

    djColor: {
        backgroundColor: "#7e6ee85e",
        borderColor: "#7e6ee8a3",
    },

    teamColorA: {
        backgroundColor: "#ff000059",
        borderColor: "#ff0000fd",
    },

    teamColorB: {
        backgroundColor: "#2eba2e67",
        borderColor: "#2eba2ef6",
    },

    teamColorAText: {
        color: "#ff0000",
    },

    teamColorBText: {
        color: "#2eba2e",
    },

    djColorText: {
        color: "#7e6ee8",
    },
});

export default Roles;
