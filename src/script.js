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
    const ul = document.getElementById('search-results-ul'); // get the ul element by id
    ul.textContent = ''; // Clear the existing list
    jsonArray.forEach(ship => { // Loop on each ship in jsonArray
        const li = document.createElement('li'); // Create a new li element
        li.className = 'list-group-item'; // Add a class name to the li element
        li.textContent = ship.ship_name; // Set the text content of the li element

        // li.style.transition = 'background-image 0.5s ease-in-out';

        // const listCont = document.getElementsByClassName('list-group-item')

        li.addEventListener('mouseover', () => {
            const imageUrl = ship.image;
            li.style.transition = 'background 0.5s ease-in-out'
            li.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;
            li.style.backgroundSize = 'cover';
            li.style.color = 'white'
            li.style.backgroundRepeat = 'no-repeat';
            li.style.backgroundPosition = 'center';
        })

        // li.addEventListener('mouseout', () => {
        //     const imageUrl = ship.image;
        //     // li.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;
        //     li.style.transition = 'background-image 0.5s ease-in-out'
        //     // li.style.backgroundImage = 'none';
        //     // li.style.backgroundColor = '#9ca6b8;'; // Revert background when mouse leaves
        //     li.style.color = 'white'
        // });

        li.addEventListener('click', () => {
            const pVesselNameKey = document.getElementById('vesselNameKey');
            const pVesselName = document.getElementById('vesselName');

            const pLocationKey = document.getElementById('currentLocationKey')
            const pLocation = document.getElementById('currentLocation')

            const pNameKey = document.getElementById('captainsNameKey')
            const pName = document.getElementById('captainsName')


            pVesselNameKey.textContent = "Ship Name:";
            pVesselName.textContent = ship.ship_name;

            pLocationKey.textContent = "Current Location:"
            pLocation.textContent = ship.current_location;

            pNameKey.textContent = "Captain's Name:"
            pName.textContent = ship.captain_name;

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


            const moreDetails = document.getElementById('more-details-btn')

            moreDetails.addEventListener('click', () => {
                const pShipKindkey = document.getElementById('vesselNameKey');
                const pShipKind = document.getElementById('vesselName');

                const pSerialNumberKey = document.getElementById('currentLocationKey')
                const pSerialNumber = document.getElementById('currentLocation')

                const pYearBuiltKey = document.getElementById('captainsNameKey')
                const pYearBuilt = document.getElementById('captainsName')

                pShipKindkey.textContent = "Ship Kind:";
                pShipKind.textContent = ship.ship_kind;

                pSerialNumberKey.textContent = "Serial Number:"
                pSerialNumber.textContent = ship.serial_number;

                pYearBuiltKey.textContent = "Year Of Production:"
                pYearBuilt.textContent = ship.year_built;

            })


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