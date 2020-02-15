'use strict';

(function () {
  var successHandler = function (advertisements) {
    window.data = advertisements;
  };

  var errorHandler = function (errorMessage) {
    var errorElement = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

    errorElement.querySelector('.error__message').textContent = 'Не удалось загрузить похожие обьявления';

    document.querySelector('main').appendChild(errorElement);
  };

  var actualAdvertisements = window.backend.load(successHandler, errorHandler, 'https://js.dump.academy/keksobooking/data');
})();
