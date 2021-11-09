const list = document.getElementById("list");
const description = document.getElementById("description");

const api = "https://pokeapi.co/api/v2/pokemon?limit=150";

/**
 * Try to parse a response as JSON data
 */
function transformToJson (response) {
    if (response.ok) {
        return response.json();
    }

    throw Error("Content not loaded");
}

/**
 * Clear the list of all its items
 */
function emptyList () {
}

/**
 * Create an item, fetch its data and setup event listener
 */
function createItem (pokemon) {
    
    const item = document.createElement("li");
     
    const pics = document.createElement("img");

    

    fetch(pokemon.url).then(transformToJson).then((data) => {
        
        pokemon = {};
        /*pokemon['name'] = data.name;
        pokemon['id'] = data.id;
        pokemon['weight'] = data.weight;
        pokemon['height'] = data.height;
        pokemon['types'] = data.types;
        pokemon['sprites'] = data.sprites;*/
        item.textContent = data.name;
        list.appendChild(item); //li dans ul
        item.appendChild(pics); //pics dans li
        pics.src = data.sprites.front_default;
      

        item.addEventListener("mouseover", (e) => {
            showDescription(data);            
            item.appendChild(description);   
        })
    
        item.addEventListener("mouseleave", (e) => {
            hideDescription("show");
            item.removeChild(description);
        });

    });
    
}

/**
 * fill the item list with values
 */
function fillList (json) {
    emptyList();
    json.results.forEach(createItem);
    
}

/**
 * Fill and display the description
 */
function showDescription (data) {
    description.classList.add("show");
    let types = description.querySelectorAll(".types");
    const fields = description.querySelectorAll("dd");

    fields.forEach((dd) => {
    dd.textContent = data[dd.classList[0]];
    });

    
    types.forEach((types) => {
        if (data.types.length < 2) {
        types.textContent = data.types[0].type.name; 
    } else {
        types.textContent = data.types[0].type.name + " " + data.types[1].type.name; 
    }
    
}); 

}


/*
 * Hide the description
 */
function hideDescription () {
    description.classList.remove("show");

}


// Fetch the API end-point and fill the list
fetch(api).then(transformToJson).then(fillList);

