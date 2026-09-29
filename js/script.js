
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navbar = document.querySelector('.navbar');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('mobile-menu-active');
    });
  }

  // Cost Calculator Logic
  const plotSizeSelect = document.getElementById('calc-plot-size');
  const packageTypeSelect = document.getElementById('calc-package');
  const floorsSelect = document.getElementById('calc-floors');
  const resultValue = document.getElementById('calc-total-cost');
  const resultBreakdown = document.getElementById('calc-breakdown');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');

  function calculateCost() {
    if (!plotSizeSelect || !packageTypeSelect || !floorsSelect || !resultValue) return;

    const sqYards = parseFloat(plotSizeSelect.value) || 120;
    const packageType = packageTypeSelect.value;
    const floors = parseInt(floorsSelect.value) || 2;

    const coveredAreaPerFloor = sqYards * 9 * 0.75;
    const totalCoveredArea = Math.round(coveredAreaPerFloor * floors);

    let ratePerSqFt = 2500;
    let packageName = "Complete Grey Structure";

    if (packageType === 'labour') {
      ratePerSqFt = 450;
      packageName = "Labour Only (Chunai, Plaster, Tile, Marble)";
    } else if (packageType === 'grey') {
      ratePerSqFt = 2500;
      packageName = "Complete Grey Structure";
    } else if (packageType === 'standard_turnkey') {
      ratePerSqFt = 4800;
      packageName = "Complete Turnkey Villa";
    } else if (packageType === 'premium_turnkey') {
      ratePerSqFt = 6800;
      packageName = "Luxury Executive Turnkey";
    }

    const totalEst = Math.round(totalCoveredArea * ratePerSqFt);
    const formattedTotal = new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(totalEst).replace('PKR', 'Rs. ');

    resultValue.innerText = formattedTotal;
    resultBreakdown.innerHTML = `
      <strong>Covered Area:</strong> ~${totalCoveredArea.toLocaleString()} Sq. Ft. (${floors} Floors on ${sqYards} Gaz)<br>
      <strong>Rate Tier:</strong> ${packageName} @ Rs. ${ratePerSqFt.toLocaleString()} / Sq. Ft.
    `;

    if (whatsappQuoteBtn) {
      const msg = encodeURIComponent(
        `Assalam-o-Alaikum Zubair Construction Contractor,

I calculated an estimate on your website:
- Plot Size: ${sqYards} Sq. Yards
- Floors: ${floors}
- Covered Area: ~${totalCoveredArea} sq.ft
- Package: ${packageName}
- Estimated Cost: ${formattedTotal}

Please share detailed BOQ.`
      );
      whatsappQuoteBtn.href = `https://wa.me/923079671247?text=${msg}`;
    }
  }

  if (plotSizeSelect && packageTypeSelect && floorsSelect) {
    plotSizeSelect.addEventListener('change', calculateCost);
    packageTypeSelect.addEventListener('change', calculateCost);
    floorsSelect.addEventListener('change', calculateCost);
    calculateCost();
  }

  // Lightbox Modal for Challenges
  const lightbox = document.getElementById('challenge-lightbox');
  const lightboxImg = document.getElementById('lightbox-target-img');
  const lightboxTitle = document.getElementById('lightbox-target-title');
  const lightboxWhatsApp = document.getElementById('lightbox-whatsapp-link');
  const lightboxClose = document.querySelector('.lightbox-close');

  document.querySelectorAll('.challenge-card').forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      if (lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        if (lightboxTitle) lightboxTitle.innerText = title;
        if (lightboxWhatsApp) {
          lightboxWhatsApp.href = `https://wa.me/923079671247?text=${encodeURIComponent('Inquiry regarding: ' + title)}`;
        }
        lightbox.style.display = 'flex';
      }
    });
  });

  if (lightboxClose && lightbox) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.style.display = 'none';
    });
  }

  // Contact Form
  const contactForm = document.getElementById('lead-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name').value;
      const phone = document.getElementById('form-phone').value;
      const location = document.getElementById('form-location').value;
      const service = document.getElementById('form-service').value;
      const message = document.getElementById('form-message').value;

      const text = encodeURIComponent(
        `Assalam-o-Alaikum Zubair Construction,
New Website Inquiry:
- Name: ${name}
- Phone: ${phone}
- Location: ${location}
- Service: ${service}
- Scope: ${message}`
      );

      window.open(`https://wa.me/923079671247?text=${text}`, '_blank');
      contactForm.reset();
    });
  }
});
