'use strict';

(function () {
  var PHOTOS_IMAGE_WIDTH = 45;
  var PHOTOS_IMAGE_HEIGHT = 40;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftButtonMouseKey;

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var hideAdvertisement = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      var clossButtonElement = card.querySelector('.popup__close');
      var pinActiveElement = document.querySelector('button.map__pin--active');

      document.removeEventListener('keydown', onHideAdvertisement);
      clossButtonElement.removeEventListener('click', onButtonHideAdvertisement);

      card.remove();

      if (pinActiveElement) {
        var pinActiveElementClassList = pinActiveElement.classList;

        pinActiveElementClassList.remove('map__pin--active');
      }
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

    var avatarElement = cardElement.querySelector('.popup__avatar');
    var photosElement = cardElement.querySelector('.popup__photos');
    var featuresElement = cardElement.querySelector('.popup__features');
    var clossButtonElement = cardElement.querySelector('.popup__close');

    var avatarAdvertisement = advertisement.author.avatar;
    var photosAdvertisement = advertisement.offer.photos;
    var typeAdvertisement = advertisement.offer.type;

    switch (typeAdvertisement) {
      case 'flat':
        typeAdvertisement = 'Квартира';
        break;
      case 'bungalo':
        typeAdvertisement = 'Бунгало';
        break;
      case 'house':
        typeAdvertisement = 'Дом';
        break;
      case 'palace':
        typeAdvertisement = 'Дворец';
        break;
    }

    var checkElement = function (selector, elementAdvertisement, textElement) {
      var element = cardElement.querySelector(selector);

      if (elementAdvertisement > 0) {
        element.textContent = textElement;
      } else {
        element.remove();
      }
    };

    var checkTwoParametersElement = function (element, elementAdvertisementOne, elementAdvertisementTwo, textElement) {
      if (elementAdvertisementOne > 0 & elementAdvertisementTwo > 0) {
        cardElement.querySelector(element).textContent = textElement;
      } else {
        cardElement.querySelector(element).remove();
      }
    };

    var titleAdvertisement = advertisement.offer.title;
    var titleAdvertisementLength = titleAdvertisement.length;

    checkElement('.popup__title', titleAdvertisementLength, titleAdvertisement);

    var addressAdvertisement = advertisement.offer.address;
    var addressAdvertisementLength = addressAdvertisement.length;

    checkElement('.popup__text--address', addressAdvertisementLength, addressAdvertisement);

    var priceAdvertisement = advertisement.offer.price;
    var priceAdvertisementText = priceAdvertisement + '₽/ночь';

    checkElement('.popup__text--price', priceAdvertisement, priceAdvertisementText);

    var typeAdvertisementLength = typeAdvertisement.length;

    checkElement('.popup__type', typeAdvertisementLength, typeAdvertisement);

    var descriptionAdvertisement = advertisement.offer.description;
    var descriptionAdvertisementLength = descriptionAdvertisement.length;

    checkElement('.popup__type', descriptionAdvertisementLength, descriptionAdvertisement);

    var guestsAdvertisement = advertisement.offer.guests;
    var roomsAdvertisement = advertisement.offer.rooms;
    var capacityAdvertisementText = roomsAdvertisement + ' комнаты для ' + guestsAdvertisement + ' гостей';

    checkTwoParametersElement('.popup__text--capacity', roomsAdvertisement, guestsAdvertisement, capacityAdvertisementText);

    var checkInAdvertisement = advertisement.offer.checkin;
    var checkInAdvertisementLength = checkInAdvertisement.length;

    var checkOutAdvertisement = advertisement.offer.checkout;
    var checkOutAdvertisementLength = checkOutAdvertisement.length;

    var timeText = 'Заезд после ' + checkInAdvertisement + ', выезд до ' + checkOutAdvertisement;

    checkTwoParametersElement('.popup__text--time', checkInAdvertisementLength, checkOutAdvertisementLength, timeText);

    featuresElement.innerHTML = '';

    var featuresAdvertisement = advertisement.offer.features;

    featuresAdvertisement.forEach(function (feature) {
      var featureElementFeature = document.createElement('li');
      var featureElementFeatureClassList = featureElementFeature.classList;

      featureElementFeatureClassList.add('popup__feature');
      featureElementFeatureClassList.add('popup__feature--' + feature);

      featuresElement.appendChild(featureElementFeature);
    });

    photosElement.innerHTML = '';

    photosAdvertisement.forEach(function (photo) {
      var photoElementFeature = document.createElement('img');
      var photoElementFeatureClassList = photoElementFeature.classList;

      photoElementFeatureClassList.add('popup__photo');
      photoElementFeature.src = photo;
      photoElementFeature.width = PHOTOS_IMAGE_WIDTH;
      photoElementFeature.height = PHOTOS_IMAGE_HEIGHT;

      photosElement.appendChild(photoElementFeature);
    });

    avatarElement.src = avatarAdvertisement;

    clossButtonElement.addEventListener('click', onButtonHideAdvertisement);

    return cardElement;
  };

  window.card = {
    render: renderCard,
    hide: hideAdvertisement,
  };
})();
