var id="165_65_180430";

getNextStop(id);

function getDelay(tripId){
  $.getJSON("testdata.json", function (data) {
    for(var i=0; i<data.tripUpdates.length; i++){
      if(data.tripUpdates[i].tripId==tripId){
        $("#bus_delay").html(Math.floor(data.tripUpdates[i].delay/60));
      }
    }
  });
}

getDelay(id);

function getIndex(tripId, callback){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      callback(i);
      break;
    }
  }
});
}

getBusNum(id);

function getBusNum(tripId){
  $.getJSON("testdata.json", function (data) {
  for(var i=0; i<data.tripUpdates.length; i++){
    if(data.tripUpdates[i].tripId==tripId){
      //return data.tripUpdates[i].routeName;
      $("#bus_id").html(data.tripUpdates[i].routeName);
    }
  }
});
}



function getNextStop(tripId){
  getIndex(tripId, function(index){
    console.log("ahoj");
    $.getJSON("testdata.json", function (busdata) {
    $.get("jizdnirad/stop_times.csv", function (data) {
      var stops = data.split("\n");
      for(var i=0; i<stops.length; i++){
          var params = stops[i].split(",");
          if(params[0]==tripId){

            if(params[3]==busdata.tripUpdates[index].measuredStopId){
              var nextStopId=stops[i+1].split(",")[3]; //musí se zarazit na konečné zastávce a nepřetéct
              console.log(nextStopId);
            }
          }
      }
      $.get("jizdnirad/stops.csv", function (data) {
        var stops=data.split("\n");
        for (var i=0; i<stops.length; i++){
          if(stops[i].split(",")[0]==nextStopId){
            $("#bus_next_stop").html(stops[i].split(",")[1].replace('"','').replace('"',''));
          }
        }
      });
    });
    });
  });
}

function getNextStops(tripId){
  getIndex(tripId, function(index){
    console.log("ahoj");
    $.getJSON("testdata.json", function (busdata) {
    $.get("jizdnirad/stop_times.csv", function (data) {
      var stops = data.split("\n");
      for(var i=0; i<stops.length; i++){
          var params = stops[i].split(",");
          if(params[0]==tripId){
            if(params[3]==busdata.tripUpdates[index].measuredStopId){
              var nextStopId=stops[i+1].split(",")[3]; //musí se zarazit na konečné zastávce a nepřetéct
              console.log(nextStopId);
            }
          }
      }
      $.get("jizdnirad/stops.csv", function (data) {
        var stops=data.split("\n");
        for (var i=0; i<stops.length; i++){
          if(stops[i].split(",")[0]==nextStopId){
            $("#bus_next_stop").html(stops[i].split(",")[1].replace('"','').replace('"',''));
          }
        }
      });
    });
    });
  });
}

function nextStopETA(tripId){
  getIndex(tripId, function(index){
    $.getJSON("testdata.json", function (busdata){
    $.get("jizdnirad/stop_times.csv", function (data) {
      var stops = data.split("\n");
      for(var i=0; i<stops.length; i++){
          var params = stops[i].split(",");
          if(params[0]==tripId){
            if(params[3]==busdata.tripUpdates[index].measuredStopId){
              $("#bus_next_stop_eta").html(stops[i+1].split(",")[1]); //nějak přičíst zpoždění (v sekundách)
            }
          }
      }
    });
    });
  });
}
