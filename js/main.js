'use strict';

var advertisementsQuantity = 8;

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];

var MIN_PRICE_BUNGALO = 0;
var MIN_PRICE_FLAT = 1000;
var MIN_PRICE_HOUSE = 5000;
var MIN_PRICE_PALACE = 10000;

var WIDTH_IMG = 45;
var HEIGHT_IMG = 40;

var MAX_CAPACITY_ROOMS = 100;

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var LEFT_BUTTON_MOUSE_KEY = 0;

var NAME_ADDRESS_INPUT = 'address';

var mapElement = document.querySelector('.map');
var mapPointsElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var mapPinMainElement = document.querySelector('.map__pin--main');

var formElement = document.querySelector('.ad-form');

var formAddressInput = formElement.querySelector('#address');
var formRoomsSelect = formElement.querySelector('#room_number');
var formCapacitySelect = formElement.querySelector('#capacity');
var formTypeSelect = formElement.querySelector('#type');
var formPriceSelect = formElement.querySelector('#price');
var formTimeInSelect = formElement.querySelector('#timein');
var formTimeOutSelect = formElement.querySelector('#timeout');

var PIN_WIDTH = 62;
var PIN_HEIGHT = 62;
var PIN_HEIGHT_OFFSET = 22;

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

var getRandomArrayElement = function (array) {
  var actual = [];
  var length = getRandom(0, array.length - 1);

  for (var i = 0; i <= length; i++) {
    actual[actual.length] = array[i];
  }

  return actual;
};

var getRandomElement = function (array) {
  return array[getRandom(0, array.length - 1)];
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

var activateForm = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisements.length; i++) {
    fragment.appendChild(renderPin(advertisements[i], i));
  }
  mapPointsElement.appendChild(fragment);

  mapElement.classList.remove('map--faded');
  formElement.classList.remove('ad-form--disabled');


  var inputElements = document.querySelectorAll('input');
  for (var t = 0; t < inputElements.length; t++) {
    if (inputElements[t].name !== NAME_ADDRESS_INPUT) {
      inputElements[t].disabled = false;
    }
  }

  var selectElements = document.querySelectorAll('select');
  for (var l = 0; l < selectElements.length; l++) {
    selectElements[l].disabled = false;
  }

  var locationX = mapPinMainElement.offsetLeft + PIN_WIDTH / 2;
  var locationY = mapPinMainElement.offsetTop + PIN_HEIGHT / 2 + PIN_HEIGHT_OFFSET;

  formRoomsSelect.addEventListener('input', onCapacity);
  formTypeSelect.addEventListener('input', onType);
  formTimeInSelect.addEventListener('input', onTimeIn);
  formTimeOutSelect.addEventListener('input', onTimeOut);

  formAddressInput.value = locationX + ', ' + locationY;
};

var inputElementsArray = document.querySelectorAll('input');
for (var t = 0; t < inputElementsArray.length; t++) {
  inputElementsArray[t].disabled = true;
}

var selectElementsArray = document.querySelectorAll('select');
for (var l = 0; l < selectElementsArray.length; l++) {
  selectElementsArray[l].disabled = true;
}

var hiddenAdvertisement = function () {
  var card = document.querySelector('.map__card');
  document.removeEventListener('keydown', onHiddenAdvertisement);
  card.querySelector('.popup__close').removeEventListener('click', onButtonHiddenAdvertisement);
  card.remove();
}

var onActivatedForm = function (evt) {
  if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
    activateForm();
  }
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
}

var onShowAdvertisement = function (evt) {
  var idAdvertisement = evt.toElement.dataset.advertisement;

  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
  }
  var card = document.createDocumentFragment();
  card.appendChild(renderCard(advertisements[idAdvertisement]));
  document.addEventListener('keydown', onHiddenAdvertisement);
  mapElement.appendChild(card);
};

var onCapacity = function () {
  var collRooms = formRoomsSelect.value;
  var optionCapacityArray = formCapacitySelect.querySelectorAll('option');

  for (var r = 0; r < optionCapacityArray.length; r++) {
    if (collRooms < MAX_CAPACITY_ROOMS) {
      var elementCapacityMin = optionCapacityArray[r];
      if (collRooms < elementCapacityMin.value || Number(elementCapacityMin.value) === 0) {
        elementCapacityMin.disabled = true;
        elementCapacityMin.selected = false;
      } else {
        elementCapacityMin.disabled = false;
      }
    } else {
      var elementCapacityMax = optionCapacityArray[r];
      if (Number(elementCapacityMax.value) === 0) {
        elementCapacityMax.disabled = false;
        elementCapacityMax.selected = true;
      } else {
        elementCapacityMax.disabled = true;
        elementCapacityMax.selected = false;
      }
    }
  }
};

var onType = function () {
  var type = formTypeSelect.value;

  var minPrice = 0;

  if (type === 'bungalo') {
    minPrice = MIN_PRICE_BUNGALO;
  } else if (type === 'flat') {
    minPrice = MIN_PRICE_FLAT;
  } else if (type === 'house') {
    minPrice = MIN_PRICE_HOUSE;
  } else if (type === 'palace') {
    minPrice = MIN_PRICE_PALACE;
  }

  formPriceSelect.min = minPrice;
  formPriceSelect.placeholder = minPrice;
};

var onTimeIn = function () {
  var timeIn = formTimeInSelect.value;

  var optionTimeArray = formTimeOutSelect.querySelectorAll('option');
  for (var y = 0; y < optionTimeArray.length; y++) {
    if (timeIn !== optionTimeArray[y].value) {
      optionTimeArray[y].selected = false;
    }else {
      optionTimeArray[y].selected = true;
    }
  }
}

var onTimeOut = function () {
  var timeOut = formTimeOutSelect.value;

  var optionTimeArray = formTimeInSelect.querySelectorAll('option');
  for (var e = 0; e < optionTimeArray.length; e++) {
    if (timeOut !== optionTimeArray[e].value) {
      optionTimeArray[e].selected = false;
    }else {
      optionTimeArray[e].selected = true;
    }
  }
}

mapPinMainElement.addEventListener('mousedown', onActivatedForm);

mapPinMainElement.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activateForm();
  }
});

var optionCapacityArray = formCapacitySelect.querySelectorAll('option');
for (var r = 0; r < optionCapacityArray.length; r++) {
  if (optionCapacityArray[r].value !== formRoomsSelect.value) {
    optionCapacityArray[r].disabled = true;
    optionCapacityArray[r].selected = false;
  }
}

formPriceSelect.min = MIN_PRICE_FLAT;
formPriceSelect.placeholder = MIN_PRICE_FLAT;

var locationX = mapPinMainElement.offsetLeft + PIN_WIDTH / 2;
var locationY = mapPinMainElement.offsetTop + PIN_HEIGHT / 2;

formAddressInput.value = locationX + ', ' + locationY;
