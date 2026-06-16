(function () {
  "use strict";

  var citations = document.querySelectorAll("[data-project-citation]");
  var attributions = document.querySelectorAll("[data-project-attribution]");
  var requests = {};

  if (!citations.length && !attributions.length) {
    return;
  }

  function text(element, value) {
    element.appendChild(document.createTextNode(value));
  }

  function yearFor(message) {
    var date = message.published || message.issued || message.created;
    return date && date["date-parts"] && date["date-parts"][0]
      ? date["date-parts"][0][0]
      : "";
  }

  function firstAuthor(message) {
    var author = message.author && message.author[0];

    if (!author) {
      return "Unknown author";
    }

    return author.family || author.name || [author.given, author.family].filter(Boolean).join(" ");
  }

  function renderCitation(container, message, doi) {
    var author = firstAuthor(message);
    var authorCount = message.author ? message.author.length : 0;
    var year = yearFor(message);
    var title = message.title && message.title[0] ? message.title[0] : "Untitled article";
    var journal = message["container-title"] && message["container-title"][0]
      ? message["container-title"][0]
      : "";
    var link = document.createElement("a");

    container.textContent = "";
    text(container, author + (authorCount > 1 ? " et al." : "") + (year ? " (" + year + "). " : ". "));
    text(container, title + (title.endsWith(".") ? " " : ". "));
    if (journal) {
      var journalElement = document.createElement("em");
      text(journalElement, journal);
      container.appendChild(journalElement);
      text(container, ". ");
    }

    link.href = "https://doi.org/" + doi;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    text(link, doi);
    container.appendChild(link);
  }

  function renderAttribution(container, message, doi) {
    var authorCount = message.author ? message.author.length : 0;
    var author = container.dataset.authors || firstAuthor(message) + (authorCount > 1 ? " et al." : "");
    var year = container.dataset.year || yearFor(message);
    var journal = container.dataset.journal || (message["container-title"] && message["container-title"][0]
      ? message["container-title"][0]
      : "");
    var license = container.dataset.license || "Creative Commons";
    var creator = container.dataset.creator || "Alice Rosen";
    var link = document.createElement("a");

    container.textContent = "";
    text(container, "Figure reproduced from " + author + (year ? " " + year : ""));
    if (journal) {
      text(container, ", ");
      var journalElement = document.createElement("em");
      text(journalElement, journal);
      container.appendChild(journalElement);
    }
    text(container, ", under a " + license + " licence. Figure created by " + creator + ". ");

    link.href = "https://doi.org/" + doi;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    text(link, doi);
    container.appendChild(link);
    text(container, ".");
  }

  function normalizeDoi(value) {
    return value.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
  }

  function fetchWork(doi) {
    var url = "https://api.crossref.org/works/" + encodeURIComponent(doi);

    if (!requests[doi]) {
      requests[doi] = fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Crossref request failed");
        }
        return response.json();
      })
      .then(function (data) {
        return data.message;
      });
    }

    return requests[doi];
  }

  citations.forEach(function (container) {
    var doi = normalizeDoi(container.dataset.doi);

    fetchWork(doi)
      .then(function (message) {
        renderCitation(container, message, doi);
      })
      .catch(function () {
        // The DOI link already in the page remains usable when metadata is unavailable.
      });
  });

  attributions.forEach(function (container) {
    var doi = normalizeDoi(container.dataset.doi);

    fetchWork(doi)
      .then(function (message) {
        renderAttribution(container, message, doi);
      })
      .catch(function () {
        // The DOI link already in the page remains usable when metadata is unavailable.
      });
  });
}());
