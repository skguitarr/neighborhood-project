//Setup the initial JSON (normally this will come from the backend)
var locations = [
    {id: 0, title: 'Maple Street Guitars', location: {lat: 33.8425, lng: -84.3722}, venueId: '4c59c48e04f9be9a7024f060'},
    {id: 1, title: 'Lenox Square', location: {lat: 33.8463, lng: -84.3621}, venueId: '40e5f700f964a520110a1fe3'},
    {id: 2, title: 'Seasons 52', location: {lat: 33.8390, lng: -84.3808}, venueId: '4a7c475ef964a52020ec1fe3'},
    {id: 3, title: 'Caribou Coffee', location: {lat: 33.8439, lng: -84.3701}, venueId: '4a524805f964a5207cb11fe3'},
    {id: 4, title: 'Fogo de Chao', location: {lat: 33.8406, lng: -84.3694}, venueId: '4a737a91f964a5208adc1fe3'},
    {id: 5, title: 'Bones', location: {lat: 33.8421, lng: -84.3711}, venueId: '40e0b100f964a520c9051fe3'},
    {id: 6, title: 'Buckhead Station', location: {lat: 33.8496, lng: -84.3702}, venueId: '514e29d4e4b020b3afb83a5d'},
    {id: 7, title: 'Whiskey Mistress', location: {lat: 33.8415, lng: -84.3723}, venueId: '563ac370cd109c48c545e9c0'},
    {id: 8, title: 'Bhojanic', location: {lat: 33.8459, lng: -84.3655}, venueId: '50759014e4b0a4e8d43acc62'}
];

//KnockoutJS ViewModel
var MapsViewModel = function () {
    var self = this;
    self.selectedPlace = ko.observable("");  //Stores the user's place selection
    self.filterInput = ko.observable("");    //Stores the filter string
    self.places = ko.observableArray(locations);  //Observable array storing the locations

    //Called when the user selects a place from the list
    self.placeSelected = function (place) {
        self.selectedPlace(place);
        google.maps.event.trigger(markers[place.id], 'click');  //Trigger marker click to animate the marker
    };

    //Toggles the left nav pane
    self.toggleNav = function () {
        var navDivId = document.getElementById("navDivId");
        var mainDivId = document.getElementById("mainDivId");

        if (navDivId.style.display === "none") {
            navDivId.style.display = "block";
            mainDivId.classList.remove('col-12');
            mainDivId.classList.add('col-9');
        }
        else {
            navDivId.style.display = "none";
            mainDivId.classList.remove('col-9');
            mainDivId.classList.add('col-12');
        }
    };

    //KnockoutJS computed function that filters the list of places
    self.filterPlaces = ko.computed(function () {
        return ko.utils.arrayFilter(self.places(),
            function (place) {
                return (
                    (self.filterInput().length === 0 || place.title.toLowerCase().indexOf(self.filterInput().toLowerCase()) > -1)
                );
        });
    });

    //List of locations is filtered with KO binding, but we have to also update the markers
    self.filterClicked = function() {
        var showIndexes = []; //Indexes to show
        ko.utils.arrayForEach(self.filterPlaces(), function(place) {
            showIndexes.push(place.id);
        });

        //Hide the filtered out markers
        for (var i = 0; i < markers.length; i++) {
            if (showIndexes.indexOf(i) !== -1) {
                markers[i].setVisible(true);
            }
            else {
                markers[i].setVisible(false);
            }
        }

        //Clear the selected place
        self.selectedPlace("");

        //If there's an info window open, then close it
        if (largeInfowindow) {
            largeInfowindow.marker = null;
            largeInfowindow.close();
        }
    };
};

ko.applyBindings(new MapsViewModel());