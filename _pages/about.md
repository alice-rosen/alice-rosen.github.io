---
layout: page
title: About
permalink: /about/
hide_title: true
# Add affiliation logos to the images folder, then list them here:
# affiliations:
#   - name: Institution name
#     logo: /images/institution-logo.png
#     url: https://example.org/
affiliations:
- name: University of Oxford
  logo: /images/oxford_university_biology_logo.jpeg
  url: https://www.biology.ox.ac.uk/people/alice-rosen
- name: SalGo Team
  logo: /images/salgo_team_logo.jpeg
- name: Selva Lab
  logo: /images/selva_lab_logo.jpeg
- name: Forest Research
  logo: /images/forest_research_logo.jpeg
---

<div class="about-intro">
  <section class="about-profile">
    <div class="about-profile__portrait">
      <img src="{{ '/images/alice_rosen_photo.jpeg' | relative_url }}" alt="Portrait of Alice Rosen">
    </div>
    <div class="about-profile__details">
      <h2 class="about-profile__name">Alice Rosen</h2>
      <p class="about-profile__pronouns">she/her</p>
      <p class="about-profile__role">PhD student</p>
      <p class="about-profile__email">alice[at]rosen.org.uk</p>
      <p class="about-profile__email">alice.rosen[at]biology.ox.ac.uk</p>
    </div>
  </section>

  <section class="about-bio">
    <h2>About me</h2>
    <p>Add a description about yourself here.</p>
  </section>
</div>

{% if page.affiliations.size > 0 %}
<section class="about-affiliations">
  <h2>Affiliations</h2>
  <div class="about-affiliations__grid">
    {% for affiliation in page.affiliations %}
    {% if affiliation.url %}<a class="about-affiliation" href="{{ affiliation.url }}" target="_blank" rel="noopener noreferrer">{% else %}<div class="about-affiliation">{% endif %}
      <img src="{{ affiliation.logo | relative_url }}" alt="{{ affiliation.name }} logo">
    {% if affiliation.url %}</a>{% else %}</div>{% endif %}
    {% endfor %}
  </div>
</section>
{% endif %}
