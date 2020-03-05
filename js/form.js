'use strict';

(function () {
  var INPUTS_FORM_NAME = ['title', 'price'];
  var DISABLE_ELEMENT_TAGS = ['input', 'button', 'select', 'textarea'];

  var ESC_KEY = window.constants.escKey;

  var MAX_CAPACITY_ROOMS = 100;

  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;

  var MAX_LENGTH_TITLE = 100;
  var MIN_LENGTH_TITLE = 30;

  var mapPinMainElement = document.querySelector('.map__pin--main');

  var mainElement = document.querySelector('main');

  var defaultPinCoordinates = {
    top: mapPinMainElement.style.top,
    left: mapPinMainElement.style.left,
  };

  var formElement = document.querySelector('.ad-form');
  var formElementClassList = formElement.classList;

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

  var housingType = window.filter.element.housingType;
  var housingPrice = window.filter.element.housingPrice;
  var housingGuests = window.filter.element.housingGuests;
  var housingRooms = window.filter.element.housingRooms;

  var mapElement = window.map.element;
  var mapElementClassList = mapElement.classList;

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
    var parentFormElementClassList = parentFormElement.classList;

    parentFormElementClassList.remove('error--send');
  };

  var onBlurForm = function (evt) {
    var inputElement = evt.target;

    validateForm(inputElement.name, true);
  };

  var getValueLengthElement = function (selector) {
    var matchedElement = document.querySelector(selector);
    var matchedElementValue = matchedElement.value;
    var matchedElementValueLength = matchedElementValue.length;

    return matchedElementValueLength;
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
    var elementParentNode = element.parentNode;
    var elementParentNodeClassList = elementParentNode.classList;
    var infoError = elementParentNode.querySelector('.info--error');

    if (errorShowStat) {
      element.parentNode.classList.add('error--send');
    }
    if (infoError) {
      var messageErrorElement = document.createElement('span');
      elementParentNodeClassList.add('info--error');
      messageErrorElement.textContent = messageError;
      elementParentNode.appendChild(messageErrorElement);
      infoError.addEventListener('click', onHiddenErrorMessage);
    } else {
      infoError.textContent = messageError;
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

        var minLengthTitleText = 'Заголовок объявлния должен быть не кроче ' + MIN_LENGTH_TITLE + ' символов';
        var maxLengthTitleText = 'Заголовок объявления должен быть не длинее ' + MAX_LENGTH_TITLE + ' симмволов';

        if (titleValue < MIN_LENGTH_TITLE || titleValue > MAX_LENGTH_TITLE) {
          messageError = titleValue < MIN_LENGTH_TITLE ? minLengthTitleText : maxLengthTitleText;
          errorStat = true;
        }

        break;
      case 'price':
        var inputElement = document.querySelector('[name="price"]');
        var inputValue = inputElement.value;

        var costValue = Number(inputValue);

        if (!inputValue || (costValue === 0 && formPriceInput.min > 0)) {
          messageError = 'Необходимо указать цену за ночь';
          errorStat = true;
          break;
        }

        if (costValue < Number(inputElement.min) || costValue > Number(inputElement.max)) {
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

          var minPriceText = 'Цена за ночь в' + typeChanged + ' не может быть меньше ' + inputElement.min + ' руб';
          var maxPriceText = 'Цена за ночь в' + typeChanged + ' не может быть больше ' + inputElement.max + ' руб';

          messageError = costValue < Number(inputElement.min) ? minPriceText : maxPriceText;
          errorStat = true;
        }
        break;
    }

    if (errorStat) {
      addErrorClassElement('[name="' + type + '"]', messageError, errorShowStat);
      return false;
    }

    removeErrorElement('[name="' + type + '"]');
    return true;
  };

  var onHideSuccessClick = function (evt) {
    var targetElement = evt.target;
    var targetElementClassList = targetElement.classList;
    var targetElementClassListValue = targetElementClassList.value;

    if (targetElementClassListValue === 'success') {
      hideSuccess();
    }
  };

  var onHideSuccessKeydown = function (evt) {
    var key = evt.key;

    if (key === ESC_KEY) {
      hideSuccess();
    }
  };

  var hideSuccess = function () {
    var successElement = document.querySelector('.success');

    successElement.removeEventListener('click', onHideSuccessClick);
    document.removeEventListener('keydown', onHideSuccessKeydown);

    successElement.remove();
  };

  var onSendForm = function (evt) {
    evt.preventDefault();

    var validateFormStat = true;

    INPUTS_FORM_NAME
      .filter(function (inputName) {
        return !validateForm(inputName, true);
      })
      .forEach(function () {
        validateFormStat = false;
      });

    if (validateFormStat) {
      var onSuccess = function () {
        var successElement = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
        var successMessageElement = successElement.querySelector('.success__message');

        var successTextHTML = 'Ваше объявление<br>успешно размещено!';

        successMessageElement.innerHTML = successTextHTML;

        successElement.addEventListener('click', onHideSuccessClick);
        document.addEventListener('keydown', onHideSuccessKeydown);

        mainElement.appendChild(successElement);

        disableForm();
      };

      window.backend.save(onSuccess, window.backend.API_URL.save, new FormData(formElement));
    }
  };

  var disableElements = function (selector, stat) {
    var inputElements = Array.from(document.querySelectorAll(selector));

    inputElements
      .filter(function (element) {
        return element !== mapPinMainElement;
      })
      .forEach(function (element) {
        element.disabled = stat;
      });
  };

  var disableInputForm = function () {
    DISABLE_ELEMENT_TAGS.forEach(function (disableElement) {
      disableElements(disableElement, true);
    });
  };

  disableInputForm();

  var disableForm = function () {
    formElementClassList.add('ad-form--disabled');
    mapElementClassList.add('map--faded');

    disableInputForm();

    var mapPins = Array.from(document.querySelectorAll('.map__pin'));

    mapPins
      .filter(function (pin) {
        return pin !== mapPinMainElement;
      })
      .forEach(function (pin) {
        pin.remove();
      });

    var inputElementsRemove = Array.from(document.querySelectorAll('input'));

    inputElementsRemove.forEach(function (input) {
      var inputParent = input.parentNode;
      var inputParentClassList = inputParent.classList;

      var infoError = inputParent.querySelector('.info--error');

      if (input.type === 'checkbox') {
        input.checked = false;
      } else {
        input.value = '';
      }

      if (inputParentClassList.contains('error--send')) {
        inputParentClassList.remove('error--send');
        infoError.remove();
      }
    });

    var textareaElementsRemove = Array.from(document.querySelectorAll('textarea'));

    textareaElementsRemove.forEach(function (textarea) {
      textarea.value = '';
    });

    mapPinMainElement.style.top = defaultPinCoordinates.top;
    mapPinMainElement.style.left = defaultPinCoordinates.left;

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

    housingType.value = 'any';
    housingPrice.value = 'any';
    housingGuests.value = 'any';
    housingRooms.value = 'any';


    formAvaUser.src = 'img/muffin-grey.svg';
    var photoContainerImg = formElement.querySelector('.ad-form__photo-container img');

    if (photoContainerImg) {
      photoContainerImg.remove();
    }

    formRoomsSelect.removeEventListener('input', onInputCapacity);
    formTypeSelect.removeEventListener('input', onInputTypeChanged);
    formTimeInSelect.removeEventListener('input', onInputTimeIn);
    formTimeOutSelect.removeEventListener('input', onInputTimeOut);

    sendFormButton.removeEventListener('click', onSendForm);
    restetFormButton.removeEventListener('click', onResetForm);

    housingType.removeEventListener('input', onUpdateFilter);
    housingPrice.removeEventListener('input', onUpdateFilter);
    housingGuests.removeEventListener('input', onUpdateFilter);
    housingRooms.removeEventListener('input', onUpdateFilter);

    var featureFilters = document.querySelectorAll('input.map__checkbox');

    featureFilters.forEach(function (feature) {
      feature.removeEventListener('change', onUpdateFilter);
    });
  };

  var onResetForm = function () {
    disableForm();
  };

  var onUpdateFilter = function () {
    window.filter.update();
  };

  var activateForm = function () {
    if (!formElementClassList.contains('ad-form--disabled')) {
      return;
    }

    window.filter.update();
    housingType.addEventListener('input', onUpdateFilter);
    housingPrice.addEventListener('input', onUpdateFilter);
    housingGuests.addEventListener('input', onUpdateFilter);
    housingRooms.addEventListener('input', onUpdateFilter);

    var featureFilterArray = document.querySelectorAll('input.map__checkbox');

    featureFilterArray.forEach(function (feature) {
      feature.addEventListener('change', onUpdateFilter);
    });

    mapElement.classList.remove('map--faded');
    formElementClassList.remove('ad-form--disabled');

    var inputElements = Array.from(document.querySelectorAll('input'));

    inputElements
      .filter(function (input) {
        return INPUTS_FORM_NAME.indexOf(input.name) !== -1;
      })
      .forEach(function (input) {
        input.addEventListener('input', onInputForm);
        input.addEventListener('blur', onBlurForm);
        input.addEventListener('focus', onFocusForm);
      });

    DISABLE_ELEMENT_TAGS.forEach(function (elementTag) {
      disableElements(elementTag, false);
    });

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

  var optionCapacityArray = Array.from(formCapacitySelect.querySelectorAll('option'));

  optionCapacityArray
    .filter(function (option) {
      return option.value !== formRoomsSelect.value;
    })
    .forEach(function (option) {
      option.disabled = true;
      option.selected = false;
    });

  formPriceInput.min = MIN_PRICE_FLAT;
  formPriceInput.placeholder = MIN_PRICE_FLAT;

  var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
  var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT / 2;

  formAddressInput.value = locationX + ', ' + locationY;

  window.form = {
    activate: activateForm,
  };
})();
