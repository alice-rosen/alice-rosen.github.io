(function () {
  "use strict";

  var comparisons = document.querySelectorAll("[data-comparison]");

  Array.prototype.forEach.call(comparisons, function (comparison) {
    var range = comparison.querySelector("[data-comparison-range]");
    var before = comparison.querySelector("[data-comparison-before]");
    var divider = comparison.querySelector("[data-comparison-divider]");

    if (!range || !before || !divider) {
      return;
    }

    range.addEventListener("input", function () {
      var position = range.value + "%";
      before.style.clipPath = "inset(0 " + (100 - range.value) + "% 0 0)";
      divider.style.left = position;
    });
  });
}());
