const carouselInner = document.getElementById('cards');
const typeNavContainer = document.getElementById('type-nav');

fetch('https://pokeapi.co/api/v2/type/')
  .then(res => res.json())
  .then(typesData => {
    const types = typesData.results.map(type => type.name);
    types.forEach(type => {
      createTypeButton(type);
    });
  });

function createTypeButton(type) {
  const typeButton = document.createElement('button');
  typeButton.textContent = type.toUpperCase();
  typeButton.classList.add('type-button');
  typeButton.dataset.type = type;

  typeButton.addEventListener('click', (event) => {
    const selectedType = event.target.dataset.type;
    clearCarousel();
    getPokemons(selectedType);
  });

  typeNavContainer.appendChild(typeButton);
}

const clearCarousel = () => {
  while (carouselInner.firstChild) {
    carouselInner.removeChild(carouselInner.firstChild);
  }
};

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

const hasType = (types, t) => {
  return types.some((el) => el.type.name === t);
}

const showPokemon = (pokemon, type) => {
  const pokemonCard = pokemon.map(forPokemon =>
    `<div class="col-auto">
      <div class="card card${forPokemon.id}" style="width: 18rem;">
        <img src="${forPokemon.image}" class="card-img-top" alt="${forPokemon.name}" />
        <div class="card-body">
          <h4 class="card-title">${forPokemon.name}</h2>
        </div>
      </div>
    </div>`).join("");

  if (pokemon.length > 0) {
    const typeSection = document.createElement('div');
    typeSection.classList.add('type-section');
    typeSection.innerHTML = `<h3 class="type-title-${type}">${type.toUpperCase()} POKEMON</h2>`;
    typeSection.innerHTML += `<div class="row">${pokemonCard}</div>`;

    carouselInner.appendChild(typeSection);

    $(typeSection.querySelector('.row')).slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      arrows: true,
      responsive: [
        {
          breakpoint: 1290,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 790,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }
};
