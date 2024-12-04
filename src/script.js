const fs = require('fs').promises;
const { log } = require('console');
const path = require('path');

const getJSONFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
    }
};

const getAllKeys = (jsonArray) => {
    if (Array.isArray(jsonArray) && jsonArray.length > 0) {
        return Object.keys(jsonArray[0]); // Get keys from the first object in the array
    }
    return [];
};

const getShipByNumber = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key] === value);
}

// key = 'serial_number' and value = 'SN89012'

const getShipByName = (jsonArray, key, value) => {
    return jsonArray.filter(obj => obj[key].includes(value));
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




// // Usage example
const filePath = path.join(__dirname, '../data', 'data.json');
getJSONFile(filePath).then(data => {
    const keys = getAllKeys(data);
    console.log(keys);

    console.log(getShipByName(data, "ship_name", "The Phoenix"));
    console.log(getShipByNumber(data, 'serial_number', "SN89012"));
    console.log(getShipByKind(data, "ship_kind", 'Livestock Carriers'));
    console.log(getShipByLocation(data, "current_location", 'Hamburg, Germany'));
    console.log(getShipByCoordinates(data, "coordinates (latitude, longitude)", "1.3521, 103.8198"));
    console.log(getShipByRoute(data, 'Hong Kong'));

});