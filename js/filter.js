'use strict';

(function () {
  var filterElement = {
    housingType: document.querySelector('#housing-type')
  };

  var mapPins = document.querySelector('.map__pins');

  var MAX_ADVERTISEMENTS = 5;
  var advertisementsRender;

  var renderAdvertisementsPin = function (advertisement, id) {
    return window.pin.render(advertisement, id);
  };

  var render = function (data) {
    var takeNumber = data.length > MAX_ADVERTISEMENTS ? MAX_ADVERTISEMENTS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      mapPins.appendChild(renderAdvertisementsPin(data[i], window.data.indexOf(data[i])));
    }
  };

  var updateAdvertisementsPin = function (housingType) {
    var newAdvertisementsPin = [];
    for (var y = 0; y < advertisementsRender.length; y++) {
      if (advertisementsRender[y].offer.type === housingType) {
        newAdvertisementsPin[newAdvertisementsPin.length] = advertisementsRender[y];
      }
    }
    render(newAdvertisementsPin);
  };

  var filter = function () {
    var mapPin = document.querySelectorAll('.map__pin');
    for (var b = 0; b < mapPin.length; b++) {
      if (mapPin[b] !== document.querySelector('.map__pin--main')) {
        mapPin[b].remove();
      }
    }

    advertisementsRender = window.data;
    if (filterElement.housingType.value === 'any') {
      render(advertisementsRender);
    } else {
      updateAdvertisementsPin(filterElement.housingType.value);
    }
  };

  window.filter = {
    update: filter,
    element: filterElement,
  };
})();
