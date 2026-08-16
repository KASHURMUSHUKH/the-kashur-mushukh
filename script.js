```javascript id="x9kq2m"
/* =========================================================
   THE KASHUR MUSHUKH
   Premium Website Interactions
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     BUSINESS DETAILS
     ======================================================= */

  const WHATSAPP_NUMBER = "917889420904";

  /*
     Add the actual Kashur Mushukh Instagram URL later.

     Example:
     const INSTAGRAM_URL =
       "https://www.instagram.com/yourusername/";
  */

  const INSTAGRAM_URL = "https://www.instagram.com/";


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;


  /* =======================================================
     MOBILE NAVIGATION
     ======================================================= */

  if (menuToggle && navigation) {

    const menuSpans =
      menuToggle.querySelectorAll("span");

    const setMenuState = (isOpen) => {

      navigation.classList.toggle("active", isOpen);

      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen
          ? "Close navigation"
          : "Open navigation"
      );

      /*
         Animate hamburger into an elegant X.
      */

      if (menuSpans.length === 3) {

        menuSpans[0].style.transform =
          isOpen
            ? "translateY(6px) rotate(45deg)"
            : "none";

        menuSpans[1].style.opacity =
          isOpen ? "0" : "1";

        menuSpans[2].style.transform =
          isOpen
            ? "translateY(-6px) rotate(-45deg)"
            : "none";
      }

      /*
         Prevent background scrolling while
         mobile navigation is open.
      */

      document.body.style.overflow =
        isOpen ? "hidden" : "";
    };


    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );


    menuToggle.addEventListener(
      "click",
      () => {

        const isOpen =
          navigation.classList.contains("active");

        setMenuState(!isOpen);

      }
    );


    /*
       Close menu after selecting a section.
    */

    navigation
      .querySelectorAll("a")
      .forEach((link) => {

        link.addEventListener(
          "click",
          () => {

            setMenuState(false);

          }
        );

      });


    /*
       Close menu when clicking outside it.
    */

    document.addEventListener(
      "click",
      (event) => {

        const clickedInsideNavigation =
          navigation.contains(event.target);

        const clickedMenuButton =
          menuToggle.contains(event.target);

        if (
          navigation.classList.contains("active") &&
          !clickedInsideNavigation &&
          !clickedMenuButton
        ) {

          setMenuState(false);

        }

      }
    );


    /*
       Close menu with Escape.
    */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape" &&
          navigation.classList.contains("active")
        ) {

          setMenuState(false);
          menuToggle.focus();

        }

      }
    );

  }


  /* =======================================================
     WHATSAPP ORDER
     ======================================================= */

  const productButtons =
    document.querySelectorAll(".product-button");

  productButtons.forEach((button) => {

    button.addEventListener(
      "click",
      (event) => {

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

      }
    );

  });


  /* =======================================================
     INSTAGRAM
     ======================================================= */

  const instagramLinks =
    document.querySelectorAll(
      'a[href="https://www.instagram.com/"]'
    );

  instagramLinks.forEach((link) => {

    link.href = INSTAGRAM_URL;

  });


  /* =======================================================
     CURRENT YEAR
     ======================================================= */

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }


  /* =======================================================
     HEADER ON SCROLL
     ======================================================= */

  let ticking = false;

  const updateHeader = () => {

    if (!header) {
      return;
    }

    const scrolled =
      window.scrollY > 45;

    if (scrolled) {

      header.style.background =
        "rgba(9, 9, 8, 0.94)";

      header.style.backdropFilter =
        "blur(16px)";

      header.style.webkitBackdropFilter =
        "blur(16px)";

      header.style.borderBottomColor =
        "rgba(185, 154, 99, 0.18)";

      header.style.boxShadow =
        "0 10px 35px rgba(0, 0, 0, 0.12)";

    } else {

      header.style.background =
        "transparent";

      header.style.backdropFilter =
        "none";

      header.style.webkitBackdropFilter =
        "none";

      header.style.borderBottomColor =
        "rgba(255, 255, 255, 0.12)";

      header.style.boxShadow =
        "none";

    }

    ticking = false;

  };


  window.addEventListener(
    "scroll",
    () => {

      if (!ticking) {

        window.requestAnimationFrame(
          updateHeader
        );

        ticking = true;

      }

    },
    { passive: true }
  );


  updateHeader();


  /* =======================================================
     SMOOTH ANCHOR NAVIGATION
     ======================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );

  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

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
          behavior:
            prefersReducedMotion
              ? "auto"
              : "smooth",
          block: "start"
        });

      }
    );

  });


  /* =======================================================
     ACTIVE NAVIGATION LINK
     ======================================================= */

  const sections =
    document.querySelectorAll(
      "main section[id]"
    );

  const navLinks =
    document.querySelectorAll(
      ".navigation a"
    );

  if (
    sections.length &&
    navLinks.length &&
    "IntersectionObserver" in window
  ) {

    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            const currentID =
              entry.target.getAttribute("id");

            navLinks.forEach((link) => {

              const matches =
                link.getAttribute("href") ===
                "#" + currentID;

              link.classList.toggle(
                "active",
                matches
              );

            });

          });

        },
        {
          rootMargin:
            "-35% 0px -55% 0px",
          threshold: 0
        }
      );


    sections.forEach((section) => {

      sectionObserver.observe(section);

    });

  }


  /* =======================================================
     SCROLL REVEAL
     ======================================================= */

  const revealElements =
    document.querySelectorAll(
      [
        ".intro-heading",
        ".intro-text",
        ".story-image",
        ".story-content",
        ".note-card",
        ".product-card",
        ".contact-container"
      ].join(", ")
    );


  /*
     If the browser does not support IntersectionObserver,
     show everything immediately.
  */

  if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
  ) {

    revealElements.forEach((element) => {

      element.style.opacity = "1";
      element.style.transform = "none";

    });

  } else {

    revealElements.forEach((element, index) => {

      element.style.opacity = "0";

      element.style.transform =
        "translateY(28px)";

      element.style.transition =
        "opacity 0.85s ease, transform 0.85s cubic-bezier(0.22, 1, 0.36, 1)";

      /*
         Small stagger effect.
      */

      if (
        element.classList.contains("note-card")
      ) {

        const cardIndex =
          Array.from(
            element.parentElement.children
          ).indexOf(element);

        element.style.transitionDelay =
          `${cardIndex * 0.12}s`;

      } else {

        element.style.transitionDelay =
          `${Math.min(index * 0.03, 0.18)}s`;

      }

    });


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach((entry) => {

            if (!entry.isIntersecting) {
              return;
            }

            entry.target.style.opacity =
              "1";

            entry.target.style.transform =
              "translateY(0)";

            observer.unobserve(
              entry.target
            );

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach((element) => {

      revealObserver.observe(element);

    });

  }


  /* =======================================================
     IMAGE LOADING POLISH
     ======================================================= */

  const images =
    document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener(
      "load",
      () => {

        image.classList.add("loaded");

      },
      { once: true }
    );

  });


  /* =======================================================
     CONSOLE BRAND MESSAGE
     ======================================================= */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

});
```
