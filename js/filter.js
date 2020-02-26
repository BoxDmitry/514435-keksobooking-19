'use strict';

(function () {
  var filterElement = {
    housingType: document.querySelector('#housing-type'),
    housingPrice: document.querySelector('#housing-price'),
    housingRooms: document.querySelector('#housing-rooms'),
    housingGuests: document.querySelector('#housing-guests'),
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

  var getRank = function (advertisement) {
    var similarityScore = 0;

    var type = filterElement.housingType.value;
    var rooms = Number(filterElement.housingRooms.value);
    var price = filterElement.housingPrice.value;
    var guests = Number(filterElement.housingGuests.value);

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

    if (advertisement.offer.features === getFeatures()) {
      similarityScore += 5;
    }

    if (advertisement.offer.type === type) {
      similarityScore += 4;
    }

    if (advertisement.offer.rooms === rooms) {
      similarityScore += 3;
    }

    if (advertisement.offer.guests === guests) {
      similarityScore += 2;
    }

    switch (price) {
      case 'middle':
        if (advertisement.offer.price >= 10000 && advertisement.offer.price <= 50000) {
          similarityScore += 1;
        }
        break;
      case 'low':
        if (advertisement.offer.price <= 10000) {
          similarityScore += 1;
        }
        break;
      case 'high':
        if (advertisement.offer.price >= 50000) {
          similarityScore += 1;
        }
        break;
    }

    return similarityScore;
  };

  var updateAdvertisementsPin = function () {
    render(advertisementsRender.slice().
      sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = -1;
        }
        return rankDiff;
      }));
  };

  var filter = function () {
    window.card.hide();

    var mapPin = document.querySelectorAll('.map__pin');
    for (var b = 0; b < mapPin.length; b++) {
      if (mapPin[b] !== document.querySelector('.map__pin--main')) {
        mapPin[b].remove();
      }
    }

    advertisementsRender = window.data;
    updateAdvertisementsPin();
  };

  window.filter = {
    update: filter,
    element: filterElement,
  };
})();
