(function () {
  "use strict";

  var citations = document.querySelectorAll("[data-project-citation]");

  if (!citations.length) {
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

  citations.forEach(function (container) {
    var doi = container.dataset.doi.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, "");
    var url = "https://api.crossref.org/works/" + encodeURIComponent(doi);

    fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Crossref request failed");
        }
        return response.json();
      })
      .then(function (data) {
        renderCitation(container, data.message, doi);
      })
      .catch(function () {
        // The DOI link already in the page remains usable when metadata is unavailable.
      });
  });
}());
