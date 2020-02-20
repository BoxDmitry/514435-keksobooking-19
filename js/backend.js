'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var url = {
    data: 'https://js.dump.academy/keksobooking/data',
  }

  var load = function (onLoad, onError, URL) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load,
    url: url
  };
})();
