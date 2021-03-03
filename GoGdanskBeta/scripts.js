

const mymap = L.map('gpsMap').setView([54.3705, 18.6481], 12);
// const marker = L.marker([54.3705, 18.6481]).addTo(mymap);
var markers = L.layerGroup([]);
var dataAndTimeLastData = null;

mymap.addControl( new L.Control.Gps({marker: new L.Marker([0,0])}) );//inizialize control

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXhlbDA5IiwiYSI6ImNra3N5YWM2aTN1MHcydnF0cnBzZTFibDAifQ.lGv3Of7woAr35IlIVDKuIw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(mymap);




var busIcon = L.icon({
    iconUrl: 'models/bus.png',
    iconSize: [25, 25],
    popupAnchor: [0, -15]
});

var tramIcon = L.icon({
    iconUrl: 'models/tram.png',
    iconSize: [25, 25],
    popupAnchor: [0, -15]
});

var busnightIcon = L.icon({
    iconUrl: 'models/busnight.png',
    iconSize: [30, 30],
    popupAnchor: [0, -15]
});


const gps_url = 'https://ckan2.multimediagdansk.pl/gpsPositions'


async function getData(){
    const response = await fetch(gps_url);
    const data = await response.json();  
    // console.log(data.LastUpdateData);
    // console.log(data.Vehicles[2].Line);
    document.getElementById("dataAndTimeOfTime").textContent = data.LastUpdateData;

if (dataAndTimeLastData != data.LastUpdateData){
    markers.clearLayers();
    dataAndTimeLastData = data.LastUpdateData;

    var loopForCheckingData, count = 0;
    for(loopForCheckingData in data.Vehicles) {        
        if(data.Vehicles.hasOwnProperty(loopForCheckingData)) {
            
    
            
            // console.log(data.Vehicles[loopForCheckingData].Line);
            // console.log(data.Vehicles[loopForCheckingData].Speed);
            // console.log(data.Vehicles[loopForCheckingData].Lat);
            // console.log(data.Vehicles[loopForCheckingData].Lon);
            // console.log(data.Vehicles[loopForCheckingData].GPSQuality);
            
            
            if (data.Vehicles[loopForCheckingData].Line >= 106){
                var marker = L.marker([data.Vehicles[loopForCheckingData].Lat, data.Vehicles[loopForCheckingData].Lon],{icon: busIcon});
                marker.bindPopup("Line: "+data.Vehicles[loopForCheckingData].Line +"<br>"+"Speed: "+data.Vehicles[loopForCheckingData].Speed+"<br>"+"GPS Quality: "+data.Vehicles[loopForCheckingData].GPSQuality);

            } else if (data.Vehicles[loopForCheckingData].Line <= 12){

                var marker = L.marker([data.Vehicles[loopForCheckingData].Lat, data.Vehicles[loopForCheckingData].Lon],{icon: tramIcon});
            marker.bindPopup("Line: "+data.Vehicles[loopForCheckingData].Line +"<br>"+"Speed: "+data.Vehicles[loopForCheckingData].Speed+"<br>"+"GPS Quality: "+data.Vehicles[loopForCheckingData].GPSQuality);

            } else {

                var marker = L.marker([data.Vehicles[loopForCheckingData].Lat, data.Vehicles[loopForCheckingData].Lon],{icon: busnightIcon});
                marker.bindPopup("Line: "+data.Vehicles[loopForCheckingData].Line +"<br>"+"Speed: "+data.Vehicles[loopForCheckingData].Speed+"<br>"+"GPS Quality: "+data.Vehicles[loopForCheckingData].GPSQuality);


            }
            
            
            markers.addLayer(marker);
            
            mymap.addLayer(markers);

            
            count++;
        }
        
    }   

    

} else {

    console.log("no refresh");

}
    



    
}




getData();
setInterval(getData,5000);

