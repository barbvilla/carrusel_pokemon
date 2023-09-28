function loadPokemonTypes() {
    $.get('https://pokeapi.co/api/v2/type', function (data) {
        const types = data.results;

        // Itera sobre los tipos y crea elementos de carrusel
        types.forEach(function (type, index) {
            const isActive = index === 0 ? 'active' : '';
            const typeHTML = `
                <div class="carousel-item ${isActive}">
                    <h2>${type.name}</h2>
                </div>
            `;

            // Agrega el tipo al carrusel
            $('.carousel-inner').append(typeHTML);
        });
    });
}

// Carga los tipos de Pokémon cuando se carga la página
$(document).ready(function () {
    loadPokemonTypes();
});
