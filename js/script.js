/*========== menu icon navbar ==========*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*========== scroll sections active link ==========*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  /*========== sticky navbar ==========*/
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*========== remove menu icon navbar when click navbar link (scroll) ==========*/

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*========== swiper ==========*/

// var swiper = new Swiper(".mySwiper", {
//   slidesPerView: 1,
//   spaceBetween: 50,
//   loop: true,
//   grabCursor: true,
//   pagination: {
//     el: ".swiper-pagination",
//     clickable: true,
//   },
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
// });

/*========== dark light mode ==========*/
let darkModeIcon = document.querySelector("#darkMode-icon");

darkModeIcon.onclick = () => {
  darkModeIcon.classList.toggle("bx-sun");
  document.body.classList.toggle("dark-mode");
};

/*========== scroll reveal ==========*/
ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content, .heading, .contact-links", {
  origin: "top",
});
ScrollReveal().reveal(
  ".home-img img, .services-container, .projects-box,.projects-box-Timer, .certificates-grid, .contact form, .skills-box, .github-container, .github-container2, .github-box, .github-box2",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img img", { origin: "left" });
ScrollReveal().reveal(".home-content h3, .home-content p, .about-content", {
  origin: "right",
});

/* ============ form submission ============= */

var form = document.getElementById("contactForm");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for Contacting Me !!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);

/* ============ certificates ============= */

class CertificatesSection {
  constructor(containerId, modalId, certificates) {
    this.container = document.getElementById(containerId);
    this.modal = document.getElementById(modalId);
    this.modalImage = this.modal.querySelector(".modal-image");
    this.certificates = certificates;

    this.init();
  }

  init() {
    this.renderCertificates();
    this.setupModalEvents();
  }

  renderCertificates() {
    this.container.innerHTML = ""; // Clear existing content

    this.certificates.forEach((cert) => {
      const card = this.createCertificateCard(cert);
      this.container.appendChild(card);
    });
  }

  createCertificateCard(cert) {
    const card = document.createElement("div");
    card.classList.add("certificate-card");

    card.innerHTML = `
            <img src="${cert.imageUrl}" alt="${cert.title}" class="certificate-image">
            <div class="certificate-details">
                <h3 class="certificate-title">${cert.title}</h3>
                <p class="certificate-issuer">${cert.issuer}</p>
                <p class="certificate-date">${cert.date}</p>
            </div>
        `;

    card.addEventListener("click", () =>
      this.openModal(cert.imageUrl, cert.title)
    );

    return card;
  }

  openModal(imageUrl, altText) {
    // Check if screen width is greater than 768px before opening the modal
    if (window.innerWidth > 768) {
      this.modalImage.src = imageUrl;
      this.modalImage.alt = altText;
      this.modal.style.display = "block";
    }
  }

  setupModalEvents() {
    // Close modal when clicking the close button
    const closeButton = this.modal.querySelector(".close-modal");
    closeButton.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    this.modal.addEventListener("click", (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = "none";
      }
    });
  }
}

// Initialize certificates section when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new CertificatesSection(
    "certificatesGrid",
    "certificateModal",
    CERTIFICATES_DATA
  );
});
