'use strict';

(function () {
  var MAX_ADVERTISEMENTS = 5;

  var filterElement = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
  };

  var MaxAndMinPrice = {
    min: {
      middle: 10000,
      low: 10000,
    },
    max: {
      middle: 50000,
      high: 50000,
    },
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

  var getFeatures = function () {
    var featuresActive = [];

    if (document.querySelector('#filter-wifi').checked) {
      featuresActive.push('wifi');
    }
    if (document.querySelector('#filter-dishwasher').checked) {
      featuresActive.push('dishwasher');
    }
    if (document.querySelector('#filter-parking').checked) {
      featuresActive.push('parking');
    }
    if (document.querySelector('#filter-washer').checked) {
      featuresActive.push('washer');
    }
    if (document.querySelector('#filter-elevator').checked) {
      featuresActive.push('elevator');
    }
    if (document.querySelector('#filter-conditioner').checked) {
      featuresActive.push('conditioner');
    }

    return featuresActive;
  };

  var getSimilarity = function (advertisement) {
    var type = filterElement.housingType.value === 'any' ? 'any' : filterElement.housingType.value;
    var rooms = filterElement.housingRooms.value === 'any' ? 'any' : Number(filterElement.housingRooms.value);
    var guests = filterElement.housingGuests.value === 'any' ? 'any' : Number(filterElement.housingGuests.value);
    var price = filterElement.housingPrice.value;

    var features = getFeatures();

    if (features.length > 0) {
      var featuresAdvertisement = advertisement.offer.features;

      var statFilter = true;

      features
        .forEach(function (feature) {
          if (featuresAdvertisement.indexOf(feature) === -1) {
            statFilter = false;
          }
        });

      if (!statFilter) {
        return false;
      }
    }

    var typeAdvertisement = advertisement.offer.type;

    if (typeAdvertisement !== type && type !== 'any') {
      return false;
    }

    var roomsAdvertisement = advertisement.offer.rooms;

    if (roomsAdvertisement !== rooms && rooms !== 'any') {
      return false;
    }

    var guestsAdvertisement = advertisement.offer.guests;

    if (guestsAdvertisement !== guests && guests !== 'any') {
      return false;
    }

    var priceAdvertisement = advertisement.offer.price;

    switch (price) {
      case 'middle':
        if (priceAdvertisement < MaxAndMinPrice.min.middle && priceAdvertisement > MaxAndMinPrice.max.middle) {
          return false;
        }
        break;
      case 'low':
        if (priceAdvertisement > MaxAndMinPrice.min.low) {
          return false;
        }
        break;
      case 'high':
        if (priceAdvertisement < MaxAndMinPrice.max.high) {
          return false;
        }
        break;
    }

    return true;
  };

  var updateAdvertisementsPin = function () {
    var newRenderAdvertisements = [];

    advertisementsRender
      .filter(function (advertisement) {
        return getSimilarity(advertisement);
      })
      .forEach(function (advertisement) {
        newRenderAdvertisements.push(advertisement);
      });

    render(newRenderAdvertisements);
  };

  var filter = function () {
    var applyFilter = window.debounce(function () {
      var mapPin = Array.from(document.querySelectorAll('.map__pin'));
      var mapPinMainElement = document.querySelector('.map__pin--main');

      window.pin.cardHide();

      mapPin
        .filter(function (pin) {
          return pin !== mapPinMainElement;
        })
        .forEach(function (pin) {
          pin.remove();
        });

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
