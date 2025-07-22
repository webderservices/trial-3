// Fade-in animation using Intersection Observer
document.addEventListener("DOMContentLoaded", () => {
  const fadeInTargets = document.querySelectorAll(
    ".hero, .about, .features, .testimonials, .services-plans, .faq, .contact-form, .team, .office-info, .cta-banner"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  fadeInTargets.forEach((el) => {
    el.classList.add("fade-in-section");
    observer.observe(el);
  });

  // Staggered fade-in for card grids
  const staggerGrids = document.querySelectorAll(".service-cards, .features-grid, .values-grid, .testimonial-cards, .team-grid");

  staggerGrids.forEach((grid) => {
    const children = Array.from(grid.children);
    children.forEach((child, i) => {
      child.style.opacity = 0;
      child.style.transform = "translateY(40px)";
      setTimeout(() => {
        child.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        child.style.opacity = 1;
        child.style.transform = "translateY(0)";
      }, 200 * i);
    });
  });
});

// User Action Tracking - Logs clicks and form submits to localStorage

function logUserAction(actionDescription) {
  let logs = JSON.parse(localStorage.getItem('userActions') || '[]');
  const timestamp = new Date().toLocaleString();
  logs.push({ action: actionDescription, time: timestamp });
  localStorage.setItem('userActions', JSON.stringify(logs));
}

// Log clicks on all buttons and links
document.querySelectorAll('button, a').forEach(el => {
  el.addEventListener('click', e => {
    const text = e.target.innerText || e.target.href || 'Unknown action';
    logUserAction(`Clicked "${text}"`);
  });
});

// Log form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', e => {
    logUserAction(`Submitted form with id="${form.id || 'no-id'}"`);
  });
});

