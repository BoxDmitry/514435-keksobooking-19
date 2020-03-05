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

    document.removeEventListener('keydown', onHiddenAdvertisementEsc);
    card.querySelector('.popup__close').removeEventListener('click', onButtonHiddenAdvertisement);
    card.remove();
    mapPinActivateClassList.remove('map__pin--active');
  };

  var renderCard = window.card.render;

  var onShowAdvertisement = function (evt) {
    var buttonAvtive = document.querySelector('button.map__pin--active');
    var buttonClickElement = evt.target;
    var buttonClickElementParent = buttonClickElement.parentNode;

    if (buttonAvtive) {
      buttonAvtive.classList.remove('map__pin--active');
    }

    if (buttonClickElement.tagName === 'BUTTON') {
      buttonClickElement.classList.add('map__pin--active');
    } else {
      buttonClickElementParent.classList.add('map__pin--active');
    }

    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }

    var idAdvertisement = evt.toElement.dataset.advertisement;
    var card = document.createDocumentFragment();

    card.appendChild(renderCard(window.data[idAdvertisement]));
    document.addEventListener('keydown', onHiddenAdvertisementEsc);
    mapElement.appendChild(card);
  };

  var renderPin = function (advertisement, id) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = advertisement.location.x + pinLeftOffset + 'px';
    pinElement.style.top = advertisement.location.y + pinTopOffset + 'px';
    pinElement.querySelector('img').src = advertisement.author.avatar;
    pinElement.querySelector('img').alt = advertisement.offer.title;
    pinElement.dataset.advertisement = id;
    pinElement.querySelector('img').dataset.advertisement = id;
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
