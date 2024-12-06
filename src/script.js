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


const setSearchFilterOptions = (jsonArray) => {
    const keys = getAllKeys(jsonArray);
    let forbidden_keys = ['image', 'price', "ship_name", 'year_built', 'cost_per_unit']
    const ul = document.getElementById('filter-by-id');
    keys.forEach(key => {
        if (!forbidden_keys.includes(key)) {
            const li = document.createElement('li');
            li.className = "filter-options"
            li.textContent = key.toUpperCase().replaceAll("_", " ").replace("(LATITUDE, LONGITUDE)", " ")
            ul.appendChild(li)
        }
    });
};

const addMarker = (map, lat, lng, title) => {
    const marker = new google.maps.marker.AdvancedMarkerElement({
        map: map,
        position: {
            lat: lat,
            lng: lng
        },
    });
}

const updateShipDetails = (ship) => {
    const updateElementText = (elementId, text) => {
        const element = document.getElementById(elementId);
        element.textContent = text;
    };

    updateElementText('vesselNameKey', "Ship Name:");
    updateElementText('vesselName', ship.ship_name);
    updateElementText('currentLocationKey', "Current Location:");
    updateElementText('currentLocation', ship.current_location);
    updateElementText('captainsNameKey', "Captain's Name:");
    updateElementText('captainsName', ship.captain_name);

    const mapInstance = new google.maps.Map(document.getElementById('map-container'), {
        mapId: ship.serial_number,
        center: {
            lat: ship.coordinates.latitude,
            lng: ship.coordinates.longitude
        },
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.HYBRID,
    });

    addMarker(
        mapInstance, 
        ship.coordinates.latitude, 
        ship.coordinates.longitude, 
        ship.ship_name
    );
};


// Popup Handlers
const setupPopupListeners = () => {
    const openPopup = document.getElementById("openPopup");
    const closePopup = document.getElementById("closePopup");
    const popup = document.getElementById("popup");

    const togglePopup = () => {
        popup.style.display = popup.style.display === "flex" ? "none" : "flex";
    };

    if (openPopup) {
        openPopup.addEventListener("click", togglePopup);
    }
    
    closePopup.addEventListener("click", togglePopup);

    window.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
};

/* 
* This function will append ships to the list based on the search term
* under <ul> tag with id 'search-results-ul'
* @param jsonArray - Array of ship objects
* adds <li className='list-group-item'>ship_name</li> to the ul 
* per ship in the @param jsonArray
*/
const appendShipsToList = (jsonArray) => {
    const ul = document.getElementById('search-results-ul');
    ul.textContent = ''; 

    jsonArray.forEach(ship => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = ship.ship_name;
        
        li.addEventListener('click', () => updateShipDetails(ship));
        
        ul.appendChild(li);
    });
    //setupPopupListeners();
};

// sssssssssh
// Usage example
// Add listener on page loading
 // Main Initialization Listener
 document.addEventListener('DOMContentLoaded', () => {
    const data = jsonObject; // Assuming data is loaded from data.js
    setSearchFilterOptions(data);
    document.querySelector('.popup-button').addEventListener('click', function() {
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;})
    const searchInput = document.getElementById('user-input');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value;
        const filteredShips = getShipByName(data, 'ship_name', searchTerm);
        appendShipsToList(filteredShips);
    });

});



