let pokemonList = [];

let charizard = {name: 'charizard', height: 5.7, weight: '199.5 lbs', type: ['fire', 'flying']};

pokemonList[0] = charizard;

let venusaur = {name: 'venusaur', height: 6.7, weight: '220.5 lbs', type: ['grass', 'poison']};

pokemonList[1] = venusaur;

let blastoise = {name: 'blastoise', height: 5.3, weight: '188.5 lbs', type: 'water'};

pokemonList[2] = blastoise;

let objects = document.getElementById("objects");

for (let i = 0; i < pokemonList.length; i++) {

    let item = pokemonList[i];

    let li = document.createElement('li');

    let pokemon = `Name: ${item.name}, Height: ${item.height}, Weight: ${item.weight}, Type: ${item.type}`;

    if (item.height > 6.5) {
        li.textContent = `${pokemon} - Wow, that's big!`;
    } else {
        li.textContent = `${pokemon}`;
    }
    
    objects.appendChild(li);
}