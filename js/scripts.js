let pokemonList = [];

let charizard = {name: 'charizard', height: '5 feet 7 inches', weight: '199.5 lbs', type: ['fire', 'flying']};

pokemonList[0] = charizard;

let venusaur = {name: 'venusaur', height: '6 feet 7 inches', weight: '220.5 lbs', type: ['grass', 'poison']};

pokemonList[1] = venusaur;

let blastoise = {name: 'blastoise', height: '5 feet 3 inches', weight: '188.5 lbs', type: 'water'};

pokemonList[2] = blastoise;

let objects = document.getElementById("objects");

for (let i = 0; i < pokemonList.length; i++) {

    let item = pokemonList[i];

    let li = document.createElement('li');

    li.textContent = `Name: ${item.name}, Height: ${item.height}, Weight: ${item.weight}, Type: ${item.type}`;

    objects.appendChild(li);



}


