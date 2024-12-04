window.onload = function() {
    const script = document.createElement('script');
    const KEY = 'AIzaSyBGVuWf1oTD7R3m91wRkQV8gqGueSmyPDg'; // Your API key here
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}`;
    script.async = true; // Load the script asynchronously
    script.defer = true; // Defer the script execution
    document.head.appendChild(script);

    script.onload = function() {
        // Create a map object
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 31.0461, lng: 34 }, // Center for Israel
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP // Default map type
        });

        // Function to add a marker to the map
        function addMarker(lat, lng, title, mapTypeId) {
            const marker = new google.maps.Marker({
                position: { lat: lat, lng: lng },
                map: map,
                title: title
            });
            map.setMapTypeId(mapTypeId);
        }

        // Example usage of addMarker function
        addMarker(31.0461, 34, 'Israel', map);
    };
};