


    let maptoken = token;
    mapboxgl.accessToken = maptoken;
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        projection: 'globe',
        zoom: 9, 
        center: coordinates //position [lan,lat];
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); 
    });

    const marker = new mapboxgl.Marker()
    .setLngLat(coordinates)
    .addTo(map);





    
