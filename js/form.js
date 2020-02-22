'use strict';

(function () {
  var NAME_ADDRESS_INPUT = 'address';
  var INPUT_FORM_NAME = ['title', 'price'];
  var CLASS_LIST_BUTTON_MAP = 'map__pin map__pin--main';

  var MAX_CAPACITY_ROOMS = 100;

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var MAX_LENGTH_TITLE = 100;
  var MIN_LENGTH_TITLE = 30;

  var formElement = document.querySelector('.ad-form');

  var formAddressInput = formElement.querySelector('#address');
  var formRoomsSelect = formElement.querySelector('#room_number');
  var formCapacitySelect = formElement.querySelector('#capacity');
  var formTypeSelect = formElement.querySelector('#type');
  var formPriceSelect = formElement.querySelector('#price');
  var formTimeInSelect = formElement.querySelector('#timein');
  var formTimeOutSelect = formElement.querySelector('#timeout');

  var sendFormButton = formElement.querySelector('.ad-form__submit');

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

  var onTypeChanged = function () {
    var type = formTypeSelect.value;

    var minPrice = 0;

    switch (type) {
      case 'bungalo':
        minPrice = MIN_PRICE_BUNGALO;
        break;
      case 'flat':
        minPrice = MIN_PRICE_FLAT;
        break;
      case 'house':
        minPrice = MIN_PRICE_HOUSE;
        break;
      case 'palace':
        minPrice = MIN_PRICE_PALACE;
        break;
    }

    formPriceSelect.min = minPrice;
    formPriceSelect.placeholder = minPrice;

    validateForm('price');
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

  var onInputForm = function (evt) {
    validateForm(evt.target.name, false);
  };

  var onFocusForm = function (evt) {
    evt.target.parentNode.classList.remove('error--send');
  };

  var onBlurForm = function (evt) {
    validateForm(evt.target.name, true);
  };

  var getValueLengthElement = function (element) {
    return document.querySelector(element).value.length;
  };

  var onHiddenErrorMessage = function (evt) {
    evt.target.removeEventListener('click', onHiddenErrorMessage);
    evt.target.remove();
  };

  var removeErrorElement = function (nameElement) {
    var element = document.querySelector(nameElement);
    element.parentNode.classList.remove('error--send');
    if (element.parentNode.querySelector('.info--error')) {
      element.parentNode.querySelector('.info--error').removeEventListener('click', onHiddenErrorMessage);
      element.parentNode.querySelector('.info--error').remove();
    }
  };

  var addErrorClassElement = function (nameElement, messageError, errorShowStat) {
    var element = document.querySelector(nameElement);
    var messageErrorElement;
    if (errorShowStat) {
      element.parentNode.classList.add('error--send');
    }
    if (!element.parentNode.querySelector('.info--error')) {
      messageErrorElement = document.createElement('span');
      messageErrorElement.classList.add('info--error');
      messageErrorElement.textContent = messageError;
      element.parentNode.appendChild(messageErrorElement);
      element.parentNode.querySelector('.info--error').addEventListener('click', onHiddenErrorMessage);
    } else {
      messageErrorElement = element.parentNode.querySelector('.info--error');
      messageErrorElement.textContent = messageError;
    }
  };

  var validateForm = function (type, errorShowStat) {
    var messageError;
    var errorStat = false;

    switch (type) {
      case 'title':
        var titleValue = getValueLengthElement('[name="title"]');

        if (titleValue === 0) {
          messageError = 'Необходимо указать заголовок объявления';
          errorStat = true;
          break;
        }

        if (titleValue < MIN_LENGTH_TITLE || titleValue > MAX_LENGTH_TITLE) {
          messageError = titleValue < MIN_LENGTH_TITLE ? 'Заголовок объявлния должен быть не кроче ' + MIN_LENGTH_TITLE + ' символов' : 'Заголовок объявления должен быть не длинее ' + MAX_LENGTH_TITLE + ' симмволов';
          errorStat = true;
        }

        break;
      case 'price':
        var costValue = Number(document.querySelector('[name="price"]').value);

        if (costValue === 0) {
          messageError = 'Необходимо указать цену за ночь';
          errorStat = true;
          break;
        }

        if (costValue < Number(document.querySelector('[name="price"]').min) || costValue > Number(document.querySelector('[name="price"]').max)) {
          var typeChanged;

          switch (formTypeSelect.value) {
            case 'bungalo':
              typeChanged = ' бунгало';
              break;
            case 'flat':
              typeChanged = ' квартире';
              break;
            case 'house':
              typeChanged = ' доме';
              break;
            case 'palace':
              typeChanged = 'о дворце';
              break;
          }

          messageError = costValue < Number(document.querySelector('[name="price"]').min) ? 'Цена за ночь в' + typeChanged + ' не может быть меньше ' + document.querySelector('[name="price"]').min + ' руб' : 'Цена за ночь в' + typeChanged + ' не может быть больше ' + document.querySelector('[name="price"]').max + ' руб';
          errorStat = true;
        }
        break;
    }

    if (errorStat) {
      addErrorClassElement('[name="' + type + '"]', messageError, errorShowStat);
      return false;
    } else {
      removeErrorElement('[name="' + type + '"]');
      return true;
    }
  };

  var onSendForm = function (evt) {
    evt.preventDefault();

    var validateFormStat = true;

    for (var r = 0; r < INPUT_FORM_NAME.length; r++) {
      if (!validateForm(INPUT_FORM_NAME[r], true)) {
        validateFormStat = false;
      }
    }

    if (validateFormStat) {
      var successHandler = function () {
        var successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

        successElement.querySelector('.success__message').textContent = 'Ваше объявление<br>успешно размещено!';

        document.querySelector('main').appendChild(successElement);
      };

      var sendForm = function () {
        window.backend.save(successHandler, window.backend.errorXhr, window.backend.API_URL.send, new FormData(formElement), sendForm);
      };

      sendForm();
    }
  };

  var inputElementsArray = document.querySelectorAll('input');
  for (var t = 0; t < inputElementsArray.length; t++) {
    inputElementsArray[t].disabled = true;
  }

  var textareaElementsArray = document.querySelectorAll('textarea');
  for (var y = 0; y < textareaElementsArray.length; y++) {
    textareaElementsArray[y].disabled = true;
  }

  var buttonElementsArray = document.querySelectorAll('button');
  for (var s = 0; s < buttonElementsArray.length; s++) {
    if (buttonElementsArray[s].classList.value !== CLASS_LIST_BUTTON_MAP) {
      buttonElementsArray[s].disabled = true;
    }
  }

  var selectElementsArray = document.querySelectorAll('select');
  for (var l = 0; l < selectElementsArray.length; l++) {
    selectElementsArray[l].disabled = true;
  }

  var renderPin = window.pin.render;

  var activateForm = function () {
    if (!formElement.classList.contains('ad-form--disabled')) {
      return;
    }

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.length; i++) {
      fragment.appendChild(renderPin(window.data[i], i));
    }
    window.pin.pointsElement.appendChild(fragment);

    window.map.element.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    var inputElements = document.querySelectorAll('input');
    for (var r = 0; r < inputElements.length; r++) {
      if (inputElements[r].name !== NAME_ADDRESS_INPUT) {
        inputElements[r].disabled = false;
      }

      if (INPUT_FORM_NAME.indexOf(inputElements[r].name) !== -1) {
        inputElements[r].addEventListener('input', onInputForm);
        inputElements[r].addEventListener('blur', onBlurForm);
        inputElements[r].addEventListener('focus', onFocusForm);
      }
    }

    var buttonElements = document.querySelectorAll('button');
    for (var u = 0; u < buttonElements.length; u++) {
      buttonElements[u].disabled = false;
    }

    var textareaElements = document.querySelectorAll('textarea');
    for (var q = 0; q < textareaElements.length; q++) {
      textareaElements[q].disabled = false;
    }

    var selectElements = document.querySelectorAll('select');
    for (var e = 0; e < selectElements.length; e++) {
      selectElements[e].disabled = false;
    }

    var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
    var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT / 2 + window.pin.HEIGHT_OFFSET;

    formRoomsSelect.addEventListener('input', onCapacity);
    formTypeSelect.addEventListener('input', onTypeChanged);
    formTimeInSelect.addEventListener('input', onTimeIn);
    formTimeOutSelect.addEventListener('input', onTimeOut);

    formAddressInput.value = locationX + ', ' + locationY;

    sendFormButton.addEventListener('click', onSendForm);
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

  var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
  var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT / 2;

  formAddressInput.value = locationX + ', ' + locationY;

  window.form = {
    activate: activateForm
  };
})();
