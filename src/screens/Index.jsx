import { useState, useEffect } from "react";
import { View, Text, FlatList, Alert, StyleSheet, ActivityIndicator, Pressable } from "react-native";
import { SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import { buscarClimaCidades } from "../services/api";

export default function Inicio({ navigation }) { //{ navigation } é uma prop que vai ser usada no botão de detalhes
  const [dadosCidades, setDadosCidades] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const resultados = await buscarClimaCidades();
        setDadosCidades(resultados);
      } catch (erro) {
        Alert.alert("Erro", erro.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <View style={styles.viewExterna}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeAreaView}>
          {carregando ? (
            <ActivityIndicator style={styles.bolinhaCarregamento} />
          ) : (
            <FlatList
              data={dadosCidades}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.cidade}>
                  <View>
                    <Text>{item.nome}</Text>
                    <Text>{item.clima.current_weather.temperature}{item.clima.current_weather_units.temperature}</Text>
                  </View>
                  <Pressable style={styles.botaoDetalhes} onPress={() => navigation.navigate("Detalhes", { cidade: item,cidades:dadosCidades })}>
                      <>
                        <Text style={styles.textoBotaoDetalhes}>Ver detalhes</Text>
                      </>
                  </Pressable>
                </View>
              )}
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    padding: 10,
  },

  bolinhaCarregamento: {
    marginTop: 35,
  },

  viewExterna: {
    flex: 1,
  },

  cidade: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  
  botaoDetalhes: {
    backgroundColor: '#1b75e6',
    borderRadius: 10,
    padding: 7
  },

  textoBotaoDetalhes:{
    color: 'white',
    fontWeight: 'bold'
  }
});