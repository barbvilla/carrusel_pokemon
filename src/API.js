const carouselInner = document.querySelector('.cards');

const getPokemons = () => {
  for (let i = 1; i <= 151; i++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => res.json())
      .then(data => {
        const pokemon = {}
        pokemon["id"] = data.id
        pokemon["name"] = data.name
        pokemon["image"] = data.sprites["front_default"]
        pokemon["types"] = data.types
        console.log(pokemon);
      })
  }
}

getPokemons();

function showPokemon(pokemon) {
  pokemon.map((pokemon) => {
    carouselInner.innerHTML = `
      <div class="${pokemon.name}">
          <h2>${pokemon.name}</h2>
          <img src="${pokemon.images}" />
      </div>
    `;
  });
}