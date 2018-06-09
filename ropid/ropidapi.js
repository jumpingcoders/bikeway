function getDelay(var tripId){
  $.getJSON("testdata.json", function (data) {
    for(var i=0; i<data.tripUpdates.length; i++){
      if(data.tripUpdates[i].tripId==tripId){
        var vystup=Math.floor(data.tripUpdates[i].delay/60);
      }
    }
  });
  return vystup;
}

function getIndex(var tripId){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      var vystup = i;
      break;
    }
  }
  return vystup;
}

function getBusNum(var tripId){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      var vystup = data.tripUpdates[i].routeName;
    }
  }
  return vystup;
}

function getNextStop(var tripId){
  $.getJSON("testdata.json", function (busdata1) {
    var busdata = busdata1
  }
  $.get("jizdnirad/stop_times.csv", function (data) {
    var stops = data.split("\n");
    for(var i=0; i<stops.length; i++){
        var params = stops[i].split(",");
        if(params[0]==tripId){
          if(params[3]==busdata.tripUpdates[getIndex(tripId)].measuredStopId){
            var nextStopId=stops[i+1].split(",")[3];
          }
        }
    }
  }
  $.get("jizdnirad/stops.csv", function (data) {
    var stops=data.split("\n");
    for (var i=0; i<stops.length; i++){
      if(stops[i].split(",")[0]==nextStopId){
        return stops[i].split(",")[1];
      }
    }
  }
});
  return vystup;
}

function nextStopETA(var tripId){
  $.getJSON("testdata.json", function (busdata1) {
    var busdata = busdata1
  }
  $.get("jizdnirad/stop_times.csv", function (data) {
    var stops = data.split("\n");
    for(var i=0; i<stops.length; i++){
        var params = stops[i].split(",");
        if(params[0]==tripId){
          if(params[3]==busdata.tripUpdates[getIndex(tripId)].measuredStopId){
            var nextStopTime=stops[i+1].split(",")[1]; //nějak přičíst zpoždění (v sekundách)
          }
        }
    }
  }
}
