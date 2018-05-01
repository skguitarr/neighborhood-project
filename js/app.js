var ViewModel = function () {
	var self = this;

	self.places = ko.observableArray(
		[
			{ address: '3199 Maple Dr NE, Atlanta, GA 30305', extraClass: 'active' },
			{ address: '3393 Peachtree Rd NE', extraClass: '' },
			{ address: '3050 Peachtree Rd NW, Atlanta, GA 30305', extraClass: '' },
			{ address: 'Caribou Coffee, Peachtree Road Northeast, Atlanta, GA', extraClass: '' },
			{ address: '3101 Piedmont Rd NE, Atlanta, GA', extraClass: '' }
		]
	);

	self.hello = function(place) {
		alert(place.address);
	}
}

ko.applyBindings(new ViewModel());
