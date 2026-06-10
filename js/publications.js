(function () {
  "use strict";

  var list = document.getElementById("publications-list");

  if (!list) {
    return;
  }

  var orcid = list.dataset.orcid;
  var apiRoot = "https://pub.orcid.org/v3.0/" + encodeURIComponent(orcid);
  var requestOptions = { headers: { Accept: "application/json" } };

  function appendText(element, text) {
    element.appendChild(document.createTextNode(text));
  }

  function valueAt(object, keys) {
    return keys.reduce(function (value, key) {
      return value && value[key] !== undefined ? value[key] : null;
    }, object);
  }

  function publicationYear(item) {
    return valueAt(item, ["publication-date", "year", "value"]) || "";
  }

  function publicationDate(item) {
    var year = publicationYear(item);
    var month = valueAt(item, ["publication-date", "month", "value"]) || "01";
    var day = valueAt(item, ["publication-date", "day", "value"]) || "01";
    return year + "-" + month.padStart(2, "0") + "-" + day.padStart(2, "0");
  }

  function externalId(item, type) {
    var ids = valueAt(item, ["external-ids", "external-id"]) || [];
    var match = ids.find(function (id) {
      return id["external-id-type"] === type;
    });
    return match ? match["external-id-value"] : "";
  }

  function publicationUrl(item) {
    var doi = externalId(item, "doi");
    return valueAt(item, ["url", "value"]) || (doi ? "https://doi.org/" + doi : "https://orcid.org/" + orcid);
  }

  function appendAuthors(container, contributors) {
    var authors = (contributors || []).filter(function (contributor) {
      return !contributor["contributor-attributes"] ||
        contributor["contributor-attributes"]["contributor-role"] === "author";
    });

    authors.forEach(function (contributor, index) {
      var name = valueAt(contributor, ["credit-name", "value"]) || "";
      var contributorOrcid = valueAt(contributor, ["contributor-orcid", "path"]);
      var isAlice = contributorOrcid === orcid || name.toLowerCase() === "alice rosen";
      var nameElement = isAlice ? document.createElement("a") : document.createElement("span");

      if (isAlice) {
        nameElement.className = "publication__author--self";
        nameElement.href = "https://orcid.org/" + orcid;
        nameElement.target = "_blank";
        nameElement.rel = "noopener";
      }

      appendText(nameElement, name);
      container.appendChild(nameElement);

      if (index < authors.length - 1) {
        appendText(container, ", ");
      }
    });
  }

  function renderPublication(item) {
    var article = document.createElement("article");
    var year = document.createElement("div");
    var body = document.createElement("div");
    var title = document.createElement("h3");
    var link = document.createElement("a");
    var authors = document.createElement("p");
    var venue = document.createElement("p");
    var titleText = valueAt(item, ["title", "title", "value"]) || "Untitled publication";
    var venueText = valueAt(item, ["journal-title", "value"]) ||
      (item.type === "preprint" ? "Preprint" : "Publication");
    var doi = externalId(item, "doi");

    article.className = "publication";
    year.className = "publication__year";
    body.className = "publication__body";
    title.className = "publication__title";
    authors.className = "publication__authors";
    venue.className = "publication__venue";

    appendText(year, publicationYear(item));
    link.href = publicationUrl(item);
    link.target = "_blank";
    link.rel = "noopener";
    appendText(link, titleText);
    title.appendChild(link);
    appendAuthors(authors, valueAt(item, ["contributors", "contributor"]));
    appendText(venue, venueText + (doi ? " · " + doi : ""));

    body.appendChild(title);
    if (authors.textContent) {
      body.appendChild(authors);
    }
    body.appendChild(venue);
    article.appendChild(year);
    article.appendChild(body);

    return article;
  }

  function fetchJson(url) {
    return fetch(url, requestOptions).then(function (response) {
      if (!response.ok) {
        throw new Error("ORCID request failed");
      }
      return response.json();
    });
  }

  fetchJson(apiRoot + "/works")
    .then(function (data) {
      var groups = data.group || [];
      return Promise.all(groups.map(function (group) {
        var summary = group["work-summary"] && group["work-summary"][0];
        return summary ? fetchJson(apiRoot + "/work/" + summary["put-code"]) : null;
      }));
    })
    .then(function (items) {
      items = items.filter(Boolean).sort(function (a, b) {
        return publicationDate(b).localeCompare(publicationDate(a));
      });
      list.textContent = "";

      if (!items.length) {
        throw new Error("No publications found");
      }

      items.forEach(function (item) {
        list.appendChild(renderPublication(item));
      });
    })
    .catch(function () {
      list.innerHTML = "";
      var status = document.createElement("p");
      var link = document.createElement("a");
      status.className = "publications__status";
      appendText(status, "Publications could not be loaded just now. ");
      link.href = "https://orcid.org/" + orcid;
      link.target = "_blank";
      link.rel = "noopener";
      appendText(link, "View them on ORCID.");
      status.appendChild(link);
      list.appendChild(status);
    });
}());
