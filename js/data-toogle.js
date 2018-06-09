$('body').bootstrapMaterialDesign();
    
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

var busplace = "Kladno";

var place = function(value) {
    var trip_place = value;
    console.log(trip_place);
    $(".trip_place").html(trip_place);
}