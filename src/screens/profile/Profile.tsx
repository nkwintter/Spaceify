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
  SafeAreaView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSpotifyAuth } from "../../context/SpotifyAuthContext";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useNavigation } from "@react-navigation/native";
import { getStyles } from "./profile.styles";
import { useTheme } from "../../context/ThemeContext";
import { Feather } from "@expo/vector-icons";

const Profile = () => {
  // USANDO HOOK DO CONTEXT
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const { colors, fonts, gradients } = theme;
  const styles = getStyles(theme);

  // USANDO HOOK DO CONTEXT
  const { user, logout } = useSpotifyAuth();

  // CARREGAR DAS PLAYLISTS GERADAS
  const [playlistsGeradas, setPlaylistsGeradas] = useState<any[]>([]);
  const [moodMaisRecorrente, setMoodMaisRecorrente] = useState("");
  const [ultimaImagem, setUltimaImagem] = useState("");

  // NAVEGAÇÃO ENTRE TELAS PARA REDIRECIONAR LOGOUT PARA LOGIN
  const navigation = useNavigation<any>();

  // ESTADOS EDITÁVEIS E MODAL PARA EDITAR PERFIL, CONFIGURAÇÕES
  const [customName, setCustomName] = useState("");
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

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
    // VAI PARA A TELA DE LOGIN
    navigation.replace("Login");
  };

  // FUNÇÃO PARA EXPORTAR PDF
  const handleExportPDF = async () => {
    // CARREGANDO DO CONTEXT
    const nameToShow = customName || user?.display_name || "Astronauta";
    const emailToShow = user?.email || "Email não disponível";

    // DOCUMENTO QUE SERÁ EXPORTADO
    const content = `
    Spaceify - Perfil do Astronauta\n
    Nome: ${nameToShow}\n
    Email: ${emailToShow}\n
    Exportado em: ${new Date().toLocaleString()}
  `;

    const fileUri = FileSystem.documentDirectory + "perfil_spaceify.txt";

    try {
      await FileSystem.writeAsStringAsync(fileUri, content);
      await Sharing.shareAsync(fileUri);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível compartilhar");
      console.error("Erro ao exportar:", error);
    }
  };

  // ESTADO FAVORITES
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // FUNÇÃO QUE CARREGA OS FAVORITOS SALVOS NO ASYNCSTORAGE
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };

    // EXECUTA UMA VEZ AO INICIAR
    loadFavorites();
  }, []);

  // FUNÇÃO PARA LIMPAR AS PLAYLISTS FAVORITAS
  const handleClearFavorites = async () => {
    // REMOVE DO ARMAZENAMENTO DA ASYNCSTORAGE
    try {
      await AsyncStorage.removeItem("favorites");
      // LIMPA O ESTADO
      setFavorites([]);
      Alert.alert("Sucesso", "Sem playlists favoritas!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao limpar as playlists favoritas.");
      console.error(error);
    }
  };

  // CARREGAR ESTATÍSTICAS AO ABRIR O APP
  useEffect(() => {
    const carregarEstatisticas = async () => {
      const data = await AsyncStorage.getItem("playlistsGeradas");
      if (data) {
        const parsed = JSON.parse(data);
        setPlaylistsGeradas(parsed);

        if (parsed.length > 0) {
          const ultima = parsed[parsed.length - 1];
          setUltimaImagem(ultima.imageTitle);

          const contagem: Record<string, number> = {};
          parsed.forEach((p: any) => {
            contagem[p.mood] = (contagem[p.mood] || 0) + 1;
          });

          const maisRecorrente = Object.entries(contagem).reduce((a, b) =>
            a[1] > b[1] ? a : b
          )[0];

          setMoodMaisRecorrente(maisRecorrente);
        }
      }
    };

    carregarEstatisticas();
  }, []);

  // FICA MAIS INTUITIVO ORGANIZAR O MEU CSS COM ALGUNS COMANDOS EM PORTUGÊS,
  // PARA ASSIMILAÇÃO, NÃO ESTRANHEM KK
  return (
    <View style={{ flex: 1 }}>
      {/* MANCHAS DE FUNDO */}
      <View style={styles.manchasContainer}>
        <View style={styles.manchaRoxa} />
        <View style={styles.manchaAzul} />
      </View>

      {/* LOGOUT */}
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? "#0F0F0F" : "#FFFFFF",
        }}
      >
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityLabel="Botão de Logout"
        >
          <Feather
            name="log-out"
            size={24}
            color={isDarkTheme ? "#1EBFDB" : "#1E4789"}
          />
        </TouchableOpacity>
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
              accessibilityLabel="Editar Avatar"
            >
              <Feather
                name="edit"
                size={18}
                color={theme === "dark" ? "#FFFFFF" : "#0F0F0F"}
              />
            </TouchableOpacity>
          </View>

          {/* INFORMAÇÕES */}
          <Text style={styles.name}>{nameToShow}</Text>
          <Text style={styles.email}>{emailToShow}</Text>

          {/* AÇÕES RÁPIDAS E ESTATÍSTICAS */}
          <ImageBackground
          source={require('../../../assets/fundo1.jpg')}
          style={styles.boxContainer}
          imageStyle={{ borderRadius: 16 }}
          >
            {/* AÇÕES RÁPIDAS */}
            <Text style={styles.boxTitle}>Ações Rápidas</Text>
            <View>
              <TouchableOpacity
                style={[styles.acaoBotao, { marginBottom: 10 }]}
                onPress={() => setModalVisible(true)}
                accessibilityLabel="Editar Perfil"
              >
                <Text style={styles.acaoTexto}>Editar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.acaoBotao}
                onPress={handleLogout}
                accessibilityLabel="Logout"
              >
                <Text style={styles.acaoTexto}>Logout</Text>
              </TouchableOpacity>
            </View>

            {/* ESTATÍSTICAS PESSOAIS */}
            <Text style={[styles.boxTitle, { marginTop: 24 }]}>
              Estatísticas Pessoais
            </Text>
            <View>
              <Text
                style={[styles.statusTexto, { color: "#B3D4F9", marginBottom: 8 }]}
              >
                TOTAL DE PLAYLISTS: {playlistsGeradas.length}
              </Text>
              <Text
                style={[styles.statusTexto, { color: "#B3D4F9", marginBottom: 8 }]}
              >
                ÚLTIMA IMAGEM: {ultimaImagem || "🎧"}
              </Text>
              <Text style={[styles.statusTexto, { color: "#B3D4F9" }]}>
                MOOD MAIS RECORRENTE: {moodMaisRecorrente || "Exploração Cósmica"}
              </Text>
            </View>
          </ImageBackground>

          {/* PLAYLISTS FAVORITAS */}
          <Text style={styles.title}>Playlists Favoritas</Text>
          {favorites.length > 0 ? (
            favorites.map((item, index) => (
              <View key={index} style={styles.playlistCard}>
                <Image
                  source={{
                    uri: "https://cdn-icons-png.flaticon.com/512/8598/8598143.png",
                  }}
                  style={styles.playlistImg}
                />
                <Text style={styles.playlistName}>{item}</Text>
                <TouchableOpacity>
                  <Text style={{ color: "#fff" }}>👁</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.statusTexto}>Nenhuma playlist favorita ainda</Text>
          )}

          {/* EXPORTAR PERFIL */}
          <TouchableOpacity style={styles.exportarBotao} onPress={handleExportPDF}>
            <Text style={styles.exportarTexto}>EXPORTAR PDF</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

      {/* BOTÃO DE ENGENHAGEM FIXO */}
      <TouchableOpacity
        style={styles.botaoEngrenagem}
        onPress={() => setShowSettings(!showSettings)}
        accessibilityLabel="Botão de configurações"
      >
        <Feather
          name="settings"
          size={24}
          color={theme === "dark" ? "#0F0F0F" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {showSettings && (
        <View style={styles.menuConfig}>
          <TouchableOpacity style={styles.menuItem} onPress={toggleTheme}>
            <Text style={styles.menuText}>Alternar Tema</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleClearFavorites}>
            <Text style={styles.menuText}>Limpar Playlists Favoritas</Text>
          </TouchableOpacity>
        </View>
      )}

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
          <View style={{ backgroundColor: "#fff", padding: 20, borderRadius: 12 }}>
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
    </View>
  );
};

export default Profile;