'use strict';

(function () {
  var NAME_ADDRESS_INPUT = 'address';

  var MAX_CAPACITY_ROOMS = 100;

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var formElement = document.querySelector('.ad-form');

  var formAddressInput = formElement.querySelector('#address');
  var formRoomsSelect = formElement.querySelector('#room_number');
  var formCapacitySelect = formElement.querySelector('#capacity');
  var formTypeSelect = formElement.querySelector('#type');
  var formPriceSelect = formElement.querySelector('#price');
  var formTimeInSelect = formElement.querySelector('#timein');
  var formTimeOutSelect = formElement.querySelector('#timeout');

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
      } else {
        optionTimeArray[y].selected = true;
      }
    }
  };

  var onTimeOut = function () {
    var timeOut = formTimeOutSelect.value;

    var optionTimeArray = formTimeInSelect.querySelectorAll('option');
    for (var e = 0; e < optionTimeArray.length; e++) {
      if (timeOut !== optionTimeArray[e].value) {
        optionTimeArray[e].selected = false;
      } else {
        optionTimeArray[e].selected = true;
      }
    }
  };

  var inputElementsArray = document.querySelectorAll('input');
  for (var t = 0; t < inputElementsArray.length; t++) {
    inputElementsArray[t].disabled = true;
  }

  var selectElementsArray = document.querySelectorAll('select');
  for (var l = 0; l < selectElementsArray.length; l++) {
    selectElementsArray[l].disabled = true;
  }

  var renderPin = window.pin.render;

  var activateForm = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(renderPin(window.data[i], i));
    }
    window.pin.pointsElement.appendChild(fragment);

    window.map.element.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');


    var inputElements = document.querySelectorAll('input');
    for (var r = 0; t < inputElements.length; r++) {
      if (inputElements[r].name !== NAME_ADDRESS_INPUT) {
        inputElements[r].disabled = false;
      }
    }

    var selectElements = document.querySelectorAll('select');
    for (var e = 0; e < selectElements.length; e++) {
      selectElements[e].disabled = false;
    }

    var locationX = mapPinMainElement.offsetLeft + window.pin.PIN_WIDTH / 2;
    var locationY = mapPinMainElement.offsetTop + window.pin.PIN_HEIGHT / 2 + window.pin.PIN_HEIGHT_OFFSET;

    formRoomsSelect.addEventListener('input', onCapacity);
    formTypeSelect.addEventListener('input', onType);
    formTimeInSelect.addEventListener('input', onTimeIn);
    formTimeOutSelect.addEventListener('input', onTimeOut);

    formAddressInput.value = locationX + ', ' + locationY;
  };

  var optionCapacityArray = formCapacitySelect.querySelectorAll('option');
  for (var r = 0; r < optionCapacityArray.length; r++) {
    if (optionCapacityArray[r].value !== formRoomsSelect.value) {
      optionCapacityArray[r].disabled = true;
      optionCapacityArray[r].selected = false;
    }
  }

  formPriceSelect.min = MIN_PRICE_FLAT;
  formPriceSelect.placeholder = MIN_PRICE_FLAT;

  var locationX = mapPinMainElement.offsetLeft + window.pin.PIN_WIDTH / 2;
  var locationY = mapPinMainElement.offsetTop + window.pin.PIN_HEIGHT / 2;

  formAddressInput.value = locationX + ', ' + locationY;

  window.form = activateForm;
})();
