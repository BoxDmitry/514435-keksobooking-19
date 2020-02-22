'use strict';

(function () {
  var successHandler = function (advertisements) {
    window.data = advertisements;
  };

  var sendRequest = function () {
    window.backend.load(successHandler, window.backend.errorXhr, window.backend.API_URL.data, sendRequest);
  };

  sendRequest();
})();
