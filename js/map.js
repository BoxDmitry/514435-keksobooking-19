'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON_MOUSE_KEY = 0;

  var onActivatedForm = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
      window.form();
    }
  };

  mapPinMainElement.addEventListener('mousedown', onActivatedForm);

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      window.form();
    }
  });

  window.map = {
    pinMainElement: mapPinMainElement,
    element: mapElement
  }
})();
