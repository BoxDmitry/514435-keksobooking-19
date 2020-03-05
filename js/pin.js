'use strict';

(function () {
  var ESC_KEY = window.constants.escKey;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftButtonMouseKey;

  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_HEIGHT_OFFSET = 22;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinLeftOffset = pinTemplate.offsetWidth / 2;
  var pinTopOffset = pinTemplate.offsetHeight;

  var mapElement = document.querySelector('.map');
  var mapPointsElement = document.querySelector('.map__pins');

  var onHiddenAdvertisementEsc = function (evt) {
    var keyButton = evt.key;

    if (keyButton === ESC_KEY) {
      hiddenAdvertisement();
    }
  };

  var onButtonHiddenAdvertisement = function (evt) {
    var button = evt.button;

    if (button === LEFT_BUTTON_MOUSE_KEY) {
      hiddenAdvertisement();
    }
  };

  var hiddenAdvertisement = function () {
    var mapPinActivate = document.querySelector('button.map__pin--active');
    var mapPinActivateClassList = mapPinActivate.classList;

    var card = document.querySelector('.map__card');
    var clossButtonCard = card.querySelector('.popup__close');

    document.removeEventListener('keydown', onHiddenAdvertisementEsc);
    clossButtonCard.removeEventListener('click', onButtonHiddenAdvertisement);
    card.remove();
    mapPinActivateClassList.remove('map__pin--active');
  };

  var renderCard = window.card.render;

  var onShowAdvertisement = function (evt) {
    var buttonAсtive = document.querySelector('button.map__pin--active');
    var buttonClickElement = evt.target;
    var buttonClickElementTagName = buttonClickElement.tagName;
    var buttonClickElementClassList = buttonClickElement.classList;

    var cardElement = document.querySelector('.map__card');

    if (buttonAсtive) {
      buttonAсtive.classList.remove('map__pin--active');
    }

    if (buttonClickElementTagName === 'BUTTON') {
      buttonClickElementClassList.add('map__pin--active');
    } else {
      buttonClickElementClassList.add('map__pin--active');
    }

    if (cardElement) {
      cardElement.remove();
    }

    var idAdvertisement = evt.toElement.dataset.advertisement;
    var card = document.createDocumentFragment();

    card.appendChild(renderCard(window.data[idAdvertisement]));
    document.addEventListener('keydown', onHiddenAdvertisementEsc);
    mapElement.appendChild(card);
  };

  var renderPin = function (advertisement, id) {
    var pinElement = pinTemplate.cloneNode(true);
    var pinImageElement = pinElement.querySelector('img');

    pinElement.style.left = advertisement.location.x + pinLeftOffset + 'px';
    pinElement.style.top = advertisement.location.y + pinTopOffset + 'px';
    pinImageElement.src = advertisement.author.avatar;
    pinImageElement.alt = advertisement.offer.title;
    pinElement.dataset.advertisement = id;
    pinImageElement.dataset.advertisement = id;
    pinElement.addEventListener('click', onShowAdvertisement);

    return pinElement;
  };

  window.pin = {
    WIDTH: PIN_WIDTH,
    HEIGHT: PIN_HEIGHT,
    HEIGHT_OFFSET: PIN_HEIGHT_OFFSET,
    render: renderPin,
    pointsElement: mapPointsElement,
  };
})();
