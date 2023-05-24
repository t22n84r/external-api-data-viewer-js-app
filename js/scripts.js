let pokemonRepository = (function() {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    // ======================================================================================================= Api call to populate the main array with objects
    const loadList = () => {

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
    const loadDetails = pokemon => {

        let url = pokemon.detailsUrl;

        return fetch(url)
            .then(response => response.json())

            .then(details => {
                pokemon.imageUrl = details.sprites.other.dream_world.front_default;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                const types = details.types;
                pokemon.types = types.map(type => type.type.name);
            })
            
            .catch(e => console.error(e));
    }

    // ======================================================================================================= Add method with checks for input
    const add = pokemon => {

        const validKeyNames = ['name', 'detailsUrl'];
        let check = (obj, arr) => Object.keys(obj).every(key => arr.includes(key));

        if ((pokemon.constructor === Object) && (check(pokemon, validKeyNames) === true)) {
            pokemonList.push(pokemon);
        } else {
            alert('Only objects and object keys-(name, height, weight, type) are allowed.')
        }
    }

    // ======================================================================================================= Method to display all object keys upon request
    const showDetails = pokemon => {

        loadDetails(pokemon).then(() => {

            let modalContainer = document.getElementById('modal-container');

            // Clear all existing modal content
            modalContainer.innerHTML = '';
          
            let modal = document.createElement('div');
            modal.classList.add('modal');

            let div1 = document.createElement('div'); // ====================================================== 2 divs for 2 grid boxes
            let div2 = document.createElement('div')
          
            // Add the new modal content
            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);
          
            let titleElement = document.createElement('h1');
            titleElement.innerText = pokemon.name.toUpperCase();
          
            const ul = document.createElement('ul'); // ====================================================== unordered list to create a list of stats

            let li = document.createElement("li");
            li.innerText = `Height: ${pokemon.height} feet`;
            ul.appendChild(li);

            li = document.createElement("li");
            li.innerText = `Weight: ${pokemon.weight} lbs`;
            ul.appendChild(li);

            li = document.createElement("li");
            li.innerText = `Type: ${pokemon.types}`;
            ul.appendChild(li);

            let img = document.createElement("img");
            img.src = pokemon.imageUrl;
          
            div1.appendChild(titleElement);
            div1.appendChild(ul);
            div2.appendChild(img);
            modal.appendChild(closeButtonElement);
            modal.appendChild(div1);
            modal.appendChild(div2);
            modalContainer.appendChild(modal);
            
            modalContainer.classList.add('is-visible');
        
            modalContainer.addEventListener('click', (e) => {
              // Since this is also triggered when clicking INSIDE the modal
              // We only want to close if the user clicks directly on the overlay
              let target = e.target;
              if (target === modalContainer) {
                hideModal();
              }
            });
        });
    }

    const hideModal = () => {
    
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
        modalContainer.innerHTML = '';
    }

    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    // ======================================================================================================= Filter method to filter by name key
    const filterByName = pokemonName => {

        const filteredPokemon = pokemonList.filter(element => element.name === pokemonName.toLowerCase());
        if (Object.keys(filteredPokemon).length === 0 ) {alert('Pokemon not found in repository')} else {
        return filteredPokemon};
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

    // ======================================================================================================= Get the whole repository
    const getAll = () => pokemonList;

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