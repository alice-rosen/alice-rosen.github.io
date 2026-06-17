---
title: Modelling forest demography using repeat lidar
subtitle: Research
summary: "The first publication from my PhD: combining repeat airborne lidar with a structured demographic model to estimate survival, growth and life expectancy for ~40,000 eucalypt trees."
tools: R, QGIS, Affinity Designer
date: 2026-04-11
article:
  doi: 10.1002/rse2.70050
  authors: Rosen et al.
  year: 2026
  journal: Remote Sensing in Ecology and Conservation
  title: "Modelling forest dynamics using integral projection models and repeat lidar"
image: '/images/ipm_pipeline_figure.jpeg'
---

## Project overview

We explored how repeat airborne lidar can be used to model forest change at large spatial scales. Using Australia’s Great Western Woodlands as a case study, we tested whether lidar-derived measurements of individual tree size could support stage-structured demographic modelling. We used an integral projection model to estimate survival, growth and life expectancy for approximately 40,000 eucalypt trees observed over a decade.

<figure class="project-figure">

<img src="/images/ipm_pipeline_figure.jpeg" alt="Workflow diagram showing how repeat airborne lidar data are used in an integral projection model to estimate forest demographic rates"/>

<figcaption class="project-comparison__caption">

<p class="project-comparison__caption-title">

A remote-sensing workflow for modelling forest demography.

</p>

<p class="project-comparison__caption-text">

Repeat airborne lidar observations were used to track individual tree size over time, estimate survival and growth, and project forest dynamics with an integral projection model.

</p>

{% include project-attribution.html license="Creative Commons Attribution 4.0 International" %}

</figcaption>

</figure>

## Approach

We modelled tree vital rates using height for smaller trees and crown area for larger trees, reflecting a shift in growth strategy as trees increase in size. We then examined how survival and growth varied with local canopy density, as a proxy for competition, and topographic wetness index, as a proxy for soil water and nutrient availability.

<figure class="project-figure">

<img src="/images/ipm_structure_figure.jpeg" alt="Diagram showing the two-part integral projection model structure using height and crown area transitions"/>

<figcaption class="project-comparison__caption">

<p class="project-comparison__caption-title">

A two-part integral projection model for lidar-derived tree size.

</p>

<p class="project-comparison__caption-text">

The model separates smaller and larger trees using a height cut-off, then represents transitions among height and crown-area states, including growth, dieback, mortality and shifts between size classes.

</p>

{% include project-attribution.html license="Creative Commons Attribution 4.0 International" %}

</figcaption>

</figure>

## Findings

We found that small and large trees responded differently to competition and moisture gradients. Drier conditions were associated with lower life expectancy, particularly for larger trees, suggesting that mature trees may be especially vulnerable to drought stress.

## Why It Matters

This project shows how repeat lidar can extend demographic modelling beyond field plots, allowing tree growth, survival and life expectancy to be estimated across much larger landscapes.
