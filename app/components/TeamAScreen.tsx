import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale, ScaledSheet } from "react-native-size-matters";


const TeamAScreen = ({ sendMessage, message }: { sendMessage: (value: string) => void, message: string }) => {
    // const handlePress = () => {
    //     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    //     sendMessage("TEAMA");
    // }
    return (
        <View style={styles.buttonContainer}>
            {/* <Text style={styles.title}>{message}</Text> */}
            {message == "" ?
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => sendMessage("TEAMA")} style={styles.buzzer}>
                        <Text style={styles.buttonTextRed}>I know this song</Text>
                    </TouchableOpacity>

                    <Text style={styles.buttonText}>Team A</Text>
                </View>
                :
                <Text style={styles.buttonTextRed}>
                    Waiting for DJ to reset
                </Text>
            }
            {/* <TouchableOpacity style={styles.button}>
            </TouchableOpacity> */}
        </View>
    )
}

export default TeamAScreen

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
        backgroundColor: '#ff00004b',
        borderRadius: scale(100),
        width: scale(200),
        height: scale(200),
        borderColor: '#d70400ff',
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
        color: '#da0101ff',
        fontWeight: 'bold',
        fontSize: scale(16),
    },
    buttonTextRed: {
        color: '#d70400ff',
        fontWeight: 'bold',
        fontSize: scale(26),
        textAlign: 'center',
    },
})