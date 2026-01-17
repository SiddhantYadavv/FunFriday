import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
// @ts-ignore
import Zeroconf, { Service } from 'react-native-zeroconf';
import { useEffect, useState } from "react";

const zeroconf = new Zeroconf();


const djColor = "#7e6ee8"
const teamColorA = "#ff0000"
const teamColorB = "#2eba2e"

export default function Index() {


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Continue as</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push("/pages/Results")} style={[styles.button, styles.djColor]}>
          <MaterialCommunityIcons style={styles.icon} name="account-music" size={70} color={djColor} />
        </TouchableOpacity>
        <Text onPress={() => router.push("/pages/Results")} style={[styles.buttonText, styles.djColorText]}>DJ</Text>
      </View>
      <View style={styles.flexRow}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.teamColorA]}>
            <FontAwesome style={styles.icon} name="users" size={50} color={teamColorA} />
          </TouchableOpacity>
          <Text style={[styles.buttonText, styles.teamColorAText]}>TEAM A</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.teamColorB]}>
            <FontAwesome style={styles.icon} name="users" size={50} color={teamColorB} />
          </TouchableOpacity>
          <Text style={[styles.buttonText, styles.teamColorBText]}>TEAM B</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: 50,
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    color: "#444444",
    fontFamily: "roboto"

  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  icon: {
    position: "absolute"
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: 10
  },
  button: {
    padding: 10,
    margin: 10,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderWidth: 5,
    position: "relative"
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: -15
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
    color: "#ff0000"
  },
  teamColorBText: {
    color: "#2eba2e"
  },
  djColorText: {
    color: "#7e6ee8"
  }
});
