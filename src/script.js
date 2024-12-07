// Functions
const getAllKeys = (jsonArray) => {
    if (Array.isArray(jsonArray) && jsonArray.length > 0) {
        return Object.keys(jsonArray[0]);
    }
    return [];
};

const getShipByKey = (jsonArray, key, value) => {
    if (typeof jsonArray[0][key] === 'number') {
        if (Number.isInteger(jsonArray[0][key])) {
            return jsonArray.filter(obj => obj[key] === parseInt(value));
        } else {
            return jsonArray.filter(obj => obj[key] === parseFloat(value));
        }
    } else if (typeof jsonArray[0][key] === 'string') {
        return jsonArray.filter(obj => obj[key].toLowerCase().includes(value.toLowerCase()));
    } else {
        console.log("Failed log with: ", obj[key]," value:", value);
    }
}

const initMap = (element,id, lat, lng, zoom) => {
    const mapInstance = new google.maps.Map(document.getElementById(element), {
        mapId: id,
        center: {
            lat: lat,
            lng: lng,
        },
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.HYBRID,
    });
    return mapInstance;
}


const addMarker = (map, lat, lng) => {
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

const updateShipDivDetails = (ship) => {
    const pVesselName = document.getElementById('vesselName');
    const pVesselNameKey = document.getElementById('vesselNameKey');
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

    const mapInstance = initMap('map-container', ship.serial_number, ship.coordinates.latitude, 
        ship.coordinates.longitude, 6);

    addMarker(mapInstance, ship.coordinates.latitude, ship.coordinates.longitude, ship.ship_name);

    const moreDetails = document.getElementById('more-details-btn')
    let isDetailShown = false;

    moreDetails.addEventListener('click', () => {
        if (!isDetailShown) {
            pVesselNameKey.textContent = "Ship Kind:";
            pVesselName.textContent = ship.ship_kind;
            pLocationKey.textContent = "Serial Number:"
            pLocation.textContent = ship.serial_number;
            pNameKey.textContent = "Year Of Production:"
            pName.textContent = ship.year_built;
        } else {
            pVesselNameKey.textContent = "Ship Name:";
            pVesselName.textContent = ship.ship_name;
            pLocationKey.textContent = "Current Location:"
            pLocation.textContent = ship.current_location;
            pNameKey.textContent = "Captain's Name:"
            pName.textContent = ship.captain_name;
        }
        isDetailShown = !isDetailShown;
    })
}


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
        li.style.transition = 'background 0.5s ease-in-out, color 0.5s ease-in-out';
        li.addEventListener('mouseover', () => {
            const imageUrl = ship.image;
            li.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`;
            li.style.backgroundSize = 'cover';
            li.style.color = 'white'
            li.style.backgroundRepeat = 'no-repeat';
            li.style.backgroundPosition = 'center';
        })

        li.addEventListener('mouseleave', () => {
            li.style.backgroundImage = 'none';
            li.style.color = '';
        })

        li.addEventListener('click', () => {
            const dashboardContainer = document.getElementById('dashboard-container');
            dashboardContainer.textContent = '';
            dashBoardScreen();
            updateShipDivDetails(ship);
          
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


const setSearchFilterOptions = (jsonArray) => {
    const keys = getAllKeys(jsonArray);
    const forbidden_keys = ['image', 'price', 'year_built', 'cost_per_unit'];
    const ul = document.getElementById('filter-by-id');
    const button = document.getElementById('popup-button');
    
    const createFilterManager = () => {
        let filteredKey = 'ship_name';
        
        return {
            getKey: () => filteredKey,
            setKey: (newKey) => {
                filteredKey = newKey;
                button.textContent = filteredKey.toUpperCase().replaceAll("_", " ");
                return filteredKey;
            }
        };
    };
    
    const filterManager = createFilterManager();
    
    button.textContent = 'SHIP NAME';
    keys.forEach(key => {
        if (!forbidden_keys.includes(key)) {
            const li = document.createElement('li');
            li.className = "filter-options";
            li.textContent = key.toUpperCase().replaceAll("_", " ");
            
            li.addEventListener('click', () => {
                filterManager.setKey(key);
            });
            
            ul.appendChild(li);
        }
    });
    
    return filterManager;
};

const welcomeScreen = () => {
    const dashboardContainer = document.getElementById('dashboard-container');
    dashboardContainer.textContent = '';
    const welcomeScreen = document.createElement('div');
    welcomeScreen.className = 'welcome-screen';
    welcomeScreen.style.display = 'flex';
    welcomeScreen.style.flexDirection = 'column';
    welcomeScreen.style.height = '80%';
    const welcomeText = document.createElement('h3');
    welcomeText.textContent = 'Welcome to the Ship Dashboard 🚀';
    welcomeScreen.appendChild(welcomeText);
    const toSearch = document.createElement('p');
    toSearch.style.padding=  '32px 16px';
    toSearch.style.fontSize = '14pt';
    toSearch.textContent = 'To search for a 🛳️, please use the search bar above 🌊';
    welcomeScreen.appendChild(toSearch);
    // Create and Append Map Container
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    welcomeScreen.appendChild(mapContainer);
    dashboardContainer.appendChild(welcomeScreen);

    try {
        const map = initMap('map-container', '1', 7.3521, 300, 2);
        jsonObject.forEach(ship => {
            addMarker(map, ship.coordinates.latitude, ship.coordinates.longitude);
        });
        
    } catch (TypeError) {
        window.onload = function() {
            const map = initMap('map-container', '1', 7.3521, 300, 2);
            jsonObject.forEach(ship => {
                addMarker(map, ship.coordinates.latitude, ship.coordinates.longitude);
            }
        )}
    }
}


const dashBoardScreen = () => {
    const dashboardContainer = document.getElementById('dashboard-container');

    // Create Dashboard Title
    const dashboardTitle = document.createElement('h3');
    dashboardTitle.textContent = 'Dashboard';
    dashboardContainer.appendChild(dashboardTitle);

    // Create Written Details
    const writtenDetails = document.createElement('div');
    writtenDetails.className = 'written-details';

    // Create Vessel Cards
    const vesselCard1 = document.createElement('div');
    vesselCard1.className = 'vessel-card';
    const vesselNameKey = document.createElement('p');
    vesselNameKey.id = 'vesselNameKey';
    vesselNameKey.className = 'details-header';
    const vesselName = document.createElement('p');
    vesselName.id = 'vesselName';
    vesselName.className = 'details-son';
    vesselCard1.appendChild(vesselNameKey);
    vesselCard1.appendChild(vesselName);

    const vesselCard2 = document.createElement('div');
    vesselCard2.className = 'vessel-card';
    const currentLocationKey = document.createElement('p');
    currentLocationKey.id = 'currentLocationKey';
    currentLocationKey.className = 'details-header';
    const currentLocation = document.createElement('p');
    currentLocation.id = 'currentLocation';
    vesselCard2.appendChild(currentLocationKey);
    vesselCard2.appendChild(currentLocation);

    const vesselCard3 = document.createElement('div');
    vesselCard3.className = 'vessel-card';
    const captainsNameKey = document.createElement('p');
    captainsNameKey.id = 'captainsNameKey';
    captainsNameKey.className = 'details-header';
    const captainsName = document.createElement('p');
    captainsName.id = 'captainsName';
    vesselCard3.appendChild(captainsNameKey);
    vesselCard3.appendChild(captainsName);

    // Append Cards to Written Details
    writtenDetails.appendChild(vesselCard1);
    writtenDetails.appendChild(vesselCard2);
    writtenDetails.appendChild(vesselCard3);

    // Add More Details Button
    const moreDetailsBtn = document.createElement('button');
    moreDetailsBtn.id = 'more-details-btn';
    moreDetailsBtn.textContent = 'More Details';
    writtenDetails.appendChild(moreDetailsBtn);

    // Append Written Details to Dashboard
    dashboardContainer.appendChild(writtenDetails);

    // Create and Append Map Container
    const mapContainer = document.createElement('div');
    mapContainer.id = 'map-container';
    dashboardContainer.appendChild(mapContainer);
};


document.addEventListener('DOMContentLoaded', () => {
    const data = jsonObject;
    const filterManager = setSearchFilterOptions(data);
    const screenState = {
        WELCOME: () => welcomeScreen(),
        DASHBOARD: () => dashBoardScreen()
    }
    screenState.WELCOME();

    const updateShipsList = (searchTerm) => {
        const filteredKey = filterManager.getKey();
        const filteredShips = getShipByKey(data, filteredKey, searchTerm);
        // Update the ship details
        if (filteredShips.length > 0)
            appendShipsToList(filteredShips);

    }
    updateShipsList('');
    document.querySelector('.popup-button').addEventListener('click', function() {
        const checkbox = this.previousElementSibling;
        checkbox.checked = !checkbox.checked;
    })

    
    const searchInput = document.getElementById('user-input');
    searchInput.addEventListener('input', (event) => {
        updateShipsList(event.target.value);
        if (event.target.value === '') {
            screenState.WELCOME();
        }
    });
});