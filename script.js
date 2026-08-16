```javascript
/* =========================================================
   THE KASHUR MUSHUKH
   Website Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------------------------------------------------------
     BUSINESS DETAILS
     --------------------------------------------------------- */

  const WHATSAPP_NUMBER = "917889420904";

  /*
     Replace this with the actual Instagram profile later.

     Example:
     const INSTAGRAM_URL = "https://www.instagram.com/yourusername/";
  */

  const INSTAGRAM_URL = "https://www.instagram.com/";


  /* ---------------------------------------------------------
     MOBILE MENU
     --------------------------------------------------------- */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

      navigation.classList.toggle("active");

      const isOpen = navigation.classList.contains("active");

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    /* Close menu after clicking a navigation link */

    const navigationLinks =
      navigation.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        navigation.classList.remove("active");

        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );

      });

    });

  }


  /* ---------------------------------------------------------
     WHATSAPP ORDER BUTTONS
     --------------------------------------------------------- */

  const whatsappLinks =
    document.querySelectorAll('a[href="#contact"]');

  whatsappLinks.forEach(function (link) {

    if (
      link.classList.contains("product-button")
    ) {

      link.addEventListener("click", function (event) {

        event.preventDefault();

        const message =
          "Hello, I am interested in The Kashur Mushukh fragrance. Please share the price and ordering details.";

        const whatsappURL =
          "https://wa.me/" +
          WHATSAPP_NUMBER +
          "?text=" +
          encodeURIComponent(message);

        window.open(
          whatsappURL,
          "_blank",
          "noopener,noreferrer"
        );

      });

    }

  });


  /* ---------------------------------------------------------
     INSTAGRAM
     --------------------------------------------------------- */

  const instagramLinks =
    document.querySelectorAll(
      'a[href="https://www.instagram.com/"]'
    );

  instagramLinks.forEach(function (link) {

    link.href = INSTAGRAM_URL;

  });


  /* ---------------------------------------------------------
     CURRENT YEAR
     --------------------------------------------------------- */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* ---------------------------------------------------------
     HEADER BACKGROUND ON SCROLL
     --------------------------------------------------------- */

  const header =
    document.querySelector(".site-header");

  function updateHeader() {

    if (!header) {
      return;
    }

    if (window.scrollY > 40) {

      header.style.background =
        "rgba(12, 12, 11, 0.96)";

      header.style.backdropFilter =
        "blur(12px)";

    } else {

      header.style.background =
        "transparent";

      header.style.backdropFilter =
        "none";

    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* ---------------------------------------------------------
     SMOOTH SECTION NAVIGATION
     --------------------------------------------------------- */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  anchorLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#" ||
        link.classList.contains("product-button")
      ) {
        return;
      }

      const target =
        document.querySelector(targetID);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* ---------------------------------------------------------
     SIMPLE REVEAL ANIMATION
     --------------------------------------------------------- */

  const revealElements =
    document.querySelectorAll(
      ".intro-heading, .intro-text, .story-image, .story-content, .note-card, .product-card, .contact-container"
    );


  revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity 0.8s ease, transform 0.8s ease";

  });


  const revealObserver =
    new IntersectionObserver(
      function (entries, observer) {

        entries.forEach(function (entry) {

          if (!entry.isIntersecting) {
            return;
          }

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(function (element) {

    revealObserver.observe(element);

  });


  /* ---------------------------------------------------------
     CONSOLE BRAND MESSAGE
     --------------------------------------------------------- */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

});
```
