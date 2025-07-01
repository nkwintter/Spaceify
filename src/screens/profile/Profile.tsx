import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as FileSystem from "expo-file-system";
import styles from "./profile.styles";

const SPOTIFY_TOKEN = ""; // TOKEN RECEBIDO DO LOGIN

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "", avatar: null });
  const [customName, setCustomName] = useState("");
  const [customAvatar, setCustomAvatar] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchSpotifyUserProfile();
      if (userData) setUser(userData);

      const nameLocal = await AsyncStorage.getItem("customName");
      const avatarLocal = await AsyncStorage.getItem("customAvatar");

      if (nameLocal) setCustomName(nameLocal);
      if (avatarLocal) setCustomAvatar(avatarLocal);
    };
    fetchData();
  }, []);

  const fetchSpotifyUserProfile = async () => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: SPOTIFY_TOKEN,
        },
      });

      return {
        name: response.data.display_name,
        email: response.data.email,
        avatar: response.data.images[0]?.url || null,
      };
    } catch (error) {
      console.error("Erro ao buscar perfil do Spotify", error);
      return null;
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setCustomAvatar(result.assets[0].uri);
    }
  };

  const saveEdits = async () => {
    try {
      await AsyncStorage.setItem("customName", customName);
      if (customAvatar)
        await AsyncStorage.setItem("customAvatar", customAvatar);
      setModalVisible(false);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (err) {
      Alert.alert("Erro", "Falha ao salvar as edições");
    }
  };

  const nameToShow = customName || user.name;
  const avatarToShow = customAvatar || user.avatar;

  const handleLogout = async () => {
    try {
        await AsyncStorage.multiRemove([
        "spotifyToken",
        "customName",
        "customAvatar",
        ]);
        Alert.alert("Logout", "Você saiu do perfil");
        navigation.replace('Login'); // certifique-se que 'navigation' está definido
    } catch (err) {
        Alert.alert("Erro", "Não foi possível fazer logout");
    }
  };

  const handleExportPDF = async () => {
    const nameToShow = customName || user.name;
    const emailToShow = user.email;

    const htmlContent = `
    <h1>Spaceify - Perfil do Astronauta</h1>
    <p><strong>Nome:</strong> ${nameToShow}</p>
    <p><strong>Email:</strong> ${emailToShow}</p>
    <p><strong>Exportado em:</strong> ${new Date().toLocaleString()}</p>
  `;

    try {
      const options = {
        html: htmlContent,
        fileName: "Perfil_Spaceify",
        directory: "Documents",
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("Sucesso", `PDF salvo em:\n${file.filePath}`);
      console.log("PDF criado em:", file.filePath);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível exportar o PDF");
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* CABEÇALHO */}
      <Text style={styles.inicio}>Olá, Astronauta</Text>

      {/* AVATAR */}
      <View style={styles.avatarSessao}>
        {avatarToShow ? (
          <Image source={{ uri: avatarToShow }} style={styles.avatar} />
        ) : (
          <View style={[styles.avatar, { backgroundColor: "#4E3592" }]} />
        )}

        <TouchableOpacity
          style={styles.editAvatar}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#fff" }}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* INFORMAÇÕES */}
      <Text style={styles.name}>{nameToShow}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* AÇÕES RÁPIDAS */}
      <View style={styles.acoes}>
        <TouchableOpacity style={styles.acaoBotao}>
          <Text style={styles.acaoTexto}> Alternar Tema</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acaoBotao}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.acaoTexto}> Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acaoBotao} onPress={handleLogout}>
          <Text style={styles.acaoTexto}> Logout</Text>
        </TouchableOpacity>
      </View>

      {/* PLAYLISTS FAVORITAS */}
      <Text style={styles.title}>Minhas Playlists Favoritas</Text>
      <View style={styles.playlistCard}>
        <View style={styles.playlistInfo}>
          <Text style={styles.playlistName}></Text>
          <View style={styles.playlistButtons}>
            <TouchableOpacity></TouchableOpacity>
            <TouchableOpacity></TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ESTATÍSTICAS PESSOAIS */}
      <Text style={styles.title}>Estatísticas Pessoais</Text>
      <View style={styles.status}>
        <Text style={styles.statusTexto}> Total de playlists </Text>
        <Text style={styles.statusTexto}> Mood mais recorrente </Text>
        <Text style={styles.statusTexto}> Última imagem </Text>
      </View>

      {/* EXPORTAR PERFIL */}
      <TouchableOpacity style={styles.exportarBotao} onPress={handleExportPDF}>
        <Text style={styles.exportarTexto}> Exportar Perfil (PDF)</Text>
      </TouchableOpacity>

      {/* CONFIGURAÇÕES AVANÇADAS */}
      <Text style={styles.title}>Configurações Avançadas</Text>
      <TouchableOpacity style={styles.avancado}>
        <Text style={styles.avancadoTexto}> Mudar idioma</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.avancado}>
        <Text style={styles.avancadoTexto}> Mudar senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.avancado}>
        <Text style={styles.avancadoTexto}> Limpar playlists salvas</Text>
      </TouchableOpacity>

      {/* MODAL EDIÇÃO */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12 }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Editar Nome
            </Text>
            <TextInput
              placeholder="Novo nome"
              value={customName}
              onChangeText={setCustomName}
              style={{ borderBottomWidth: 1, marginBottom: 20 }}
            />
            <TouchableOpacity style={styles.acaoBotao} onPress={pickImage}>
              <Text style={styles.acaoTexto}>Trocar Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acaoBotao} onPress={saveEdits}>
              <Text style={styles.acaoTexto}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.acaoBotao, { backgroundColor: "#aaa" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.acaoTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Profile;
