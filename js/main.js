'use strict';

var advertisementsQuantity = 8;

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];

var mapElement = document.querySelector('.map');
var mapPointsElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var PIN_LEFT_OFFSET = pinTemplate.offsetWidth / 2;
var PIN_TOP_OFFSET = pinTemplate.offsetHeight;

var MAP_WIDTH = mapPointsElement.offsetWidth;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;

var getRandom = function (min, max) {
  var least = Math.ceil(min);
  var most = Math.floor(max);
  return Math.floor(Math.random() * (most - least + 1)) + least;
};

var getRandomArray = function (array) {
  var actual = [];
  var length = getRandom(0, array.length - 1);

  for (var i = 0; i <= length; i++) {
    actual[actual.length] = actual[i];
  }

  return actual;
};

var getXLocation = function () {
  return getRandom(1, MAP_WIDTH);
};

var getYLocation = function () {
  return getRandom(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);
};

var createSingleAdvertisement = function (index) {
  var avatarId = index < 10 ? '0' + index : index;
  var advertisement = {
    author: {
      avatar:'img/avatars/user' + avatarId + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350', // {{location.x}}, {{location.y}}
      price: 1000,
      type: getRandom(TYPES),
      rooms: 5,
      guests: 10,
      checkin: getRandom(TIMES),
      checkout: getRandom(TIMES),
      features: getRandom(FEATURES),
      description: 'Описание',
      photos: getRandom(PHOTOS)
    },
    location: {
      x: getXLocation(),
      y: getYLocation()
    }
  };
  return advertisement;
};

var createAdvertisementsArray = function (quantity) {
  var actualAdvertisements = [];
  for (var i = 1; i <= quantity; i++) {
    actualAdvertisements[actualAdvertisements.length] = createSingleAdvertisement(i);
  }
  return actualAdvertisements;
};

var advertisements = createAdvertisementsArray(advertisementsQuantity);

mapElement.classList.remove('map--faded');

var renderPin = function (advertisement) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = advertisement.location.x + PIN_LEFT_OFFSET + 'px';
  pinElement.style.top = advertisement.location.y + PIN_TOP_OFFSET + 'px';
  pinElement.querySelector('img').src = advertisement.author.avatar;
  pinElement.querySelector('img').alt = advertisement.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisements.length; i++) {
  fragment.appendChild(renderPin(advertisements[i]));
}
mapPointsElement.appendChild(fragment);
