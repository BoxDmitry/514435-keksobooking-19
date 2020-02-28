'use strict';

(function () {
  var MAX_ADVERTISEMENTS = 5;

  var filterElement = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
  };

  var mapPins = document.querySelector('.map__pins');

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

  var getSimilarity = function (advertisement) {
    var similarity = true;

    var type = filterElement.housingType.value;
    var rooms = filterElement.housingRooms.value === 'any' ? 'any' : Number(filterElement.housingRooms.value);
    var price = filterElement.housingPrice.value;
    var guests = filterElement.housingGuests.value === 'any' ? 'any' : Number(filterElement.housingGuests.value);

    var getFeatures = function () {
      var featuresActive = [];

      if (document.querySelector('#filter-wifi').checked) {
        featuresActive[featuresActive.length] = 'wifi';
      }
      if (document.querySelector('#filter-dishwasher').checked) {
        featuresActive[featuresActive.length] = 'dishwasher';
      }
      if (document.querySelector('#filter-parking').checked) {
        featuresActive[featuresActive.length] = 'parking';
      }
      if (document.querySelector('#filter-washer').checked) {
        featuresActive[featuresActive.length] = 'washer';
      }
      if (document.querySelector('#filter-elevator').checked) {
        featuresActive[featuresActive.length] = 'elevator';
      }
      if (document.querySelector('#filter-conditioner').checked) {
        featuresActive[featuresActive.length] = 'conditioner';
      }

      return featuresActive;
    };

    var features = getFeatures();


    if (features.length > 0) {
      for (var d = 0; d < advertisement.offer.features.length; d++) {
        if (features.indexOf(advertisement.offer.features[d]) === -1) {
          similarity = false;
        }
      }
    }

    if (advertisement.offer.type !== type && type !== 'any') {
      similarity = false;
    }

    if (advertisement.offer.rooms !== rooms && rooms !== 'any') {
      similarity = false;
    }

    if (advertisement.offer.guests !== guests && guests !== 'any') {
      similarity = false;
    }

    switch (price) {
      case 'middle':
        if (advertisement.offer.price < 10000 && advertisement.offer.price > 50000) {
          similarity = false;
        }
        break;
      case 'low':
        if (advertisement.offer.price > 10000) {
          similarity = false;
        }
        break;
      case 'high':
        if (advertisement.offer.price < 50000) {
          similarity = false;
        }
        break;
    }

    return similarity;
  };

  var updateAdvertisementsPin = function () {
    var newRenderAdvertisements = [];

    for (var n = 0; n < advertisementsRender.length; n++) {
      if (getSimilarity(advertisementsRender[n])) {
        newRenderAdvertisements[newRenderAdvertisements.length] = advertisementsRender[n];
      }
    }

    render(newRenderAdvertisements);
  };

  var filter = function () {
    var applyFilter = window.debounce(function () {
      window.card.hide();

      var mapPin = document.querySelectorAll('.map__pin');
      var mapPinMainElement = document.querySelector('.map__pin--main');
      for (var b = 0; b < mapPin.length; b++) {
        if (mapPin[b] !== mapPinMainElement) {
          mapPin[b].remove();
        }
      }

      advertisementsRender = window.data;
      updateAdvertisementsPin();
    });

    applyFilter();
  };

  window.filter = {
    update: filter,
    element: filterElement,
  };
})();
