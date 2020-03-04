'use strict';

(function () {
  var StatusCode = {
    OK: 200,
  };

  var API_URL = {
    data: 'https://js.dump.academy/keksobooking/data',
    save: 'https://js.dump.academy/keksobooking/',
  };

  var responseType = {
    JSON: 'json',
    TEXT: 'text',
  };

   var onRepeatRequestKey = function (evt) {
    var keyButton = evt.key;

    if (keyButton === window.constants.enterKey) {
      repeatRequest();
    }
  };

  var onRepeatRequestEscKey = function (evt) {
    var keyButton = evt.key;

    if (keyButton === window.constants.escKey) {
      repeatRequest();
    }
  };

  var onRepeatRequest = function () {
    repeatRequest();
  };

  var onRepeatRequestClick = function (evt) {
    var clickElement = evt.target;

    if (clickElement.classList.value === 'error') {
      repeatRequest();
    }
  };

  var repeatRequest = function () {
    buttonError.removeEventListener('click', onRepeatRequest);
    buttonError.removeEventListener('keydown', onRepeatRequestKey);
    errorWindow.removeEventListener('click', onRepeatRequestClick);
    document.removeEventListener('keydown', onRepeatRequestEscKey);
    errorWindow.remove();
  };

  var onError = function (message) {
    var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

    errorElement.querySelector('.error__message').textContent = message;
    document.querySelector('main').appendChild(errorElement);

    var errorWindow = document.querySelector('.error');
    var buttonError = errorWindow.querySelector('.error__button');

    buttonError.addEventListener('click', onRepeatRequest);
    buttonError.addEventListener('keydown', onRepeatRequestKey);
    errorWindow.addEventListener('click', onRepeatRequestClick);
    document.addEventListener('keydown', onRepeatRequestEscKey);
  };

  var getXhr = function (dataType, onLoad, onError, URL, DATA, metod) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = dataType;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open(metod, URL);
    xhr.send(DATA);
  };

  var save = function (onLoad, URL, DATA) {
    getXhr(responseType.TEXT, onLoad, onError, URL, DATA, 'POST');
  };

  var load = function (onLoad, URL) {
    getXhr(responseType.JSON, onLoad, onError, URL, '', 'GET');
  };

  window.backend = {
    load: load,
    save: save,
    API_URL: API_URL
  };
})();
