const listaPokemon = document.querySelector("#listaPokemon");
const boton = document.querySelectorAll(".btn-header");

const url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i<=151; i++){
    fetch(url + i)
        .then(res => res.status ? res.json() : Promise.reject(res.status))
        .then(data => mostrarPokemon(data))
        .catch(err => console.error("Error al obtener pokemons:", err));
}

function mostrarPokemon(pokemon){
    let tipo = pokemon.types.map(type => `<p class = "${type.type.name} tipo ">${type.type.name}</p>`);
    
    tipo = tipo.join('');

    let pokeId = pokemon.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
   
    }else if(pokeId.length === 2 ){
        pokeId = "0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <p class="pokemon-id-black">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${pokemon.sprites.other.showdown.front_default}" 
                            alt="${pokemon.name}">
            </div>
            <div class="pokemon-inf">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${pokemon.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipo}
                </div>
                <div class="pokemon-status">
                    <p class="stat">${pokemon.height}m</p>
                    <p class="stat">${pokemon.weight}kg</p>
                </div>
            </div>

    `;

    listaPokemon.append(div);

}


boton.forEach(btn => btn.addEventListener("click", (event) => {
    
    //Traesmos el id del boton
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = ""; // Limpiamos la lista de pokemons

    for(let i = 1; i<=151; i++){
    fetch(url + i)
        .then(res => res.status ? res.json() : Promise.reject(res.status))
        .then(data => {
            
            if (botonId === "ver-todos") {
                mostrarPokemon(data);
                
            }else{
                const tipos = data.types.map(type => type.type.name); 
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
            }

            

        })
        .catch(err => console.error("Error al obtener pokemons:", err));
}

}));