'use strict';

(function () {
  var ENTER_KEY = window.constants.enterKey;
  var LEFT_BUTTON_MOUSE_KEY = window.constants.leftBittonMouseKey;

  var mapElement = document.querySelector('.map');
  var mapPinMainElement = document.querySelector('.map__pin--main');

  var onActivatedForm = function (evt) {
    var button = evt.button;
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var newTop = mapPinMainElement.offsetTop - shift.y;
      var newLest = mapPinMainElement.offsetLeft - shift.x;

      if (newTop <= window.constants.mapHeightMax & newTop - shift.y >= window.constants.mapHeightMin) {
        mapPinMainElement.style.top = newTop + 'px';
      }
      if (newLest <= window.constants.mapWidth - window.pin.WIDTH / 2 & newLest >= -window.pin.WIDTH / 2) {
        mapPinMainElement.style.left = newLest + 'px';
      }

      var locationX = mapPinMainElement.offsetLeft + window.pin.WIDTH / 2;
      var locationY = mapPinMainElement.offsetTop + window.pin.HEIGHT + window.pin.HEIGHT_OFFSET;

      document.querySelector('.ad-form #address').value = locationX + ', ' + locationY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    if (button === LEFT_BUTTON_MOUSE_KEY) {
      window.form.activate();
    }
  };

  mapPinMainElement.addEventListener('mousedown', onActivatedForm);

  mapPinMainElement.addEventListener('keydown', function (evt) {
    var keyButton = evt.key;

    if (keyButton === ENTER_KEY) {
      window.form.activate();
    }
  });

  window.map = {
    pinMainElement: mapPinMainElement,
    element: mapElement,
  };
})();
