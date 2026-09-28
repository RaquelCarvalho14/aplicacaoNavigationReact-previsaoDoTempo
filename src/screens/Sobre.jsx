import { View, Text, StyleSheet } from 'react-native'

export default function Sobre(){
   return(
      <View style={styles.viewExterna}>
         <Text style={styles.titulo}>Previsão do tempo</Text>
         <Text style={styles.titulo2}>Link da api da previsão do tempo:</Text>
         <Text style={styles.conteudoTitulo2}>https://api.open-meteo.com/v1/forecast?latitude=..&longitude=..&current_weather=true&timezone=auto</Text>
         <Text style={styles.titulo2}>Observação:</Text>
         <Text style={styles.conteudoTitulo2}>É necessário informar a latitude e longitude da cidade desejada.</Text>
      </View>
   )
}

const styles = StyleSheet.create({
  viewExterna: {
    flex: 1,
    padding: 10
  },

  titulo:{
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10
  },

  titulo2:{
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 10
  },

  conteudoTitulo2:{
   paddingLeft: 10,
   marginBottom: 10
  }
});
