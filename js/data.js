'use strict';

(function () {
  var onSuccess = function (advertisements) {
    window.data = advertisements;
  };

  window.backend.load(onSuccess, window.backend.errorXhr, window.backend.API_URL.data);
})();
