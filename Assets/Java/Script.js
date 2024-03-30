const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 151;
const colors = {
    fire: '#ff8c74',
    grass: '#41d421',
    electric: '#e5f127',
    water: '#27b7f1',
    ground: '#c68c39',
    rock: '#b56d08',
    fairy: '#f093f0',
    poison: '#6f0fdb',
    bug: '#ab2',
    dragon: '#533fc4',
    psychic: '#d521c5',
    flying: '#61ade6',
    fighting: '#da7e49',
    normal: '#e1e1e1'
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

const createPokemonCard = (poke) => {
    const card = document.createElement('div');
    card.classList.add("pokemon");

    const name = poke.name[0].toUpperCase() + poke.name.slice(1);
    const id = poke.id.toString().padStart(3, '0');

    const pokeTypes = poke.types.map(type => type.type.name);
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1);
    const color = colors[type];

    card.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Type: <span>${type}</span></small>
        </div>
    `;
    card.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(card);
};

fetchPokemons();
