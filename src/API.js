const carouselInner = document.getElementById('cards');

const getPokemons = () => {
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
      }))
      /* console.log(pokemon); */
      /* showPokemon(pokemon); */
      return pokemon
    })
    .then(res => {
      res.forEach((pokemon) => {
        const filteredPokemon = hasType(pokemon.types, "poison")
        console.log(filteredPokemon);
      })
      
    })
}


function hasType(types, t) {
  /* console.log(types)
  console.log(t) */
  const filterByType = types.filter((el) => el.type.name.includes(t))
  return filterByType;
}

/* const filterType = Object.groupBy(pokemon, ({ type }) => type);
  console.log(filterType); */

const showPokemon = (pokemon) => {
  const pokemonCard = pokemon.map(forPokemon => 
    `<div class="col">
      <div class="card card${forPokemon.id}" style="width: 18rem;">
        <img src="${forPokemon.image}" class="card-img-top" alt="${pokemon.name}" />
        <div class="card-body">
          <h2 class="card-title">${forPokemon.name}</h2>
        </div>
      </div>
    </div>`).join("")

  carouselInner.innerHTML = pokemonCard;
};

getPokemons()