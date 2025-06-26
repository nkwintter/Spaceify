import React, { useState } from "react";
import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { styles } from "./styles";
// import astronauta from "./assets/astronauta.png";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const handleLogin = () => {
    console.log('Login com :', email, senha);

  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={astronauta}
        style={styles.image}
      /> */}
      <Text style={styles.title}>SPACEFY</Text>

      <View style={styles.loginBox}>
        {/* <Image
          source={spotifyLogo}
          style={styles.spotifyIcon}
        /> */}
        <Text style={styles.label}>E-mail:</Text>

        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite o seu e-mail"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.inputSenha}
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite a sua Senha"
          placeholderTextColor="#ccc"
          secureTextEntry={!senhaVisivel}
        />
        <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} >
          <Text style={styles.olho}>{senhaVisivel ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>

        <Text style={styles.subText}> conecte a sua conta Spotify</Text>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>CONECTAR-SE</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default LoginScreen;
