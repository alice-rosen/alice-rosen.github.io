(function () {
  "use strict";

  var filters = document.querySelectorAll("[data-project-filter]");
  var projects = document.querySelectorAll("[data-project-label]");
  var emptyMessage = document.querySelector(".project-filters__empty");

  if (!filters.length || !projects.length) {
    return;
  }

  function knownFilter(value) {
    return Array.prototype.some.call(filters, function (filter) {
      return filter.dataset.projectFilter === value;
    });
  }

  function applyFilter(label, updateHistory) {
    var activeLabel = knownFilter(label) ? label : "all";
    var visibleCount = 0;

    Array.prototype.forEach.call(projects, function (project) {
      var visible = activeLabel === "all" ||
        project.dataset.projectFilterGroup === activeLabel ||
        project.dataset.projectLabel === activeLabel;
      project.hidden = !visible;
      if (visible) {
        visibleCount += 1;
      }
    });

    Array.prototype.forEach.call(filters, function (filter) {
      var active = filter.dataset.projectFilter === activeLabel;
      filter.classList.toggle("is-active", active);
      if (active) {
        filter.setAttribute("aria-current", "page");
      } else {
        filter.removeAttribute("aria-current");
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount > 0;
    }

    if (updateHistory) {
      var url = new URL(window.location.href);
      if (activeLabel === "all") {
        url.searchParams.delete("label");
      } else {
        url.searchParams.set("label", activeLabel);
      }
      window.history.replaceState({}, "", url);
    }
  }

  Array.prototype.forEach.call(filters, function (filter) {
    filter.addEventListener("click", function (event) {
      event.preventDefault();
      applyFilter(filter.dataset.projectFilter, true);
    });
  });

  applyFilter(new URLSearchParams(window.location.search).get("label") || "all", false);
}());
