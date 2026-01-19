import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { scale, ScaledSheet } from "react-native-size-matters";

const DjScreen = ({ sendMessage, message }: { sendMessage: (value: string) => void, message: string }) => {
    return (
        <View style={[styles.container, { backgroundColor: message == "TEAMA" ? "#ff0000" : message == "TEAMB" ? "#2eba2e" : "black" }]}>
            {/* <Text style={styles.title}>DJ Screen</Text> */}
            <Text style={styles.title}>{message == "TEAMA" ? "Team A pressed the buzzer" : message == "TEAMB" ? "Team B pressed the buzzer" : "Waiting for buzzer"}</Text>
            {message != "" && <TouchableOpacity style={styles.button} onPress={() => sendMessage("")}>
                <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>}
        </View>
    )
}

export default DjScreen

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#fff',
    },

    button: {
        marginTop: scale(20),
        paddingVertical: scale(10),
        backgroundColor: '#444444ff',
        borderRadius: scale(5),
        width: scale(200),
        alignItems: 'center',
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(30),
    },
})