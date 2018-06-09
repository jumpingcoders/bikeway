var id="165_65_180430";

function getDelay(tripId){
  $.getJSON("testdata.json", function (data) {
    for(var i=0; i<data.tripUpdates.length; i++){
      if(data.tripUpdates[i].tripId==tripId){
        return Math.floor(data.tripUpdates[i].delay/60);
      }
    }
  });
}

getDelay(id);

function getIndex(tripId){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      return i;
    }
  }
});
}

getBusNum(id);

function getBusNum(tripId){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      console.log(data.tripUpdates[i].routeName);
      //return data.tripUpdates[i].routeName;
      $("#bus_id").html(data.tripUpdates[i].routeName);
    }
  }
});
}

function getNextStop(tripId){
  $.getJSON("testdata.json", function (busdata) {
  $.get("jizdnirad/stop_times.csv", function (data) {
    var stops = data.split("\n");
    for(var i=0; i<stops.length; i++){
        var params = stops[i].split(",");
        if(params[0]==tripId){
          if(params[3]==busdata.tripUpdates[/*getIndex(tripId)*/27].measuredStopId){
            var nextStopId=stops[i+1].split(",")[3];
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
    });
  });
  });

}

function nextStopETA(tripId){
  $.getJSON("testdata.json", function (busdata){
  $.get("jizdnirad/stop_times.csv", function (data) {
    var stops = data.split("\n");
    for(var i=0; i<stops.length; i++){
        var params = stops[i].split(",");
        if(params[0]==tripId){
          if(params[3]==busdata.tripUpdates[/*getIndex(tripId)*/27].measuredStopId){
            var nextStopTime=stops[i+1].split(",")[1]; //nějak přičíst zpoždění (v sekundách)
          }
        }
    }
  });
  });
}
