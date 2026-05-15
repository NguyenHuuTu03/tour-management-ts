// PREVIEW NHIỀU ẢNH
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");

if (imageInput && preview) {
  imageInput.addEventListener("change", function (e) {

    // xoá preview cũ
    preview.innerHTML = "";

    const files = e.target.files;

    if (files.length > 0) {

      Array.from(files).forEach(file => {

        // kiểm tra file ảnh
        if (file.type.startsWith("image/")) {

          const img = document.createElement("img");

          img.src = URL.createObjectURL(file);

          img.style.width = "120px";
          img.style.height = "90px";
          img.style.objectFit = "cover";
          img.style.borderRadius = "8px";
          img.style.marginRight = "10px";

          preview.appendChild(img);
        }

      });

    }

  });
}