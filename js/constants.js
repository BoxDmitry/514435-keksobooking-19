'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var LEFT_BUTTON_MOUSE_KEY = 0;

  var MAP_WIDTH = document.querySelector('.map__pins').offsetWidth;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;

  window.constants = {
    escKey: ESC_KEY,
    enterKey: ENTER_KEY,
    leftBittonMouseKey: LEFT_BUTTON_MOUSE_KEY,
    mapWidth: MAP_WIDTH,
    mapHeightMin: MAP_HEIGHT_MIN,
    mapHeightMax: MAP_HEIGHT_MAX
  };
})();
