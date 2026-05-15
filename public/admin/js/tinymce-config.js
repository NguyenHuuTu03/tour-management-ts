tinymce.init({
  selector: '[textarea-mce]',
  license_key: 'gpl',
  plugins: "image",
  toolbar: "undo redo | bold italic | image",
  images_upload_url: '/admin/uploads'
});