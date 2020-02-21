'use strict';

(function () {
  var successHandler = function (advertisements) {
    window.data = advertisements;
  };

  var errorHandler = function () {
    var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

    errorElement.querySelector('.error__message').textContent = 'Не удалось загрузить похожие объявления';

    document.querySelector('main').appendChild(errorElement);

    var repeatRequest = function () {
      document.querySelector('.error__button').removeEventListener('click', onRepeatRequest);
      document.querySelector('.error__button').removeEventListener('keydown', onRepeatRequestKey);
      document.querySelector('.error').remove();
      sendRequest();
    };

    var onRepeatRequestKey = function (evt) {
      if (evt.key === window.constants.enterKey) {
        repeatRequest();
      }
    };

    var onRepeatRequest = function () {
      repeatRequest();
    };

    document.querySelector('.error__button').addEventListener('click', onRepeatRequest);
    document.querySelector('.error__button').addEventListener('keydown', onRepeatRequestKey);
  };

  var sendRequest = function () {
    window.backend.load(successHandler, errorHandler, window.backend.url.data);
  };

  sendRequest();
})();
