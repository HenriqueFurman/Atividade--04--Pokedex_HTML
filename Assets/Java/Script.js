// Define qual o contêiner que vai receber as info. dos Pokémon
const pokeContainer = document.querySelector("#pokeContainer");

// Define o número de Pokémon que serao mostrados
const pokemonCount = 450; 

//altera a cor Card onde esta o pokemon em relaçao ao Primeiro tipo
const colors = {
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

// aqui o tipo primario recebe a cor ^ tipos de Pokémon
const mainTypes = Object.keys(colors);

// Esta função busca os dados dos Pokémon na no banco de dados(pokeapi)
const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i);
    }
};

// Função para obter dados de um Pokémon específico
const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
};

// Aqui definimos a geração do Pokémon com base no seu numero ID
const getGeneration = (id) => {
    if (id >= 1 && id <= 151) {
        return 'Geração 1';
    } else if (id >= 152 && id <= 251) {
        return 'Geração 2';
    } else if (id >= 252 && id <= 386) {
        return 'Geração 3';
    } else if (id >= 387 && id <= 493) {
        return 'Geração 4';
    } else if (id >= 494 && id <= 649) {
        return 'Geração 5';
    } else if (id >= 650 && id <= 721) {
        return 'Geração 6';
    } else if (id >= 722 && id <= 809) {
        return 'Geração 7';
    } else if (id >= 810 && id <= 898) {
        return 'Geração 8';
    } else if (id >= 899 && id <= 1025) {
        return 'Geração 9';
    } else {
        return 'Geração desconhecida';
    }
};


// Esta função analisa a info e cria um cartão para cada Pokémon
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

// Função para Botao de Busca Pokémon por nome
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

const btnFilter = document.querySelector('.icon-filter')

// Função para o ativar a barra lateral do filtro aparecer
btnFilter.addEventListener('click', () => {
    const containerFilter = document.querySelector('.container-filters')

    containerFilter.classList.toggle('active')
})

// Função para Busca de tipo de pokemon
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

// Função para adicionar evento de clique aos itens do menu suspenso de geração
const addDropdownClickEvent = () => {
    const dropdownItems = document.querySelectorAll('.dropdown-content a');
    dropdownItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedGeneration = parseInt(item.getAttribute('data-generation'));
            filterPokemonsByGeneration(selectedGeneration);
        });
    });
};

// Função para gerar os links do dropdown com base no valor de pokemonCount
const generateDropdownLinks = () => {
    const dropdownContent = document.querySelector('.dropdown-content');
    dropdownContent.innerHTML = ''; // Limpa o conteúdo atual do dropdown

    const generatedGenerations = {}; // Objeto para rastrear gerações já geradas

    for (let i = 1; i <= pokemonCount; i++) {
        const generation = getGeneration(i); // Obtém a geração do Pokémon
        const generationNumber = parseInt(generation.split(' ')[1]);

        // Verifica se a geração já foi gerada, se não, adiciona ao dropdown
        if (!generatedGenerations[generationNumber]) {
            const link = document.createElement('a');
            link.setAttribute('href', '#');
            link.setAttribute('data-generation', generationNumber);
            link.textContent = `Geração ${generationNumber}`;
            dropdownContent.appendChild(link);
            generatedGenerations[generationNumber] = true; // Marca a geração como gerada
        }
    }

    // Atualiza a função de filtro quando os links do dropdown são gerados
    addDropdownClickEvent();
};

// Função para filtrar os Pokémon por geração e ocultar os demais
const filterPokemonsByGeneration = (generation) => {
    const pokemonCards = document.querySelectorAll('.pokemon');
    pokemonCards.forEach((card) => {
        const id = parseInt(card.querySelector('.number').textContent.slice(1));
        const cardGeneration = getGeneration(id).split(' ')[1];
        if (cardGeneration == generation) {
            card.style.display = ''; // Exibir Pokémon que pertencem à geração selecionada
        } else {
            card.style.display = 'none'; // Ocultar Pokémon que não pertencem à geração selecionada
        }
    });
};

// Chama a função para gerar os links do dropdown quando a página é carregada
generateDropdownLinks();