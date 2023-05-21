let pokemonRepository = (function() {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

    // ======================================================================================================= Api call to populate the main array with objects
    let loadList = () => {

        return fetch(apiUrl)
            .then(response => response.json())

            .then(json => {
                json.results.forEach(item => {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
        
            .catch(e => console.error(e));
    }

    // ======================================================================================================= Api call to get details of an object
    let loadDetails = item => {

        let url = item.detailsUrl;

        return fetch(url)
            .then(response => response.json())

            .then(details => {
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight;
                item.type = details.types;
            })
            
            .catch(e => console.error(e));
    }

    // ======================================================================================================= Add method with checks for input
    function add(pokemon) {

        const validKeyNames = ['name', 'detailsUrl'];
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

        loadDetails(pokemon).then(() => {
            console.log(pokemon);
          });
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
        loadList: loadList,
        loadDetails: loadDetails,
        add: add,
        addListItem: addListItem,
        filterByName:filterByName,
        getAll: getAll
      };

})();

// =========================================================================================================== Iterate over and display the whole repository

pokemonRepository.loadList().then( () => {

    pokemonRepository.getAll().forEach (pokemon => {

        pokemonRepository.addListItem(pokemon);

    });
});