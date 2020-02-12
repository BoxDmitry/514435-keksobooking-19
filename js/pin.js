'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var LEFT_BUTTON_MOUSE_KEY = 0;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapElement = document.querySelector('.map');
  var mapPointsElement = document.querySelector('.map__pins');

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

  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_HEIGHT_OFFSET = 22;

  var PIN_LEFT_OFFSET = pinTemplate.offsetWidth / 2;
  var PIN_TOP_OFFSET = pinTemplate.offsetHeight;

  var hiddenAdvertisement = function () {
    var card = document.querySelector('.map__card');
    document.removeEventListener('keydown', onHiddenAdvertisement);
    card.querySelector('.popup__close').removeEventListener('click', onButtonHiddenAdvertisement);
    card.remove();
  };

  var renderCard = window.card.render;

  var onShowAdvertisement = function (evt) {
    var idAdvertisement = evt.toElement.dataset.advertisement;

    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    var card = document.createDocumentFragment();
    card.appendChild(renderCard(window.data[idAdvertisement]));
    document.addEventListener('keydown', onHiddenAdvertisement);
    mapElement.appendChild(card);
  };

  var renderPin = function (advertisement, id) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = advertisement.location.x + PIN_LEFT_OFFSET + 'px';
    pinElement.style.top = advertisement.location.y + PIN_TOP_OFFSET + 'px';
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
    pointsElement: mapPointsElement
  };
})();
