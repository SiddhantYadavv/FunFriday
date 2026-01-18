import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScaledSheet, scale } from "react-native-size-matters"



const Index = () => {

  const [name, setName] = useState('');

  useEffect(() => {
    const getName = async () => {
      const name = await AsyncStorage.getItem('name');
      if (name) {
        router.replace("/pages/Roles");
      }
    }
    getName();
  }, []);

  const storeName = async (name: string) => {
    if (!name) return alert("Please enter your name");
    if (name.trim().length < 3) return alert("Name must be at least 3 characters long");
    if (name.trim().length > 10) return alert("Name must be at most 10 characters long");

    try {
      await AsyncStorage.setItem('name', name);
      router.replace("/pages/Roles");
    } catch (e) {
      console.error('Failed to store name:', e);
    }
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter your name</Text>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => storeName(name)}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Index

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#101010ff',
  },
  content: {
    width: scale(350),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: scale(30),
    fontWeight: 'bold',
    marginBottom: scale(20),
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: scale(10),
    paddingVertical: scale(15),
    marginBottom: scale(10),
    borderRadius: scale(5),
    color: '#fff',
  },
  button: {
    backgroundColor: '#484848ff',
    padding: scale(10),
    borderRadius: scale(5),
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: scale(20),
  },
})