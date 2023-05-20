let pokemonRepository = (function() {

    let charizard = {name: 'charizard', height: 5.7, weight: '199.5 lbs', type: ['fire', 'flying']};

    let venusaur = {name: 'venusaur', height: 6.7, weight: '220.5 lbs', type: ['grass', 'poison']};

    let blastoise = {name: 'blastoise', height: 5.3, weight: '188.5 lbs', type: 'water'};

    let pokemonList = [charizard, venusaur, blastoise];

    // ======================================================================================================= Add method with checks for input
    function add(pokemon) {

        const validKeyNames = ['name', 'height', 'weight', 'type'];
        let check = (obj, arr) => Object.keys(obj).every(key => arr.includes(key));

        if ((pokemon.constructor === Object) && (check(pokemon, validKeyNames) === true)) {
            pokemonList.push(pokemon);
        } else {
            alert('Only objects and object keys-(name, height, weight, type) are allowed.')
        }
    }

    // ======================================================================================================= Method to display a single object
    const addListItem = pokemon => {

        let ul = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
    
        let button = document.createElement('button');
    
        button.innerText = pokemon.name;
    
        button.classList.add('pokemon-details');
    
        listItem.appendChild(button);
    
        ul.appendChild(listItem);

        button.addEventListener('click', () => showDetails(pokemon));
    }

    // ======================================================================================================= Method to display all object keys upon request
    const showDetails = pokemon => {

        console.log(pokemon.name);
    }

    // ======================================================================================================= Filter method to filter by name key
    function filterByName(pokemonName) {

        const filteredPokemon = pokemonList.filter(element => element.name === pokemonName.toLowerCase());
        if (Object.keys(filteredPokemon).length === 0 ) {alert('Pokemon not found in repository')} else {
        return filteredPokemon};
    }

    // ======================================================================================================= Get the whole repository
    // const getAll = () => pokemonList; Neater way for getALL() method
    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        addListItem: addListItem,
        filterByName:filterByName,
        getAll: getAll
      };

})();

// =========================================================================================================== Iterate over and display the whole repository

pokemonRepository.getAll().forEach (item => {

    pokemonRepository.addListItem(item);

});

//console.log(pokemonRepository.getAll());
//pokemonRepository.add({name:'Pikachu', height: 1.04});
//console.log(pokemonRepository.getAll());
//console.log(pokemonRepository.filterByName('izard'));