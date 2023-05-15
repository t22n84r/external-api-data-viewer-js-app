let pokemonList = [];

let charizard = {name: 'charizard', height: '5 feet 7 inches', weight: '199.5 lbs', type: ['fire', 'flying']};

pokemonList[0] = charizard;

let venusaur = {name: 'venusaur', height: '6 feet 7 inches', weight: '220.5 lbs', type: ['grass', 'poison']};

pokemonList[1] = venusaur;

let blastoise = {name: 'blastoise', height: '5 feet 3 inches', weight: '188.5 lbs', type: 'water'};

pokemonList[2] = blastoise;

function pokemonFunction() {

  document.getElementById("demo").innerHTML = JSON.stringify(pokemonList);
}

pokemonFunction()