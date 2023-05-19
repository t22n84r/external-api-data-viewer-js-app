let pokemonRepository = (function() {

    let charizard = {name: 'charizard', height: 5.7, weight: '199.5 lbs', type: ['fire', 'flying']};

    let venusaur = {name: 'venusaur', height: 6.7, weight: '220.5 lbs', type: ['grass', 'poison']};

    let blastoise = {name: 'blastoise', height: 5.3, weight: '188.5 lbs', type: 'water'};

    let pokemonList = [charizard, venusaur, blastoise];

    // ======================================================================================================= Add method with checks for input
    function add(pokemon) {

        /* More stricter version of key check ====================
        var validKeyNames = Object.keys(pokemon);
        let booleanArray = [];
        if (validKeyNames.includes('name')) {booleanArray.push(true)} else {booleanArray.push(false)}
        if (validKeyNames.includes('hobb')) {booleanArray.push(true)} else {booleanArray.push(false)}
        if (validKeyNames.includes('weight')) {booleanArray.push(true)} else {booleanArray.push(false)}
        if (validKeyNames.includes('type')) {booleanArray.push(true)} else {booleanArray.push(false)}
        let isAllSame = array => array.every(element => element === array[0]);*/

        const validKeyNames = ['name', 'height', 'weight', 'type'];
        let check = (obj, arr) => Object.keys(obj).every(key => arr.includes(key));

        if ((pokemon.constructor === Object) && (check(pokemon, validKeyNames) === true)) {
            pokemonList.push(pokemon);
        } else {
            alert('Only objects and object keys-(name, height, weight, type) are allowed.')
        }
    }

    // ===================================================================================================== Filter method to filter by name key
    function filterByName(pokemonName) {

        const filteredPokemon = pokemonList.filter(element => element.name === pokemonName.toLowerCase());
        if (Object.keys(filteredPokemon).length === 0 ) {alert('Pokemon not found in repository')} else {
        return filteredPokemon};
    }

    // ====================================================================================================== Get the whole Pokemon repository
    // getAll = () => pokemonList; Neater way for getALL() method
    function getAll() {
        return pokemonList;
    }

//    getAll = () => pokemonList;

    return {
        add: add,
        filterByName:filterByName,
        getAll: getAll
      };

})();

// =========================================================================================================== Iterate over and display the whole repository
let pokemonListTmp = pokemonRepository.getAll();

let objects = document.getElementById("objects");

pokemonListTmp.forEach (function(item) {

    let li = document.createElement('li');

    let pokemon = `Name: ${item.name}, Height: ${item.height}, Weight: ${item.weight}, Type: ${item.type}`;

    if (item.height > 6.5) {
        li.textContent = `${pokemon} - Wow, that's big!`;
    } else {
        li.textContent = `${pokemon}`;
    }

    objects.appendChild(li);
});

//console.log(pokemonRepository.getAll());
//pokemonRepository.add({name:'Pikachu', height: 1.04});
//console.log(pokemonRepository.getAll());
//console.log(pokemonRepository.filterByName('izard'));