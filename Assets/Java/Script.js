const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 12; //altera o numero de pokemon que é monstrado
const colors = {  //altera a cor bloco onde esta o pokemon em relaçao ao tipo
    normal: '#B7B7A8',
    fire: '#FF4422',
    water: '#51A8FF',
    electric: '#FFD451',
    grass: '#8BD46E',
    ice: '#7CD3FF',
    fighting: '#C56E60',
    poison: '#B76EA8',
    ground: '#E2C56E',
    flying:'#9AA8FF',
    psychic: '#FF6EA8',
    bug: '#B7C543',
    rock: '#C5B67C',
    ghost: '#7D7DC5',
    dragon:'#8B7DF1',
    dark: '#8B6E60',
    steel: '#B7B7C5',
    fairy: '#F1A8F1',
};


const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

const getGeneration = (id) => {
    if (id >= 1 && id <= 151) {
        return 'Geração I';
    } else if (id >= 152 && id <= 251) {
        return 'Geração II';
    } else if (id >= 252 && id <= 386) {
        return 'Geração III';
    } else if (id >= 387 && id <= 493) {
        return 'Geração IV';
    } else if (id >= 494 && id <= 649) {
        return 'Geração V';
    } else if (id >= 650 && id <= 721) {
        return 'Geração VI';
    } else if (id >= 722 && id <= 809) {
        return 'Geração VII';
    } else if (id >= 810 && id <= 898) {
        return 'Geração VIII';
    } else {
        return 'Geração desconhecida';
    }
};

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const primaryType = pokeTypes[0];

    const color = colors[primaryType];

    card.style.backgroundColor = color;

    const typeHTML = pokeTypes.map(type => `<span>${type}</span>`).join(', ');

    const generation = getGeneration(poke.id);

    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type" style="display: none;">Generation: ${generation}<br>Type: ${typeHTML}</small>
        </div>
    `;


    card.innerHTML = pokemonInnerHTML;

    const numberElement = card.querySelector('.info').querySelector('.number');

    // Adiciona evento de mouse para mostrar/ocultar informações de tipo
    card.addEventListener('mouseover', function() {
        card.querySelector('.imgContainer').style.display = 'none';
        card.querySelector('.info').querySelector('.type').style.display = 'block';
    });

    card.addEventListener('mouseout', function() {
        card.querySelector('.imgContainer').style.display = 'block';
        card.querySelector('.info').querySelector('.type').style.display = 'none';
    });

    
    pokeContainer.appendChild(card);
};


fetchPokemons();

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const pokeContainer = document.getElementById('pokeContainer');

    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim().toLowerCase();

        // Mostrar apenas os Pokémon que correspondem à pesquisa e ocultar os demais
        const pokemonCards = pokeContainer.querySelectorAll('.pokemon');
        pokemonCards.forEach(pokemonCard => {
            const pokemonName = pokemonCard.querySelector('.name').textContent.toLowerCase();
            if (pokemonName.includes(searchTerm)) {
                pokemonCard.style.display = ''; // Exibir os Pokémon que correspondem à pesquisa
            } else {
                pokemonCard.style.display = 'none'; // Ocultar os Pokémon que não correspondem à pesquisa
            }
        });

        // Limpar campo de pesquisa após a pesquisa
        searchInput.value = '';
    });
});

// Funçao de Filtro
const btnFilter = document.querySelector('.icon-filter')

btnFilter.addEventListener('click', () => {
    const containerFilter = document.querySelector('.container-filters')

    containerFilter.classList.toggle('active')
})

const filterPokemonByType = () => {
    const checkboxes = document.querySelectorAll('.group-type input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const selectedTypes = [...document.querySelectorAll('.group-type input[type="checkbox"]:checked')]
                .map((checkbox) => checkbox.name);

            const pokemonCards = document.querySelectorAll('.pokemon');

            pokemonCards.forEach((card) => {
                const types = [...card.querySelectorAll('.type span')]
                    .map((span) => span.textContent.toLowerCase());

                if (selectedTypes.length === 0 || selectedTypes.some((type) => types.includes(type))) {
                    card.style.display = ''; // Exibir Pokémon que correspondem aos tipos selecionados
                } else {
                    card.style.display = 'none'; // Ocultar Pokémon que não correspondem aos tipos selecionados
                }
            });
        });
    });
};

filterPokemonByType();
