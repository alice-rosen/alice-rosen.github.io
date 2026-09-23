(function () {
  "use strict";

  var dialog = document.getElementById("poster-lightbox");

  if (!dialog || typeof dialog.showModal !== "function") {
    return;
  }

  var image = dialog.querySelector(".poster-lightbox__image");
  var title = dialog.querySelector("#poster-lightbox-title");
  var meta = dialog.querySelector(".poster-lightbox__meta");
  var close = dialog.querySelector(".poster-lightbox__close");
  var links = document.querySelectorAll("[data-poster-lightbox]");

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var card = link.closest(".conference-poster");
      var thumbnail = link.querySelector("img");

      event.preventDefault();
      image.src = link.href;
      image.alt = thumbnail ? thumbnail.alt : "";
      title.textContent = card.querySelector(".conference-poster__title").textContent;
      meta.textContent = card.querySelector(".conference-poster__meta").textContent;
      dialog.showModal();
    });
  });

  close.addEventListener("click", function () {
    dialog.close();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && dialog.open) {
      dialog.close();
    }
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener("close", function () {
    image.removeAttribute("src");
  });
}());
