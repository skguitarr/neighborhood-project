var ViewModel = function () {
  this.places = ko.observableArray(
    [
      { address: '3199 Maple Dr NE, Atlanta, GA 30305' },
      { address: '3393 Peachtree Rd NE' },
      { address: '3050 Peachtree Rd NW, Atlanta, GA 30305' },
      { address: 'Caribou Coffee, Peachtree Road Northeast, Atlanta, GA' },
      { address: '3101 Piedmont Rd NE, Atlanta, GA' }
    ]
  );
}

ko.applyBindings(new ViewModel());
