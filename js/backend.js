'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var API_URL = {
    data: 'https://js.dump.academy/keksobooking/data',
    save: 'https://js.dump.academy/keksobooking/'
  };

  var onErrorExprot = function (textMessage, sendRequest) {
    var onRepeatRequestKey = function (evt) {
      if (evt.key === window.constants.enterKey) {
        repeatRequest();
      }
    };

    var onRepeatRequestEscKey = function (evt) {
      if (evt.key === window.constants.escKey) {
        repeatRequest();
      }
    };

    var onRepeatRequest = function () {
      repeatRequest();
    };

    var onRepeatRequestClick = function (evt) {
      if (evt.target.classList.value === 'error') {
        repeatRequest();
      }
    };

    if (!document.querySelector('.error')) {
      var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

      errorElement.querySelector('.error__message').textContent = textMessage;

      document.querySelector('main').appendChild(errorElement);
    }

    var repeatRequest = function () {
      if (document.querySelector('.error')) {
        document.querySelector('.error__button').removeEventListener('click', onRepeatRequest);
        document.querySelector('.error__button').removeEventListener('keydown', onRepeatRequestKey);
        document.querySelector('.error').removeEventListener('click', onRepeatRequestClick);
        document.removeEventListener('keydown', onRepeatRequestEscKey);
        document.querySelector('.error').remove();
      }
      sendRequest();
    };

    document.querySelector('.error__button').addEventListener('click', onRepeatRequest);
    document.querySelector('.error__button').addEventListener('keydown', onRepeatRequestKey);
    document.querySelector('.error').addEventListener('click', onRepeatRequestClick);
    document.addEventListener('keydown', onRepeatRequestEscKey);
  };

  var getXhr = function (dataType, onLoad, onError, URL, DATA, metod, sendRequest) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = dataType;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText, sendRequest);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения', sendRequest);
    });

    xhr.open(metod, URL);
    xhr.send(DATA);
  };

  var save = function (onLoad, onError, URL, DATA, sendRequest) {
    getXhr('', onLoad, onError, URL, DATA, 'POST', sendRequest);
  };

  var load = function (onLoad, onError, URL, sendRequest) {
    getXhr('json', onLoad, onError, URL, '', 'GET', sendRequest);
  };

  window.backend = {
    load: load,
    save: save,
    errorXhr: onErrorExprot,
    API_URL: API_URL
  };
})();
