'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var WIDTH_IMG = 45;
  var HEIGHT_IMG = 40;
  var LEFT_BUTTON_MOUSE_KEY = 0;

  var hiddenAdvertisement = function () {
    var card = document.querySelector('.map__card');
    document.removeEventListener('keydown', onHiddenAdvertisement);
    card.querySelector('.popup__close').removeEventListener('click', onButtonHiddenAdvertisement);
    card.remove();
  };

  var onHiddenAdvertisement = function (evt) {
    if (evt.key === ESC_KEY) {
      hiddenAdvertisement();
    }
  };

  var onButtonHiddenAdvertisement = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
      hiddenAdvertisement();
    }
  };

  var renderCard = function (advertisement) {
    var cardElement = cardTemplate.cloneNode(true);

    var advertisementType;

    if (advertisement.offer.type === 'flat') {
      advertisementType = 'Квартира';
    } else if (advertisement.offer.type === 'bungalo') {
      advertisementType = 'Бунгало';
    } else if (advertisement.offer.type === 'house') {
      advertisementType = 'Дом';
    } else if (advertisement.offer.type === 'palace') {
      advertisementType = 'Дворец';
    }

    cardElement.querySelector('.popup__title').textContent = advertisement.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = advertisementType;
    cardElement.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' комнаты для ' + advertisement.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;

    cardElement.querySelector('.popup__close').addEventListener('click', onButtonHiddenAdvertisement);

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

  window.card = renderCard;
})();
