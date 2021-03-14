const parking_url = 'https://ckan2.multimediagdansk.pl/parkingLots'
const parkingName_url = 'https://ckan.multimediagdansk.pl/dataset/cb1e2708-aec1-4b21-9c8c-db2626ae31a6/resource/d361dff3-202b-402d-92a5-445d8ba6fd7f/download/parking-lots'
var dataAndTimeLastData = null;

async function getData(){
    const response = await fetch(parking_url);
    const data = await response.json();  
    // console.log(data.LastUpdateData);
    // console.log(data.Vehicles[2].Line);

    
    var dataLastUpdate = data.lastUpdate.replace('T', ' ');
    var dataLastUpdate = dataLastUpdate.replace('Z', ' ');
    document.getElementById("dataAndTimeOfTime").textContent = dataLastUpdate;


    

    var loopForCheckingData, count = 0;

    for(loopForCheckingData in data.parkingLots) {      

        document.getElementById(data.parkingLots[loopForCheckingData].parkingId).textContent = data.parkingLots[loopForCheckingData].availableSpots;
        
    }

    count++;

}





getData();
setInterval(getData,5000);



