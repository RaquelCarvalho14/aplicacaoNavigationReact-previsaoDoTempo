const cidades = [
    {
        id: "1",
        nome: "Salvador, BA",
        latitude: -12.9704,
        longitude: -38.5124,
        idCidadeRelacionada: "10" 
    },
    {
        id: "2",
        nome: "Ubatuba",
        latitude: -23.4339,
        longitude: -45.0857,
        idCidadeRelacionada: "4"
    },
    {
        id: "3",
        nome: "Gramado, RS",
        latitude: -29.3688,
        longitude: -50.8786,
        idCidadeRelacionada: "7"
    },
    {
        id: "4",
        nome: "Olímpia, SP",
        latitude: -20.7372,
        longitude: -48.9147,
        idCidadeRelacionada: "2"
    },
    {
        id: "5",
        nome: "Uberlândia, MG",
        latitude: -18.9113,
        longitude: -48.2622,
        idCidadeRelacionada: "6"
    },
    {
        id: "6",
        nome: "Fortaleza, CE",
        latitude: -3.71839,
        longitude: -38.5434,
        idCidadeRelacionada: "5"
    },
    {
        id: "7",
        nome: "Natal, RN",
        latitude: -5.79448,
        longitude: -35.211,
        idCidadeRelacionada: "3"
    },
    {
        id: "8",
        nome: "Vitória, ES",
        latitude: -20.3222,
        longitude: -40.3381,
        idCidadeRelacionada: "9"
    },
    {
        id: "9",
        nome: "Duque de Caxias, RJ",
        latitude: -22.7868,
        longitude: -43.3131,
        idCidadeRelacionada: "8"
    },
    {
        id: "10",
        nome: "Recife, PE",
        latitude: -8.05428,
        longitude: -34.8813,
        idCidadeRelacionada: "1"
    },
];

export async function buscarClimaCidades() {
  const resultados = await Promise.all( //Promise.all() buscar as 10 cidades simultaneamente
    cidades.map(async (cidade) => { // o map percorre o vetor das cidades para pegar as latitude e longitude
      const resposta = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${cidade.latitude}&longitude=${cidade.longitude}&current_weather=true&timezone=auto`
      );

      const dados = await resposta.json();

      return {
        ...cidade,
        clima: dados,
      };
    })
  );

  // Só agora, com todas as cidades já tendo clima, adiciona a relacionada 
  // Obs: A cidade relacionada já tem os dados que conseguimos na api
  const resultadosComRelacionada = resultados.map((cidade) => {
    const cidadeRelacionada = resultados.find(
      (c) => c.id === cidade.idCidadeRelacionada
    );

    return {
      ...cidade,
      cidadeRelacionada,
    };
  });

  return resultadosComRelacionada;
}