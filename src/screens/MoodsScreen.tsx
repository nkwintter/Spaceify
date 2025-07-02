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
import { fetchApodList } from "../services/nasaApiService";

// COMPONENTE DO BOTÃO
import BlobButton from "../components/BlobButton";

// ASSETS
import Blob01 from "../assets/blob01.svg";
import Blob02 from "../assets/blob02.svg";
import Blob03 from "../assets/blob03.svg";
import Blob04 from "../assets/blob04.svg";
import Blob05 from "../assets/blob05.svg";
import Blob06 from "../assets/blob06.svg";
import Blob07 from "../assets/blob07.svg";

const blobComponents = [
  Blob01, Blob02, Blob03, Blob04, Blob05, Blob06, Blob07,
  Blob01, Blob02, Blob03,
];

export default function MoodsScreen() {
  const navigation = useNavigation<any>();
  const [apodList, setApodList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchApodList(10);
        setApodList(data);
      } catch (e) {
        console.error("Erro ao carregar imagens:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Carregando imagens da NASA...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MOODS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.blobContainer}>
        {apodList.map((item, index) => {
          const label = item.title;
          const BlobComponent = blobComponents[index % blobComponents.length];

          return (
            <View style={styles.blobWrapper} key={label + index}>
              <BlobButton
                label={label}
                colors={["#5f2c82", "#49a09d"]}
                BlobComponent={BlobComponent}
                onPress={() =>
                  navigation.navigate("ImagemDetalhes", {
                    item,
                    categoria: "espacial", 
                  })
                }
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