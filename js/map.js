'use strict';

(function () {
  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var ENTER_KEY = window.constants.enterKey;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftBittonMouseKey;

  var onActivatedForm = function (evt) {
    if (evt.button === LEFT_BUTTON_MOUSE_KEY) {
      window.form.activate();
    }
  };

  mapPinMainElement.addEventListener('mousedown', onActivatedForm);

  mapPinMainElement.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      window.form.activate();
    }
  });

  window.map = {
    pinMainElement: mapPinMainElement,
    element: mapElement
  };
})();
