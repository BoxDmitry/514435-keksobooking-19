'use strict';

(function () {
  var ESC_KEY = window.constants.escKey;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var WIDTH_IMG = 45;
  var HEIGHT_IMG = 40;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftBittonMouseKey;

  var hideAdvertisement = function () {
    var card = document.querySelector('.map__card');
    document.removeEventListener('keydown', onHideAdvertisement);
    card.querySelector('.popup__close').removeEventListener('click', onButtonHideAdvertisement);
    card.remove();
  };

  var onHideAdvertisement = function (evt) {
    if (evt.key === ESC_KEY) {
      hideAdvertisement();
    }
  };

  var onButtonHideAdvertisement = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
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

    if (advertisement.offer.title.length > 0) {
      cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
    }else {
      cardElement.querySelector('.popup__title').remove;
    }

    if (advertisement.offer.address.length > 0) {
      cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    }else {
      cardElement.querySelector('.popup__text--address').remove;
    }

    if (advertisement.offer.price.length > 0)
      cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    }else {
      cardElement.querySelector('.popup__text--price').remove;
    }

    if (advertisementType.length > 0)
      cardElement.querySelector('.popup__type').textContent = advertisementType;
    }

    var popupText = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--capacity').textContent = popupText;

    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

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

    cardElement.querySelector('.popup__description').textContent = advertisement.offer.description;
    cardElement.querySelector('.popup__avatar').src = advertisement.author.avatar;

    return cardElement;
  };

  window.card = {
    render: renderCard
  };
})();
