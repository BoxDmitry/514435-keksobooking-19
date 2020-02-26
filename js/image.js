'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');

  var onHiddenError = function (evt) {
    evt.target.removeEventListener('click', onHiddenError);
    evt.target.remove();
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    if (!file) {
      return;
    }

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (document.querySelector('.ad-form-header__upload').classList.contains('error--load')) {
      document.querySelector('.ad-form-header__upload').classList.remove('error--load');
      preview.src = 'img/muffin-grey.svg';

      if (document.querySelector('.ad-form__field .info--error')) {
        document.querySelector('.ad-form__field .info--error').removeEventListener('click', onHiddenError);
        document.querySelector('.ad-form__field .info--error').remove();
      }
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var url = reader.result;
        preview.src = url;

        window.avatar = {
          url: url
        };
      });

      reader.readAsDataURL(file);

      return;
    }

    document.querySelector('.ad-form-header__upload').classList.add('error--load');
    preview.src = 'img/muffin-white.svg';
    var messageErrorElement = document.createElement('span');
    messageErrorElement.classList.add('info--error');
    messageErrorElement.textContent = 'Не допустимый формат файла';
    document.querySelector('.ad-form__field').appendChild(messageErrorElement);
    document.querySelector('.info--error').addEventListener('click', onHiddenError);
  });

  var filePhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  filePhoto.addEventListener('change', function () {
    var file = filePhoto.files[0];

    if (!file) {
      return;
    }

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (document.querySelector('.ad-form__photo-container').classList.contains('error--load')) {
      document.querySelector('.ad-form__photo-container').classList.remove('error--load');

      if (document.querySelector('.ad-form__upload .info--error')) {
        document.querySelector('.ad-form__upload .info--error').removeEventListener('click', onHiddenError);
        document.querySelector('.ad-form__upload .info--error').remove();
      }
    }

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var url = reader.result;
        if (previewPhoto.querySelector('img')) {
          previewPhoto.src = url;
        } else {
          var img = document.createElement('img');
          img.src = url;
          img.style.maxWidth = '70px';
          img.style.maxHeight = '70px';
          previewPhoto.appendChild(img);
        }
      });

      reader.readAsDataURL(file);

      return;
    }

    document.querySelector('.ad-form__photo-container').classList.add('error--load');
    var messageErrorElement = document.createElement('span');
    messageErrorElement.classList.add('info--error');
    messageErrorElement.textContent = 'Не допустимый формат файла';
    document.querySelector('.ad-form__upload').appendChild(messageErrorElement);
    document.querySelector('.info--error').addEventListener('click', onHiddenError);
  });
})();
