let map;
let directionsService;
let directionsRenderer;
let waypoints = [];
let autocompleteOrigin;
let autocompleteDestination;
let placesList;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -22.849482, lng: -45.230091 },
        zoom: 13,
        styles: []
    });
    

     // Adicionar marcadores para os pontos turísticos pré-selecionados
     const basilicaMarker = new google.maps.Marker({
        position: { lat: -22.855382, lng: -45.233588 },
        map: map,
        title: 'Basílica de Nossa Senhora Aparecida'
    });

    // Criar janela de informações para a Basílica
    const basilicaInfoWindow = new google.maps.InfoWindow({
        content: '<h3>Basílica de Nossa Senhora Aparecida</h3> <p>Breve descrição da Basílica </p> <img src="https://upload.wikimedia.org/wikipedia/commons/0/0d/Frente_da_Bas%C3%ADlica_de_Nossa_Senhora_Aparecida%2C_Aparecida_SP.JPG" alt="Imagem da Basílica"></div>'
    });

    // Adicionar evento de mouseover para exibir informações ao passar o mouse sobre o marcador da Basílica
    basilicaMarker.addListener('mouseover', function() {
        basilicaInfoWindow.open(map, basilicaMarker);
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

    autocompleteOrigin = new google.maps.places.Autocomplete(document.getElementById('origin'));
    autocompleteDestination = new google.maps.places.Autocomplete(document.getElementById('destination'));

    placesList = document.getElementById('places-list');

    // Adicione um ouvinte para quando um lugar é selecionado no autocompletar
    autocompleteDestination.addListener('place_changed', addWaypoint);
}

function addWaypoint() {
    const place = autocompleteDestination.getPlace();

    // Adiciona o lugar à lista de pontos turísticos
    waypoints.push({ location: place.geometry.location, name: place.name });

    // Adiciona um marcador para o lugar no mapa
    const marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
    });

    // Adiciona o lugar à lista de lugares no lado do site
    const listItem = document.createElement('li');
    listItem.textContent = place.name;
    placesList.appendChild(listItem);

    // Limpa o campo de destino após adicionar o lugar
    document.getElementById('destination').value = '';

    // Calcula a rota novamente quando um ponto turístico é adicionado
    calculateRoute();
}

function calculateRoute() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const mode = document.getElementById('mode').value;

    const request = {
        origin: origin,
        destination: origin,
        waypoints: waypoints.map(waypoint => ({ location: waypoint.location })),
        optimizeWaypoints: true,
        travelMode: mode
    };

    directionsService.route(request, function(response, status) {
        if (status === 'OK') {
            directionsRenderer.setDirections(response);
            computeTotalDistance(response);
        } else {
            window.alert('Falha ao calcular a rota: ' + status);
        }
    });
}

function computeTotalDistance(result) {
    let totalDistance = 0;
    let totalDuration = 0;
    const myroute = result.routes[0];
    for (let i = 0; i < myroute.legs.length; i++) {
        totalDistance += myroute.legs[i].distance.value;
        totalDuration += myroute.legs[i].duration.value;
    }
    totalDistance = totalDistance / 1000; // Converter a distância total de metros para quilômetros
    totalDuration = totalDuration / 60; // Converter o tempo total de segundos para minutos

    // Atualiza a distância total da rota
    document.getElementById('total-distance').innerHTML = 'Distância total da rota: ' + totalDistance.toFixed(2) + ' km';

    // Atualiza o tempo estimado de viagem
    const hours = Math.floor(totalDuration / 60);
    const minutes = Math.round(totalDuration % 60);
    document.getElementById('total-time').innerHTML = 'Tempo estimado de viagem: ' + hours + 'h ' + minutes + 'min';
}
