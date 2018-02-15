/* =====================
  Lab 2, part3: a full application (stretch goal)

  We're going to use the skills we've just been practicing to write a full application
  which is responsive to user input.
  At your disposal are a set of variables which we use to track user input (see
  part3-main.js and part3-setup.js for more details on how this is done — we'll
  cover this topic at a later date). Their values will be logged to console to
  aid in debugging.

  In this lab, which is very much open-ended, your task is to use the value of
  these variables to define the functions below. Try to come up with interesting
  uses of the provided user input.

  Some ideas:
    There are two numeric fields: can you write this application to filter
    using both minimum and maximum?
    There is a boolean (true/false) field: can you write your code to filter according
    to this boolean? (Try to think about how you could chop up this data to make this meaningful.)
    There is a string field: can you write your code to filter/search based on user
    input?

  Remember, this is open-ended. Try to see what you can produce.
===================== */

/* =====================
  Define a resetMap function to remove markers from the map and clear the array of markers
===================== */
var resetMap = function() {
  /* =====================
  This function removes each marker in the myMarkers list from the map and then resets the existing marker list
  to an empty list
  ===================== */
  _.map(myMarkers, function (marker) {map.removeLayer(marker);});
   myMarkers = [];
};

/* =====================
  Define a getAndParseData function to grab our dataset through a jQuery.ajax call ($.ajax). It
  will be called as soon as the application starts. Be sure to parse your data once you've pulled
  it down!
===================== */
var getAndParseData = function() {
  /* =====================
  This functions retrieves and parses the data.
  ===================== */
var request = $.ajax('https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/world-country-capitals.json');
request.then(function(res){myData = JSON.parse(res);});
return myData;
};

/* =====================
  Call our plotData function. It should plot all the markers that meet our criteria (whatever that
  criteria happens to be — that's entirely up to you)
===================== */
var plotData = function() {
  /* =====================
    Fill out this function definition
  ===================== */
_.map(myData, function(item){
  if (numericField1 == "") {numericField1 = 0;}
  if (numericField2 == "") {numericField2 = 100;}

  if(item.CapitalName.length > parseInt(numericField1) && item.CapitalName.length < parseInt(numericField2) &&
  item.CapitalName.startsWith(stringField) && (item.ContinentName == "Asia") == booleanField)
  {
    Marker = L.marker([parseFloat(item.CapitalLatitude), parseFloat(item.CapitalLongitude)]);
    myMarkers.push(Marker);
    return Marker.addTo(map).bindPopup(item.CapitalName);
  }
}
);
};
