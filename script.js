// VARIAVÉIS GLOBAIS
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonName = document.querySelector(".pokemon__name");
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");

// CAPTURAR AS INFORMAÇÕES DE POKEAPI
const fetchPokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200) {
        
        
        
        const data = await APIresponse.json();

        return data;

    } else {
        console.log("error de conexão com a API");
    }
};

// RENDERIZAR POKEMON
const renderPokemon = async (pokemon) => {

        pokemonNumber.innerHTML = "🙄";
        pokemonName.innerHTML = "Loading...";
        pokemonImage.src = "https://static.wixstatic.com/media/68315b_30dbad1140034a3da3c59278654e1655~mv2.gif";
    
        setTimeout(() => {}, 7000);
    
    const data = await fetchPokemon(pokemon);

    // Condição se tiver algo em data
    if (data) {
        console.log("conectado com a API");
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        pokemonImage.src = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
        input.value = "";
        searchPokemon = data.id;

    } else {
        pokemonNumber.innerHTML = "X";
        pokemonName.innerHTML = "Not Found :(";
        pokemonImage.src = "https://cdn.pixabay.com/animation/2023/04/28/18/34/18-34-10-554_512.gif";
    }

    console.log(data);
};

// Achar pokemon pelo input
form.addEventListener("submit", (event) => {
    event.preventDefault();

    renderPokemon(input.value);
});

// Evento dos botões

let searchPokemon = 1;

buttonNext.addEventListener("click", () => {

    searchPokemon++;

    renderPokemon(searchPokemon);
});

buttonPrev.addEventListener("click", () => {

    if (searchPokemon > 1) {
        
        searchPokemon--;
    
        renderPokemon(searchPokemon);
    
    }
    
});

renderPokemon(1);