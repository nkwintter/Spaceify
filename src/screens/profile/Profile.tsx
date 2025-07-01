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
import { useSpotifyAuth } from "../../context/SpotifyAuthContext";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
import styles from "./profile.styles";

const Profile = () => {
  // USANDO HOOK DO CONTEXT
  const { user, logout } = useSpotifyAuth();

  // NAVEGAÇÃO ENTRE TELAS PARA REDIRECIONAR LOGOUT PARA LOGIN
  const navigation = useNavigation<any>();

  // ESTADOS EDITÁVEIS E MODAL PARA EDITAR PERFIL
  const [customName, setCustomName] = useState("");
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // CARREGAR DADOS DO ASYNCSTORAGE POSSIBILITANDO CARREGAR ALTERAÇÕES
  useEffect(() => {
    const loadCustomData = async () => {
      const nameLocal = await AsyncStorage.getItem("customName");
      const avatarLocal = await AsyncStorage.getItem("customAvatar");
      if (nameLocal) setCustomName(nameLocal);
      if (avatarLocal) setCustomAvatar(avatarLocal);
    };
    loadCustomData();
    // [] PERMITE EXECUTAR APENAS UMA VEZ
  }, []);

  // DADOS PARA ABRIR NA PÁGINA. CASO O NOME OU O AVATAR TENHAM SIDO
  // CUSTOMIZADOS, ELE SERÁ PRIORIDADE. CASO CONTRÁRIO, CARREGA DO SPOTIFY.
  // CASO NÃO POSSUA NADA, RETORNA PADRÃO.
  const nameToShow = customName || user?.display_name || "Astronauta";
  const avatarToShow = customAvatar || user?.images?.[0]?.url || null;
  const emailToShow = user?.email || ""; 

  // CARREGAR IMAGEM DO USUÁRIO PARA EDIÇÃO
  const pickImage = async () => {
    // ABRE A GALERIA DE IMAGENS COM O IMAGEPICKER
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      // SALVA O CAMINHO DA IMAGEM NO CUSTOM AVATAR
      setCustomAvatar(result.assets[0].uri);
    }
  };

  // SALVA AS EDIÇÕES LOCALMENTE, API DO SPOTIFY NÃO PERMITE MUDANÇAS EXTERNAS
  const saveEdits = async () => {
    try {
      await AsyncStorage.setItem("customName", customName);
      if (customAvatar) {
        await AsyncStorage.setItem("customAvatar", customAvatar);
      }
      // DESABILITA O MODAL DE EDIÇÃO
      setModalVisible(false);
      Alert.alert("Sucesso", "Perfil atualizado!");
    } catch (err) {
      Alert.alert("Erro", "Falha ao salvar as edições");
    }
  };

  // CARREGA LOGOUT DO CONTEXTO
  const handleLogout = async () => {
    await logout();
    // LIMPA TAMBÉM AS PERSONALIZAÇÕES LOCAIS
    await AsyncStorage.multiRemove(["customName", "customAvatar"]);
    // VAI PARA A TELA DE LOGIN
    navigation.replace("Login"); 
  };


  // FUNÇÃO PARA EXPORTAR PDF
  const handleExportPDF = async () => {
    // CARREGANDO DO CONTEXT
    const nameToShow = customName || user?.display_name || "Astronauta";
    const emailToShow = user?.email || "Email não disponível";

    // DOCUMENTO QUE SERÁ CONVERTIDO EM PDF
    const htmlContent = `
    <h1>Spaceify - Perfil do Astronauta</h1>
    <p><strong>Nome:</strong> ${nameToShow}</p>
    <p><strong>Email:</strong> ${emailToShow}</p>
    <p><strong>Exportado em:</strong> ${new Date().toLocaleString()}</p>
  `;

    // DOCUMENTO QUE SERÁ CONVERTIDO EM PDF
    // NOME DO DOCUMENTO
    // ONDE SERÁ SALVO
    try {
      const options = {
        html: htmlContent,
        fileName: "Perfil_Spaceify",
        directory: "Documents",
      };

      // FILE CAMINHO DO PDF GERADO
      // RNHTML VEM DO PACOTE IMPORTADO QUE TRANSFORMARÁ O ARQUIVO EM PDF
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert("Sucesso", `PDF salvo em:\n${file.filePath}`);
      console.log("PDF criado em:", file.filePath);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível exportar o PDF");
      console.error(error);
    }
  };

  // FICA MAIS INTUITIVO ORGANIZAR O MEU CSS COM ALGUNS COMANDOS EM PORTUGÊS,
  // PARA ASSIMILAÇÃO, NÃO ESTRANHEM KK
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
      <Text style={styles.email}>{emailToShow}</Text>

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
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Editar Nome</Text>
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
