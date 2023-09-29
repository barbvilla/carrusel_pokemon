const carouselInner = document.getElementById('cards');

// Obtener los tipos de Pokémon desde la API
fetch('https://pokeapi.co/api/v2/type/')
  .then(res => res.json())
  .then(typesData => {
    const types = typesData.results.map(type => type.name);
    // Llamar a la función para buscar y mostrar Pokémon por tipos
    types.forEach(type => {
      getPokemons(type);
    });
  });

// Función para obtener y mostrar Pokémon por tipo
const getPokemons = (type) => {
  const promises = [];

  for (let i = 1; i <= 151; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => res.json()))
  }

  Promise.all(promises)
    .then(result => {
      const pokemon = result.map(data => ({
        id: data.id,
        name: data.name.toUpperCase(),
        image: data.sprites.front_default,
        types: data.types,
      }));
      const filteredPokemon = pokemon.filter(pokemon => hasType(pokemon.types, type));
      showPokemon(filteredPokemon, type);
    });
}

function hasType(types, t) {
  return types.some((el) => el.type.name === t);
}

const showPokemon = (pokemon, type) => {
  const pokemonCard = pokemon.map(forPokemon =>
    `<div class="col-auto">
      <div class="card card${forPokemon.id}" style="width: 18rem;">
        <img src="${forPokemon.image}" class="card-img-top" alt="${pokemon.name}" />
        <div class="card-body">
          <h2 class="card-title">${forPokemon.name}</h2>
        </div>
      </div>
    </div>`).join("")

  const typeSection = document.createElement('div');
  typeSection.classList.add('type-section');
  typeSection.innerHTML = `<h2>${type.toUpperCase()} POKEMON</h2>`;
  typeSection.innerHTML += `<div class="row">${pokemonCard}</div>`;

  carouselInner.appendChild(typeSection);
};

getPokemons();