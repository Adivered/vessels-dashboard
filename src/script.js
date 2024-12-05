// Functions

const getAllKeys = (jsonArray) => {
    if (Array.isArray(jsonArray) && jsonArray.length > 0) {
        return Object.keys(jsonArray[0]);
    }
    return [];
};

const getShipByNumber = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key] === value);
}

const getShipByName = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key].toLowerCase().includes(value.toLowerCase()));
}

const getShipByKind = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key].includes(value));
}

const getShipByLocation = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key].includes(value));
}

const getShipByCoordinates = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key].includes(value));
}

const getShipByRoute = (jsonArray, value) => {
    return jsonArray.filter(obj => {
        const [departurePort, departureCountry] = obj.route['departure (port, country)'].split(', ');
        const [destinationPort, destinationCountry] = obj.route['destination (port, country)'].split(', ');

        return (departurePort.includes(value) || departureCountry.includes(value)) ||
            (destinationPort.includes(value) || destinationCountry.includes(value));
    });
};


// const setSearchFilterOptions = (jsonArray) => {
//     const ul = document.getElementById('filter-by-id');
//     // get all keys
//     // for each key in keys create li element with class name
//     // design class name
//     let forbidden_keys = ['unit', 'image']
//     forEach (key in keys) {
//         if (!(key in forbidden_keys) ) {

//         }
//     }
// };


/* 
* This function will append ships to the list based on the search term
* under <ul> tag with id 'search-results-ul'
* @param jsonArray - Array of ship objects
* adds <li className='list-group-item'>ship_name</li> to the ul 
* per ship in the @param jsonArray
*/
const appendShipsToList = (jsonArray) => {
    const ul = document.getElementById('search-results-ul'); // get the ul element by id
    ul.textContent = ''; // Clear the existing list
    jsonArray.forEach(ship => { // Loop on each ship in jsonArray
        const li = document.createElement('li'); // Create a new li element
        li.className = 'list-group-item'; // Add a class name to the li element
        li.textContent = ship.ship_name; // Set the text content of the li element
        
        li.addEventListener('click', () => {
            const pVesselName = document.getElementById('vesselName');
            const pVesselNameKey = document.getElementById('vesselNameKey');

            const pLocationKey = document.getElementById('currentLocationKey')
            const pLocation = document.getElementById('currentLocation')

            const pNameKey = document.getElementById('captainsNameKey')
            const pName = document.getElementById('captainsName')

            const pPurposeKey = document.getElementById('purposeKey')
            const pPurpose = document.getElementById('purpose')

            pVesselNameKey.textContent = "ship Name:";
            pVesselName.textContent = ship.ship_name;

            pLocationKey.textContent = "Current Location:"
            pLocation.textContent = ship.current_location;

            pNameKey.textContent = "Captain's Name:"
            pName.textContent = ship.captain_name;

      
            console.log(ship)

            document.addEventListener("DOMContentLoaded", () => {
                const openPopup = document.getElementById("openPopup");
                const closePopup = document.getElementById("closePopup");
                const popup = document.getElementById("popup");
            
                // Open popup
                openPopup.addEventListener("click", () => {
                    popup.style.display = "flex";
                });
            
                // Close popup
                closePopup.addEventListener("click", () => {
                    popup.style.display = "none";
                });
            
                // Close popup when clicking outside the content
                window.addEventListener("click", (event) => {
                    if (event.target === popup) {
                        popup.style.display = "none";
                    }
                });
            });
        })
        ul.appendChild(li); // Append the li element to the ul element
    });
};

// Usage example
// Add listener on page loading
document.addEventListener('DOMContentLoaded', () => {
    const data = jsonObject; // read data.js and assign to jsonObject



    // to get all keys:
    // const keys = getAllKeys(data);
    // console.log(keys);

    // DOM Manipulation of search input
    const searchInput = document.getElementById('user-input'); // get the search input by id
    searchInput.addEventListener('input', (event) => { // add an event listener on input event
        const searchTerm = event.target.value; // get the search term from the input field
        const filteredShips = getShipByName(data, 'ship_name', searchTerm); // filter ships by name function
        appendShipsToList(filteredShips); // append ships to the list


    });

    // Append ships to the list
    //appendShipsToList(data);





});