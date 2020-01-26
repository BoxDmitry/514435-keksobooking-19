'use strict';

var idAvatar = 1;
var ADS_QUANTITY = 8;

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


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

var getFeatures = function () {
  var actualFeatures = [];
  var lengthFeatures = getRandom(0, FEATURES.length - 1);

  for (var i = 0; i <= lengthFeatures; i++) {
    actualFeatures[actualFeatures.length] = FEATURES[i];
  }

  return actualFeatures;
};

var getPhotos = function () {
  var actualPhotos = [];
  var lengthPhotos = getRandom(0, PHOTOS.length - 1);

  for (var i = 0; i <= lengthPhotos; i++) {
    actualPhotos[actualPhotos.length] = PHOTOS[i];
  }

  return actualPhotos;
};

var getAvatar = function () {
  var actualIdAvatar = idAvatar < 10 ? '0' + idAvatar : idAvatar;
  idAvatar++;
  return 'img/avatars/user' + actualIdAvatar + '.png';
};

var getXLocation = function () {
  return getRandom(1, MAP_WIDTH);
};

var getYLocation = function () {
  return getRandom(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);
};

var generationAd = function () {
  var ad = {
    aurhor: {
      avatar: getAvatar()
    },
    offer: {
      title: 'Заголовок',
      address: '600, 350', // {{location.x}}, {{location.y}}
      price: 1000,
      type: 'bungalo',
      rooms: 5,
      guests: 10,
      checkin: '14:00',
      checkout: '12:00',
      features: getFeatures(),
      description: 'Описание',
      photos: getPhotos()
    },
    location: {
      x: getXLocation(),
      y: getYLocation()
    }
  }
  return ad;
};

var generationAds = function (quantity) {
  var actualAds = [];
  for (var i = 0; i < quantity; i++) {
    actualAds[actualAds.length] = generationAd();
  }
  return actualAds;
}

var Ads = generationAds(ADS_QUANTITY);

mapElement.classList.remove('map--faded');

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = ad.location.x + PIN_LEFT_OFFSET + 'px';
  pinElement.style.top = ad.location.y + PIN_TOP_OFFSET + 'px';
  pinElement.querySelector('img').src = ad.aurhor.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < Ads.length; i++) {
  fragment.appendChild(renderPin(Ads[i]));
}
mapPointsElement.appendChild(fragment);
