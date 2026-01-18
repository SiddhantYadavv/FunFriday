import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from 'expo-network';
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScaledSheet, scale } from "react-native-size-matters";


const djColor = "#7e6ee8";
const teamColorA = "#ff0000";
const teamColorB = "#2eba2e";

const Roles = () => {

    const [myIp, setMyIp] = useState('');

    useEffect(() => {
        const getIp = async () => {
            const ip = await Network.getIpAddressAsync();
            setMyIp(ip);
        };

        getIp();
    }, []);


    const clearData = async () => {
        await AsyncStorage.clear();
        router.replace("/");
    }

    const getName = async () => {
        const name = await AsyncStorage.getItem('name');
        return name;
    }

    const goToResults = (role: string) => {
        router.push({
            pathname: "/pages/Results",
            params: {
                myIp: myIp,
                role: role,
            }
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.greetingTitle}>Hello {getName()}</Text>
            <Text style={styles.title}>Continue as</Text>

            {/* DJ */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => goToResults("DJ")}
                    style={[styles.button, styles.djColor]}
                >
                    <MaterialCommunityIcons
                        name="account-music"
                        size={scale(60)}
                        color={djColor}
                    />
                </TouchableOpacity>
                <Text
                    onPress={() => goToResults("DJ")}
                    style={[styles.buttonText, styles.djColorText]}
                >
                    DJ
                </Text>
            </View>

            {/* Teams */}
            <View style={styles.flexRow}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => goToResults("TEAMA")}
                        style={[styles.button, styles.teamColorA]}>
                        <FontAwesome
                            name="users"
                            size={scale(42)}
                            color={teamColorA}
                        />
                    </TouchableOpacity>
                    <Text
                        onPress={() => goToResults("TEAMA")}
                        style={[styles.buttonText, styles.teamColorAText]}>
                        TEAM A
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => goToResults("TEAMB")}
                        style={[styles.button, styles.teamColorB]}>
                        <FontAwesome
                            name="users"
                            size={scale(42)}
                            color={teamColorB}
                        />
                    </TouchableOpacity>
                    <Text
                        onPress={() => goToResults("TEAMB")}
                        style={[styles.buttonText, styles.teamColorBText]}>
                        TEAM B
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={clearData}
                style={styles.clearButton}
            >
                <FontAwesome5 name="trash" size={24} color="red" />
                <Text style={styles.clearButtonText}>Clear Data</Text>
            </TouchableOpacity>
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

    greetingTitle: {
        fontSize: "36@s",
        fontWeight: "bold",
        textAlign: "center",
        color: "#fff",
        fontFamily: "roboto",
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

    clearButton: {
        marginTop: "40@vs",
        borderWidth: scale(2),
        borderColor: "#ff0000",
        padding: "10@s",
        borderRadius: "5@s",
        flexDirection: "row",
        alignItems: "center",
        gap: scale(10),
    },

    clearButtonText: {
        color: "#ff0000",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: "20@s",
    },
});

export default Roles;
