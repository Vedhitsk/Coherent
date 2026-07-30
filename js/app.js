/**
 * Coherent Website Data Loader & Dynamic Component Renderer
 * Reads data/site-data.json to populate header, footer, and page content dynamically.
 */

document.addEventListener('DOMContentLoaded', () => {
  fetch('data/site-data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load site data (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      renderHeader(data);
      renderFooter(data);
      populatePageContent(data);
    })
    .catch(err => {
      console.error('Error initializing site data:', err);
    });
});

function renderHeader(data) {
  const headerContainer = document.getElementById('main-header');
  if (!headerContainer) return;

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  const navItemsHtml = data.navLinks.map(link => {
    const isActive = (currentPath === link.url) ? 'active' : '';
    const stylePadding = link.url !== 'contact.html' ? 'style="padding-right: 5rem;"' : '';
    return `
      <li class="nav-item">
        <a ${stylePadding} class="nav-link ${isActive}" href="${link.url}">${link.title}</a>
      </li>
    `;
  }).join('');

  headerContainer.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="logo-wrap">
        <a class="navbar-brand" href="index.html">Coherent Designers</a>
        <a class="navbar-brand" href="index.html">& Consultants</a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" style="margin-right: 8%;">
        <div class="nav-item-wrap">
          <ul class="navbar-nav mr-auto">
            ${navItemsHtml}
          </ul>
        </div>
      </div>
      <div class="navbar-logo collapse navbar-collapse" id="navbarSupportedContent">
        <a href="index.html"><img src="${data.company.logo}" alt="Company Logo" width="50" /></a>
      </div>
    </nav>
  `;
}

function renderFooter(data) {
  const footerContainer = document.getElementById('main-footer');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <section id="footer">
      <div class="footheading">
        <h2 style="font-weight: bold;">${data.company.nameLine1}</h2>
        <h2 style="font-weight: bold;">${data.company.nameLine2}</h2>
        <h2 style="font-weight: bold;">${data.company.nameLine3}</h2>
      </div>

      <div class="footabout">
        <h4>About</h4>
        <h6><a href="mission.html">Our Mission</a></h6>
      </div>

      <div class="footcontact">
        <p>${data.company.email}</p>
        <hr />
        <p>${data.company.address}</p>
        <hr />
        <p>${data.company.phone}</p>
      </div>
    </section>
  `;
}

function populatePageContent(data) {
  // Home Page
  const homeSubheading = document.querySelector('[data-site="home-subheading"]');
  if (homeSubheading) homeSubheading.textContent = data.home.subheading;

  const homeTitle = document.querySelector('[data-site="home-title"]');
  if (homeTitle) homeTitle.textContent = data.home.title;

  const homeDesc = document.querySelector('[data-site="home-description"]');
  if (homeDesc) homeDesc.textContent = data.home.description;

  // Services List (Home & Services page)
  const servicesContainer = document.getElementById('services-list');
  if (servicesContainer && data.services) {
    servicesContainer.innerHTML = data.services.map((service, idx) => `
      <div class="servicebox box${idx + 1}">
        <img src="${service.image}" alt="${service.title}" height="180px" style="border-radius: ${idx === 0 ? '16px' : '18px'}" />
        <h6>${service.title}</h6>
        <p>${service.description}</p>
      </div>
    `).join('');
  }

  // Services Page Description
  const servicesDesc = document.querySelector('[data-site="services-description"]');
  if (servicesDesc) servicesDesc.textContent = data.servicesPage.description;

  // About Page - Vision Points
  const visionContainer = document.getElementById('vision-points-list');
  if (visionContainer && data.aboutPage && data.aboutPage.visionPoints) {
    visionContainer.innerHTML = data.aboutPage.visionPoints.map(point => `
      <div class="pointswrap">
        <div class="pointlogos">
          <i class="${point.icon}"></i>
        </div>
        <div class="pointdescription">
          <h5>${point.title}</h5>
          <p>${point.description}</p>
        </div>
      </div>
    `).join('');
  }

  // About Page - Skills List
  const skillsContainer = document.getElementById('skills-list');
  if (skillsContainer && data.aboutPage && data.aboutPage.skills) {
    skillsContainer.innerHTML = data.aboutPage.skills.items.map((skillText, idx) => `
      <div class="banner3skill skill${idx + 1}">
        <span>${skillText}</span>
        <hr data-aos="fade-right" data-aos-once="true">
      </div>
    `).join('');
  }

  // Previous Work Projects
  const workContainer = document.getElementById('previous-work-list');
  if (workContainer && data.previousWork && data.previousWork.projects) {
    workContainer.innerHTML = data.previousWork.projects.map((proj, idx) => `
      <div class="work proj${idx + 1} ${idx % 2 !== 0 ? 'rev' : ''}">
        <div class="workimg">
          <img src="${proj.image}" alt="${proj.title}">
        </div>
        <div class="worktitle">
          <h4>${proj.title}</h4>
        </div>
      </div>
    `).join('');
  }

  // Mission Text
  const missionDesc = document.querySelector('[data-site="mission-text"]');
  if (missionDesc) missionDesc.textContent = data.mission.text;

  // Contact Info & Headline
  const contactHeadline = document.querySelector('[data-site="contact-headline"]');
  if (contactHeadline) contactHeadline.textContent = data.contact.headline;

  const contactSubtext = document.querySelector('[data-site="contact-subtext"]');
  if (contactSubtext) contactSubtext.textContent = data.contact.subtext;
}
