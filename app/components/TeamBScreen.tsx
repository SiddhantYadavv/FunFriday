import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale, ScaledSheet } from "react-native-size-matters";

const TeamBScreen = ({ sendMessage, message }: { sendMessage: (value: string) => void, message: string }) => {
    return (
        <View style={styles.buttonContainer}>
            {/* <Text style={styles.title}>{message}</Text> */}
            {message == "" ?
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => sendMessage("TEAMB")} style={styles.buzzer}>
                        <Text style={styles.buttonTextGreen}>I know this song</Text>
                    </TouchableOpacity>

                    <Text style={styles.buttonText}>Team B</Text>
                </View>
                :
                <Text style={styles.buttonTextGreen}>
                    Waiting for DJ to reset
                </Text>
            }
            {/* <TouchableOpacity style={styles.button}>
            </TouchableOpacity> */}
        </View>
    )
}

export default TeamBScreen

const styles = ScaledSheet.create({

    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#fff',
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: scale(10),
        paddingVertical: scale(100),

    },

    buzzer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(10),
        backgroundColor: '#00ff1154',
        borderRadius: scale(100),
        width: scale(200),
        height: scale(200),
        borderColor: '#04db32ff',
        borderWidth: scale(4),
    },
    button: {
        padding: scale(10),
        borderColor: '#da0101ff',
        borderWidth: scale(4),
        borderRadius: scale(5),
        width: scale(200),
        height: scale(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#04db32ff',
        fontWeight: 'bold',
        fontSize: scale(16),
    },
    buttonTextGreen: {
        color: '#04db32ff',
        fontWeight: 'bold',
        fontSize: scale(26),
        textAlign: 'center',
    },
})