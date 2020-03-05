'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooser = document.querySelector('.ad-form__field input[type=file]');
  var preview = document.querySelector('.ad-form-header__preview img');

  var headerUploadElement = document.querySelector('.ad-form-header__upload');
  var headerUploadElementClassList = headerUploadElement.classList;

  var fileElement = document.querySelector('.ad-form__field');

  var onHiddenError = function (evt) {
    evt.target.removeEventListener('click', onHiddenError);
    evt.target.remove();
  };

  var checkFile = function (file) {
    if (!file) {
      return false;
    }

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    return matches;
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];

    var filedInfoError = fileElement.querySelector('.info--error');

    if (!checkFile(file)) {
      var errorPreviewImgSrc = 'img/muffin-white.svg';

      headerUploadElementClassList.add('error--load');
      preview.src = errorPreviewImgSrc;

      var messageErrorElement = document.createElement('span');
      messageErrorElement.classList.add('info--error');
      messageErrorElement.textContent = 'Не допустимый формат файла';
      fileElement.appendChild(messageErrorElement);
      document.querySelector('.info--error').addEventListener('click', onHiddenError);

      return;
    }

    if (headerUploadElementClassList.contains('error--load')) {
      var successPreviewImgSrc = 'img/muffin-grey.svg';

      headerUploadElementClassList.remove('error--load');
      preview.src = successPreviewImgSrc;

      if (filedInfoError) {
        filedInfoError.removeEventListener('click', onHiddenError);
        filedInfoError.remove();
      }
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var urlImage = reader.result;
      preview.src = urlImage;
    });

    reader.readAsDataURL(file);
  });

  var filePhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoContainerClassList = photoContainer.classList;

  var uploadElement = document.querySelector('.ad-form__upload');

  filePhoto.addEventListener('change', function () {
    var file = filePhoto.files[0];

    var previewPhotoImg = previewPhoto.querySelector('img');
    var uploadInfoError = uploadElement.querySelector('.info--error');

    if (!checkFile(file)) {
      photoContainerClassList.add('error--load');

      var messageErrorElement = document.createElement('span');
      messageErrorElement.classList.add('info--error');
      messageErrorElement.textContent = 'Не допустимый формат файла';
      document.querySelector('.ad-form__upload').appendChild(messageErrorElement);
      document.querySelector('.info--error').addEventListener('click', onHiddenError);

      if (previewPhotoImg) {
        previewPhotoImg.remove();
      }

      return;
    }

    if (photoContainerClassList.contains('error--load')) {
      photoContainerClassList.remove('error--load');

      if (uploadInfoError) {
        uploadInfoError.removeEventListener('click', onHiddenError);
        uploadInfoError.remove();
      }
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var urlImage = reader.result;
      if (previewPhotoImg) {
        previewPhoto.src = urlImage;
      } else {
        var img = document.createElement('img');
        img.src = urlImage;
        img.style.maxWidth = '70px';
        img.style.maxHeight = '70px';
        previewPhoto.appendChild(urlImage);
      }
    });

    reader.readAsDataURL(file);
  });
})();
