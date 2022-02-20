import React, { useState } from "react";
import firebase from "../database/firebase";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  ActivityIndicator,
  TextInput,
} from "react-native";

export default function Register() {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
  });

  const updateInputVal = (value, prop) => {
    const regState = register;
    regState[prop] = value;
    setRegister({ ...regState });
  };

  // onChangeText={(value) => updateInputVal(value, "name")}

  const registerUser = () => {
    if (register.email === "" || register.password === "") {
      Alert.alert("Fill in all the required areas!");
    } else {
      setRegister({ loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(register.email, register.password)
        .then((res) => {
          res.user.UpdateProfile({
            name: register.name,
          });
          console.log("Register Succesful");
          setRegister({
            name: "",
            loading: false,
            email: "",
            password: "",
          });
          props.navigation.navigate("login").catch((err) => {
            setRegister({ errorMassage: err.massage });
          });
        });
    }
  };
  if (register.loading) {
    return (
      <View style={styles.preloader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Enter your name"
          value={register.name}
          style={styles.input}
          onChangeText={(value) => updateInputVal(value, "name")}
        />
        <TextInput
          placeholder="Enter an email address"
          value={register.email}
          style={styles.email}
          onChangeText={(value) => updateInputVal(value, "email")}
        />
        <Button onPress={registerUser} title="Register" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
  },
  loginText: {
    color: "#3740FE",
    marginTop: 25,
    textAlign: "center",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
