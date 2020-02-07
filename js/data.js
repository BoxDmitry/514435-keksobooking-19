'use strict';

(function () {
  var advertisementsQuantity = 8;

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];

  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;

  var getRandom = function (min, max) {
    var least = Math.ceil(min);
    var most = Math.floor(max);
    return Math.floor(Math.random() * (most - least + 1)) + least;
  };

  var getRandomElement = function (array) {
    return array[getRandom(0, array.length - 1)];
  };

  var getRandomArrayElement = function (array) {
    var actual = [];
    var length = getRandom(0, array.length - 1);
    for (var i = 0; i <= length; i++) {
      actual[actual.length] = array[i];
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
        avatar: 'img/avatars/user' + avatarId + '.png'
      },
      offer: {
        title: 'Заголовок',
        address: '600, 350', // {{location.x}}, {{location.y}}
        price: 1000,
        type: getRandomElement(TYPES),
        rooms: 5,
        guests: 10,
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getRandomArrayElement(FEATURES),
        description: 'Описание',
        photos: getRandomArrayElement(PHOTOS)
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

  window.data = advertisements;
})();
