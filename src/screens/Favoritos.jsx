import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { buscarClimaCidades } from '../services/api';

export default function Favoritos({ navigation }) {
  const [favoritos, setFavoritos] = useState([]);
  const [dadosCidades, setDadosCidades] = useState([]);

  // Recarrega toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      async function carregar() {
        try {
          //
          const favoritosSalvos = await AsyncStorage.getItem('favoritos');
          setFavoritos(favoritosSalvos ? JSON.parse(favoritosSalvos) : []);

          // Lista completa (com clima), necessária para o "item relacionado" no Detalhes
          const resultados = await buscarClimaCidades();
          setDadosCidades(resultados);
        } catch (erro) {
          Alert.alert("Erro", erro.message);
        }
      }

      carregar();
    }, [])
  );

  return (
    <View style={styles.viewExterna}>

      {favoritos.length === 0 ? (
        <Text>Nenhuma cidade adicionada aos favoritos.</Text>
      ) : (
        <FlatList
          data={favoritos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cidade}>
              <View>
                <Text>{item.nome}</Text>
                <Text>
                  {item.clima.current_weather.temperature}
                  {item.clima.current_weather_units.temperature}
                </Text>
              </View>

              <Pressable
                style={styles.botaoDetalhes}
                onPress={() =>
                  navigation.navigate("Detalhes", { cidade: item, cidades: dadosCidades })
                }
              >
                <Text style={styles.textoBotaoDetalhes}>Ver detalhes</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
   viewExterna: {
      flex: 1,
      padding: 10,
   },

   cidade: {
      marginBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
   },

   botaoDetalhes: {
      padding: 7,
      borderRadius: 10,
      backgroundColor: '#1b75e6',
   },

   textoBotaoDetalhes: {
      color: 'white',
      fontWeight: 'bold',
   },
});