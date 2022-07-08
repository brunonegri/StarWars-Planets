const url = 'https://swapi-trybe.herokuapp.com/api/planets/';

const planetsApi = async () => {
  const resolve = await fetch(url);
  const data = await resolve.json();
  const filter = data.results.map((planet) => {
    delete planet.residents;
    return planet;
  });
  console.log(filter);
  return filter;
};

export default planetsApi;
