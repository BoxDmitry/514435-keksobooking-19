'use strict';

(function () {
  var INPUTS_FORM_NAME = ['title', 'price'];
  var DISABLE_ELEMENTS = ['input', 'button', 'select', 'textarea'];

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var DEFAULT_PIN_COORDINATES = {
    top: mapPinMainElement.style.top,
    left: mapPinMainElement.style.left,
  };

  var MAX_CAPACITY_ROOMS = 100;

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
  var formPriceInput = formElement.querySelector('#price');
  var formTimeInSelect = formElement.querySelector('#timein');
  var formTimeOutSelect = formElement.querySelector('#timeout');
  var formAvaUser = formElement.querySelector('.ad-form-header__preview img');

  var sendFormButton = formElement.querySelector('.ad-form__submit');
  var restetFormButton = formElement.querySelector('.ad-form__reset');

  var onInputCapacity = function () {
    var collRooms = formRoomsSelect.value;
    var optionCapacityArray = formCapacitySelect.querySelectorAll('option');

    for (var r = 0; r < optionCapacityArray.length; r++) {
      if (collRooms < MAX_CAPACITY_ROOMS) {
        var elementCapacityMin = optionCapacityArray[r];
        var capacityMinValue = Number(elementCapacityMin.value);

        if (collRooms < capacityMinValue || capacityMinValue === 0) {
          elementCapacityMin.disabled = true;
          elementCapacityMin.selected = false;
        } else {
          elementCapacityMin.disabled = false;
        }
      } else {
        var elementCapacityMax = optionCapacityArray[r];
        var capacityMaxValue = Number(elementCapacityMax.value);

        if (capacityMaxValue === 0) {
          elementCapacityMax.disabled = false;
          elementCapacityMax.selected = true;
        } else {
          elementCapacityMax.disabled = true;
          elementCapacityMax.selected = false;
        }
      }
    }
  };

  var onInputTypeChanged = function () {
    var roomType = formTypeSelect.value;

    var minPrice = 0;

    switch (roomType) {
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

    formPriceInput.min = minPrice;
    formPriceInput.placeholder = minPrice;

    validateForm('price');
  };

  var onInputTimeIn = function () {
    var timeIn = formTimeInSelect.value;
    var optionTimeArray = formTimeOutSelect.querySelectorAll('option');

    for (var y = 0; y < optionTimeArray.length; y++) {
      optionTimeArray[y].selected = timeIn === optionTimeArray[y].value;
    }
  };

  var onInputTimeOut = function () {
    var timeOut = formTimeOutSelect.value;
    var optionTimeArray = formTimeInSelect.querySelectorAll('option');

    for (var e = 0; e < optionTimeArray.length; e++) {
      optionTimeArray[e].selected = timeOut === optionTimeArray[e].value;
    }
  };

  var onInputForm = function (evt) {
    var inputElement = evt.target;

    validateForm(inputElement.name, false);
  };

  var onFocusForm = function (evt) {
    var parentFormElement = evt.target.parentNode;

    parentFormElement.classList.remove('error--send');
  };

  var onBlurForm = function (evt) {
    var inputElement = evt.target;

    validateForm(inputElement.name, true);
  };

  var getValueLengthElement = function (selector) {
    var matchedElement = document.querySelector(selector);

    return matchedElement.value.length;
  };

  var onHiddenErrorMessage = function (evt) {
    var errorElement = evt.target;

    errorElement.removeEventListener('click', onHiddenErrorMessage);
    errorElement.remove();
  };

  var removeErrorElement = function (selector) {
    var errorElement = document.querySelector(selector);
    var errorElementParent = errorElement.parentNode;

    errorElementParent.classList.remove('error--send');

    if (errorElementParent.querySelector('.info--error')) {
      errorElementParent.querySelector('.info--error').removeEventListener('click', onHiddenErrorMessage);
      errorElementParent.querySelector('.info--error').remove();
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
        var inputValue = document.querySelector('[name="price"]').value;

        var costValue = Number(inputValue);

        if (!inputValue || (costValue === 0 && formPriceInput.min > 0)) {
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

    for (var r = 0; r < INPUTS_FORM_NAME.length; r++) {
      if (!validateForm(INPUTS_FORM_NAME[r], true)) {
        validateFormStat = false;
      }
    }

    if (validateFormStat) {
      var onSuccess = function () {
        var hideSuccess = function () {
          var successElement = document.querySelector('.success');

          successElement.removeEventListener('click', onHideSuccessClick);
          document.removeEventListener('keydown', onHideSuccessKeydown);

          successElement.remove();
        };

        var onHideSuccessClick = function (event) {
          if (event.target.classList.value === 'success') {
            hideSuccess();
          }
        };

        var onHideSuccessKeydown = function (event) {
          if (event.key === window.constants.escKey) {
            hideSuccess();
          }
        };

        var successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

        successElement.querySelector('.success__message').innerHTML = 'Ваше объявление<br>успешно размещено!';

        successElement.addEventListener('click', onHideSuccessClick);
        document.addEventListener('keydown', onHideSuccessKeydown);

        document.querySelector('main').appendChild(successElement);

        disableForm();
      };

      window.backend.save(onSuccess, window.backend.errorXhr, window.backend.API_URL.save, new FormData(formElement));
    }
  };

  var disableElements = function (elemtnt, stat) {
    var elementsArray = document.querySelectorAll(elemtnt);
    for (var t = 0; t < elementsArray.length; t++) {
      if (elementsArray[t] !== mapPinMainElement) {
        elementsArray[t].disabled = stat;
      }
    }
  };

  var disableInputForm = function () {
    for (var t = 0; t < DISABLE_ELEMENTS.length; t++) {
      disableElements(DISABLE_ELEMENTS[t], true);
    }
  };

  disableInputForm();

  var disableForm = function () {
    formElement.classList.add('ad-form--disabled');
    window.map.element.classList.add('map--faded');

    disableInputForm();

    var mapPins = document.querySelectorAll('.map__pin');
    for (var b = 0; b < mapPins.length; b++) {
      if (mapPins[b] !== mapPinMainElement) {
        mapPins[b].remove();
      }
    }

    var inputElementsRemove = document.querySelectorAll('input');
    for (var j = 0; j < inputElementsRemove.length; j++) {
      if (inputElementsRemove[j].type === 'checkbox') {
        inputElementsRemove[j].checked = '';
      } else {
        inputElementsRemove[j].value = '';
      }
      if (inputElementsRemove[j].parentNode.classList.contains('error--send')) {
        inputElementsRemove[j].parentNode.classList.remove('error--send');
        inputElementsRemove[j].parentNode.querySelector('.info--error').remove();
      }
    }

    var textareaElementsRemove = document.querySelectorAll('textarea');
    for (var c = 0; c < textareaElementsRemove.length; c++) {
      textareaElementsRemove[c].value = '';
    }

    mapPinMainElement.style.top = DEFAULT_PIN_COORDINATES.top;
    mapPinMainElement.style.left = DEFAULT_PIN_COORDINATES.left;

    var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
    var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT / 2;

    formAddressInput.value = locationX + ', ' + locationY;

    formTypeSelect.value = 'flat';
    formRoomsSelect.value = '1';
    formCapacitySelect.value = '1';

    formPriceInput.min = MIN_PRICE_FLAT;
    formPriceInput.placeholder = MIN_PRICE_FLAT;

    formTimeInSelect.value = '12:00';
    formTimeOutSelect.value = '12:00';

    window.filter.element.housingType.value = 'any';
    window.filter.element.housingPrice.value = 'any';
    window.filter.element.housingGuests.value = 'any';
    window.filter.element.housingRooms.value = 'any';


    formAvaUser.src = 'img/muffin-grey.svg';
    if (formElement.querySelector('.ad-form__photo-container img')) {
      formElement.querySelector('.ad-form__photo-container img').remove();
    }

    formRoomsSelect.removeEventListener('input', onInputCapacity);
    formTypeSelect.removeEventListener('input', onInputTypeChanged);
    formTimeInSelect.removeEventListener('input', onInputTimeIn);
    formTimeOutSelect.removeEventListener('input', onInputTimeOut);

    sendFormButton.removeEventListener('click', onSendForm);
    restetFormButton.removeEventListener('click', onResetForm);

    window.filter.element.housingType.removeEventListener('input', onUpdateFilter);
    window.filter.element.housingPrice.removeEventListener('input', onUpdateFilter);
    window.filter.element.housingGuests.removeEventListener('input', onUpdateFilter);
    window.filter.element.housingRooms.removeEventListener('input', onUpdateFilter);
    var featureFilet = document.querySelectorAll('input.map__checkbox');
    for (var d = 0; d < featureFilet.length; d++) {
      featureFilet[d].removeEventListener('change', onUpdateFilter);
    }
  };

  var onResetForm = function () {
    disableForm();
  };

  var onUpdateFilter = function () {
    window.filter.update();
  };

  var activateForm = function () {
    if (!formElement.classList.contains('ad-form--disabled')) {
      return;
    }

    window.filter.update();
    window.filter.element.housingType.addEventListener('input', onUpdateFilter);
    window.filter.element.housingPrice.addEventListener('input', onUpdateFilter);
    window.filter.element.housingGuests.addEventListener('input', onUpdateFilter);
    window.filter.element.housingRooms.addEventListener('input', onUpdateFilter);
    var featureFiletArray = document.querySelectorAll('input.map__checkbox');
    for (var m = 0; m < featureFiletArray.length; m++) {
      featureFiletArray[m].addEventListener('change', onUpdateFilter);
    }

    window.map.element.classList.remove('map--faded');
    formElement.classList.remove('ad-form--disabled');

    var inputElements = document.querySelectorAll('input');
    for (var r = 0; r < inputElements.length; r++) {
      if (INPUTS_FORM_NAME.indexOf(inputElements[r].name) !== -1) {
        inputElements[r].addEventListener('input', onInputForm);
        inputElements[r].addEventListener('blur', onBlurForm);
        inputElements[r].addEventListener('focus', onFocusForm);
      }
    }

    for (var t = 0; t < DISABLE_ELEMENTS.length; t++) {
      disableElements(DISABLE_ELEMENTS[t], false);
    }

    var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
    var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT + window.pin.HEIGHT_OFFSET;

    formRoomsSelect.addEventListener('input', onInputCapacity);
    formTypeSelect.addEventListener('input', onInputTypeChanged);
    formTimeInSelect.addEventListener('input', onInputTimeIn);
    formTimeOutSelect.addEventListener('input', onInputTimeOut);

    formAddressInput.value = locationX + ', ' + locationY;

    sendFormButton.addEventListener('click', onSendForm);
    restetFormButton.addEventListener('click', onResetForm);
  };

  var optionCapacityArray = formCapacitySelect.querySelectorAll('option');
  for (var r = 0; r < optionCapacityArray.length; r++) {
    if (optionCapacityArray[r].value !== formRoomsSelect.value) {
      optionCapacityArray[r].disabled = true;
      optionCapacityArray[r].selected = false;
    }
  }

  formPriceInput.min = MIN_PRICE_FLAT;
  formPriceInput.placeholder = MIN_PRICE_FLAT;

  var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
  var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT / 2;

  formAddressInput.value = locationX + ', ' + locationY;

  window.form = {
    activate: activateForm,
  };
})();
