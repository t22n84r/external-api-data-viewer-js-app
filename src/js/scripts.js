let pokemonRepository = (function() {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=200';

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

            let modalBody = document.querySelector('.modal-body');
            modalBody.innerHTML='';
          
            let titleElement = document.getElementById('modal-title-text');
            titleElement.innerText = pokemon.name.toUpperCase();
          
            const ul = document.createElement('ul');
            ul.classList.add('col', 'list-unstyled', 'ms-5', 'fs-5');

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
            img.classList.add('col');
            img.src = pokemon.imageUrl;

            modalBody.appendChild(ul);
            modalBody.appendChild(img);

        });
    }

    // ======================================================================================================= Method to display a single object
    const addListItem = pokemon => {

        let ul = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');

        listItem.classList.add('list-group-item')
    
        let button = document.createElement('button');
    
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    
        button.classList.add('btn', 'btn-danger');

        button.setAttribute('data-bs-toggle', 'modal');

        button.setAttribute('data-bs-target', '#modal-container');

        button.setAttribute('style', 'width: 120px');
    
        listItem.appendChild(button);
    
        ul.appendChild(listItem);

        button.addEventListener('click', () => showDetails(pokemon));
    }

    // ======================================================================================================= Get the whole repository
    const getAll = () => pokemonList;

    // ======================================================================================================= Method to search for object from array of objects
    const searchItem = () => {

        let searchInput = document.getElementById('search-input').value.toLowerCase();
        let listArray = document.querySelectorAll('.list-group-item');

        listArray.forEach (pokemon => {

            let listBtn = pokemon.querySelector('.btn').innerText.toLowerCase();

            let searchList = document.querySelector('.pokemon-list');

            if (listBtn.includes(searchInput) ) {
                searchList.classList.add('search-list');
                pokemon.style.display = 'inline-block';

            } else {
                pokemon.style.display = 'none';
            }

            if (!searchInput) {
                searchList.classList.remove('search-list');
              }
        });
    }

    let searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', () => searchItem());

    return {
        loadList: loadList,
        loadDetails: loadDetails,
        add: add,
        addListItem: addListItem,
        getAll: getAll
      };

})();

// =========================================================================================================== Iterate over and display the whole repository

pokemonRepository.loadList().then( () => {

    pokemonRepository.getAll().forEach (pokemon => {

        pokemonRepository.addListItem(pokemon);

    });
});