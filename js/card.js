'use strict';

(function () {
  var WIDTH_IMG = 45;
  var HEIGHT_IMG = 40;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftBittonMouseKey;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var hideAdvertisement = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      document.removeEventListener('keydown', onHideAdvertisement);
      card.querySelector('.popup__close').removeEventListener('click', onButtonHideAdvertisement);
      card.remove();
      document.querySelector('button.map__pin--active').classList.remove('map__pin--active');
    }
  };

  var onHideAdvertisement = function (evt) {
    var keyButton = evt.key;

    if (keyButton === window.constants.escKey) {
      hideAdvertisement();
    }
  };

  var onButtonHideAdvertisement = function (evt) {
    var button = evt.button;

    if (button === LEFT_BUTTON_MOUSE_KEY) {
      hideAdvertisement();
    }
  };

  var renderCard = function (advertisement) {
    var cardElement = cardTemplate.cloneNode(true);

    var advertisementType;

    switch (advertisement.offer.type) {
      case 'flat':
        advertisementType = 'Квартира';
        break;
      case 'bungalo':
        advertisementType = 'Бунгало';
        break;
      case 'house':
        advertisementType = 'Дом';
        break;
      case 'palace':
        advertisementType = 'Дворец';
        break;
    }

    var checkElement = function (element, elementAdvertisement, textElement) {
      if (elementAdvertisement > 0) {
        cardElement.querySelector(element).textContent = textElement;
      } else {
        cardElement.querySelector(element).remove();
      }
    };

    var checkTwoParametersElement = function (element, elementAdvertisementOne, elementAdvertisementTwo, textElement) {
      if (elementAdvertisementOne > 0 & elementAdvertisementTwo > 0) {
        cardElement.querySelector(element).textContent = textElement;
      } else {
        cardElement.querySelector(element).remove();
      }
    };

    checkElement('.popup__title', advertisement.offer.title.length, advertisement.offer.title);
    checkElement('.popup__text--address', advertisement.offer.address.length, advertisement.offer.address);
    checkElement('.popup__text--price', advertisement.offer.price, advertisement.offer.price + '₽/ночь');
    checkElement('.popup__type', advertisementType.length, advertisementType);
    checkElement('.popup__type', advertisement.offer.description.length, advertisement.offer.description);

    var textCapacity = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    checkTwoParametersElement('.popup__text--capacity', advertisement.offer.rooms, advertisement.offer.guests, textCapacity);

    var textTime = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
    checkTwoParametersElement('.popup__text--time', advertisement.offer.checkin.length, advertisement.offer.checkout.length, textTime);

    cardElement.querySelector('.popup__close').addEventListener('click', onButtonHideAdvertisement);

    cardElement.querySelector('.popup__features').innerHTML = '';
    for (var k = 0; k < advertisement.offer.features.length; k++) {
      var feature = advertisement.offer.features[k];

      var featureElementFeature = document.createElement('li');
      featureElementFeature.classList.add('popup__feature');
      featureElementFeature.classList.add('popup__feature--' + feature);

      cardElement.querySelector('.popup__features').appendChild(featureElementFeature);
    }

    cardElement.querySelector('.popup__photos').innerHTML = '';
    for (var l = 0; l < advertisement.offer.photos.length; l++) {
      var photos = advertisement.offer.photos[l];

      var photosElementFeature = document.createElement('img');

      photosElementFeature.classList.add('popup__photo');
      photosElementFeature.src = photos;
      photosElementFeature.width = WIDTH_IMG;
      photosElementFeature.height = HEIGHT_IMG;

      cardElement.querySelector('.popup__photos').appendChild(photosElementFeature);
    }

    cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return cardElement;
  };

  window.card = {
    render: renderCard,
    hide: hideAdvertisement
  };
})();
