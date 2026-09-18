// ===============================
// MOBILE MENU
// ===============================

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      isOpen ? "true" : "false"
    );
  });
}


// Close mobile menu after clicking a link

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav?.classList.remove("open");
  });
});


// ===============================
// SCROLL ANIMATION
// ===============================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

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
      threshold: 0.1
    }
  );

  revealElements.forEach((element) => {
    observer.observe(element);
  });

} else {

  revealElements.forEach((element) => {
    element.classList.add("visible");
  });

}


// ===============================
// YEAR
// ===============================

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ===============================
// GALLERY LIGHTBOX
// ===============================

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeButton = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-item").forEach((item) => {

  item.addEventListener("click", () => {

    const image = item.dataset.image;

    if (!image || !lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = image;

    lightbox.classList.add("open");

    lightbox.setAttribute("aria-hidden", "false");

  });

});


function closeLightbox() {

  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("open");

  lightbox.setAttribute("aria-hidden", "true");

  lightboxImage.src = "";

}


closeButton?.addEventListener(
  "click",
  closeLightbox
);


lightbox?.addEventListener(
  "click",
  (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  }
);


// ===============================
// CONTACT FORM
// ===============================



// Static-site enquiry form. Opens the visitor's email app.
const quoteForm = document.getElementById("quoteForm");
if (quoteForm) {
  quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(quoteForm);
    const subject = encodeURIComponent("Website Enquiry - Nath Plastics Industries");
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}\n` +
      `Company: ${data.get("company") || ""}\n` +
      `Phone: ${data.get("phone") || ""}\n` +
      `Email: ${data.get("email") || ""}\n` +
      `Product / Requirement: ${data.get("product") || ""}\n\n` +
      `Message:\n${data.get("message") || ""}`
    );
    window.location.href =
      `mailto:sales@nathplastics.com?subject=${subject}&body=${body}`;
  });
}
