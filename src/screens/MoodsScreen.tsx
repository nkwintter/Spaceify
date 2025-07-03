
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { fetchApodList } from "../services/nasaApiService";
import BlobButton from "../components/BlobButton";
import Blob01 from "../assets/blob01.svg";
import Blob02 from "../assets/blob02.svg";
import Blob03 from "../assets/blob03.svg";
import Blob04 from "../assets/blob04.svg";
import Blob05 from "../assets/blob05.svg";
import Blob06 from "../assets/blob06.svg";
import Blob07 from "../assets/blob07.svg";
import Blob08 from "../assets/blob08.svg";
import Blob09 from "../assets/blob09.svg";
import Blob10 from "../assets/blob10.svg";
import { RootStackParamList } from "../navigation/types";




const blobComponents = [
  Blob01, Blob02, Blob03, Blob04, Blob05, Blob06, Blob07,
  Blob08, Blob09, Blob10,
];

// Categorias fixas para filtro
const categorias = [
  "nebulosa",
  "galáxia",
  "terra",
  "marte",
  "lua",
  "estrela",
  "hubble",
  "eclipse",
  "saturno",
  "andromeda",
];


// Tipagem do navigation para esta tela
type MoodsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Moods'>;


export default function MoodsScreen() {
  const navigation = useNavigation<MoodsScreenNavigationProp>();
  const [apodList, setApodList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [filtrados, setFiltrados] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Buscando 50 para maior chance no filtro
        const data = await fetchApodList(50);
        setApodList(data);
      } catch (e) {
        console.error("Erro ao carregar imagens:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!categoriaSelecionada) {
      setFiltrados([]);
      return;
    }
    const filtro = apodList.filter((item) =>
      item.title?.toLowerCase().includes(categoriaSelecionada.toLowerCase())
    );
    setFiltrados(filtro);
  }, [categoriaSelecionada, apodList]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando imagens da NASA...</Text>
      </View>
    );
  }

  if (!categoriaSelecionada) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>MOODS</Text>
        </View>
        <ScrollView contentContainerStyle={styles.blobContainer}>
          {categorias.map((categoria, i) => {
            const BlobComponent = blobComponents[i % blobComponents.length];
            return (
              <View style={styles.blobWrapper} key={categoria}>
                <BlobButton
                  label={categoria}
                  BlobComponent={BlobComponent}
                  onPress={() => setCategoriaSelecionada(categoria)}
                />
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>

        <Text style={styles.title}>Categoria: {categoriaSelecionada}</Text>

        <Text
          style={{ color: "white", marginVertical: 6, textAlign: "center" }}
          onPress={() => setCategoriaSelecionada(null)}
        >
          ← Voltar para categorias
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.blobContainer}>

        {filtrados.length === 0 ? (
          <Text style={{ color: "white", textAlign: "center" }}>
            Nenhuma imagem encontrada para essa categoria.
          </Text>
        ) : (
          filtrados.map((item, index) => {
            const label = item.title;
            const BlobComponent = blobComponents[index % blobComponents.length];
            return (
              <View style={styles.blobWrapper} key={label + index}>
                <BlobButton
                  label={label}
                  BlobComponent={BlobComponent}
                  onPress={() =>
                    navigation.navigate("Details", {
                      item,
                      categoria: categoriaSelecionada,
                    })
                  }
                />
              </View>
            );
          })
        )}
        {categorias.map((label, index) => {

          const BlobComponent = blobComponents[index % blobComponents.length];
          return (
            <View style={styles.blobWrapper} key={label}>
              <BlobButton
                label={label}
                BlobComponent={BlobComponent}
                onPress={() => navigation.navigate("Playlist")}
              />
            </View>
          );
        })}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#000",

  },
  header: {
    alignItems: "center",
    paddingTop: 24,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: 2,
  },
  blobContainer: {
    alignItems: "center",

    paddingBottom: 80,

  },
  blobWrapper: {
    marginVertical: 10,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#fff",
    marginTop: 12,
    fontSize: 16,
  },

});