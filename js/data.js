'use strict';

(function () {
  var advertisementsQuantity = 8;

  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];

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
