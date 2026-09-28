import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detalhes({ route, navigation }) {
  const { cidade, cidades } = route.params;

  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalGerenciar, setModalGerenciar] = useState(false);

  const [favorito, setFavorito] = useState(false);

  const hora = cidade.clima.current_weather.time.split("T")[1];

  useEffect(() => {
    async function verificarFavorito() {
      const favoritosSalvos = await AsyncStorage.getItem('favoritos');

      if (favoritosSalvos) {
        const favoritos = JSON.parse(favoritosSalvos);
        const cidadeFavorita = favoritos.some((item) => item.id === cidade.id); //Verifica se existe algum item tem id igual (boolean)
        setFavorito(cidadeFavorita);
      } else {
        setFavorito(false);
      }
    }

    verificarFavorito();
  }, [cidade]);

  async function adicionarFavorito() {
    const favoritosSalvos = await AsyncStorage.getItem('favoritos');

    let favoritos = [];

    if (favoritosSalvos) {
      favoritos = JSON.parse(favoritosSalvos);
    }

    favoritos.push(cidade);

    await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));

    setFavorito(true);
    setModalAdicionar(false);
  }

  async function removerFavorito() {
    const favoritosSalvos = await AsyncStorage.getItem('favoritos');

    if (favoritosSalvos) {
      let favoritos = JSON.parse(favoritosSalvos);
      favoritos = favoritos.filter((item) => item.id !== cidade.id);
      await AsyncStorage.setItem('favoritos', JSON.stringify(favoritos));
    }

    setFavorito(false);
    setModalGerenciar(false);
  }

  function verCidadeRelacionada() {
    const relacionada = cidades.find(
      (item) => item.id === cidade.idCidadeRelacionada
    );

    if (relacionada) {
      navigation.push("Detalhes", { cidade: relacionada, cidades });
    }
  }

  return (
    <View style={styles.viewExterna}>

      <Text style={styles.titulo}>
        {cidade.nome}
      </Text>

      <Text>
        Temperatura: {cidade.clima.current_weather.temperature}
        {cidade.clima.current_weather_units.temperature}
      </Text>

      <Text>
        Velocidade dos ventos: {cidade.clima.current_weather.windspeed}
        {cidade.clima.current_weather_units.windspeed}
      </Text>

      <Text>
        Hora: {hora}
      </Text>

      <Pressable
        style={styles.botaoFavoritos}
        onPress={() => {
          if (favorito) {
            setModalGerenciar(true);
          } else {
            setModalAdicionar(true);
          }
        }}
      >
        <Text style={styles.textoBotaoFavoritos}>
          {favorito ? "Gerenciar favoritos" : "Adicionar aos favoritos"}
        </Text>
      </Pressable>

      <Pressable
        style={styles.outrosBotoes}
        onPress={verCidadeRelacionada}
      >
        <Text style={styles.textoOutrosBotoes}>
          Ver item relacionado
        </Text>
      </Pressable>

      <Pressable
        style={styles.outrosBotoes}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoOutrosBotoes}>
          Voltar para a lista
        </Text>
      </Pressable>

      {/* PAINEL ADICIONAR */}

      <Modal
        visible={modalAdicionar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalAdicionar(false)}
      >
        <Pressable
          style={styles.fundoModal}
          onPress={() => setModalAdicionar(false)}
        >
          <Pressable style={styles.painel} onPress={() => {}}>

            <View style={styles.alcaPainel} />

            <Text style={styles.tituloPainel}>
              Adicionar aos favoritos
            </Text>

            <Text style={styles.textoPainel}>
              Deseja adicionar {cidade.nome} aos favoritos?
            </Text>

            <View style={styles.botoesPainel}>

              <Pressable
                style={styles.botaoCancelar}
                onPress={() => setModalAdicionar(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoConfirmar}
                onPress={adicionarFavorito}
              >
                <Text style={styles.textoConfirmar}>
                  Adicionar
                </Text>
              </Pressable>

            </View>

          </Pressable>
        </Pressable>
      </Modal>

      {/* PAINEL GERENCIAR (bottom sheet) */}

      <Modal
        visible={modalGerenciar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalGerenciar(false)}
      >
        <Pressable
          style={styles.fundoModal}
          onPress={() => setModalGerenciar(false)}
        >
          <Pressable style={styles.painel} onPress={() => {}}>

            <View style={styles.alcaPainel} />

            <Text style={styles.tituloPainel}>
              Gerenciar favorito
            </Text>

            <Text style={styles.textoPainel}>
              {cidade.nome} está nos seus favoritos.
            </Text>

            <View style={styles.botoesPainel}>

              <Pressable
                style={styles.botaoCancelar}
                onPress={() => setModalGerenciar(false)}
              >
                <Text style={styles.textoCancelar}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                style={styles.botaoRemover}
                onPress={removerFavorito}
              >
                <Text style={styles.textoRemover}>
                  Remover
                </Text>
              </Pressable>

            </View>

          </Pressable>
        </Pressable>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  viewExterna: {
    flex: 1,
    padding: 10
  },

  titulo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },

  botaoFavoritos: {
    backgroundColor: '#e9d45b',
    borderRadius: 10,
    padding: 7,
    marginTop: 5
  },

  textoBotaoFavoritos: {
    color: '#584d0b',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  outrosBotoes: {
    backgroundColor: '#6db9ec',
    borderRadius: 10,
    padding: 7,
    marginTop: 5
  },

  textoOutrosBotoes: {
    color: '#09466e',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end'
  },

  painel: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    paddingBottom: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },

  alcaPainel: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 15
  },

  tituloPainel: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },

  textoPainel: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#555'
  },

  botoesPainel: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  botaoCancelar: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    width: '45%'
  },

  textoCancelar: {
    textAlign: 'center',
    fontWeight: 'bold'
  },

  botaoConfirmar: {
    backgroundColor: '#e9d45b',
    padding: 12,
    borderRadius: 8,
    width: '45%'
  },

  textoConfirmar: {
    textAlign: 'center',
    fontWeight: 'bold'
  },

  botaoRemover: {
    backgroundColor: '#e05252',
    padding: 12,
    borderRadius: 8,
    width: '45%'
  },

  textoRemover: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});