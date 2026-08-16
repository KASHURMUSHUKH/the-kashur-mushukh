document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     BUSINESS DETAILS
  ===================================================== */

  const WHATSAPP_NUMBER = "917889420904";

  const PRODUCT_NAME = "The Kashur Mushukh";
  const PRODUCT_PRICE = "₹1,499";


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

      navigation.classList.toggle("active");

      const isOpen =
        navigation.classList.contains("active");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });


    navigation.querySelectorAll("a").forEach(function (link) {

      link.addEventListener("click", function () {

        navigation.classList.remove("active");

        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =====================================================
     HEADER SCROLL
  ===================================================== */

  const header =
    document.querySelector(".site-header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 50) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  }

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );

  updateHeader();


  /* =====================================================
     PAYMENT METHOD
  ===================================================== */

  const paymentButtons =
    document.querySelectorAll(".payment-option");

  const upiDetails =
    document.getElementById("upi-details");

  const codDetails =
    document.getElementById("cod-details");

  let selectedPayment = "UPI";

  paymentButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      paymentButtons.forEach(function (item) {

        item.classList.remove("active");

      });

      button.classList.add("active");

      selectedPayment =
        button.dataset.payment === "cod"
          ? "Cash on Delivery"
          : "UPI";

      if (selectedPayment === "UPI") {

        upiDetails.style.display = "block";
        codDetails.style.display = "none";

      } else {

        upiDetails.style.display = "none";
        codDetails.style.display = "block";

      }

    });

  });


  /* =====================================================
     WHATSAPP ORDER
  ===================================================== */

  const orderButtons =
    document.querySelectorAll(".order-button");

  orderButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

      event.preventDefault();

      const message =
        "Hello, I would like to order The Kashur Mushukh.\n\n" +
        "Product: " + PRODUCT_NAME + "\n" +
        "Size: 50 ML\n" +
        "Price: " + PRODUCT_PRICE + "\n" +
        "Payment: " + selectedPayment + "\n\n" +
        "Please share the next steps for my order.";

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

  });


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetID =
        link.getAttribute("href");

      if (
        !targetID ||
        targetID === "#"
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


  /* =====================================================
     REVEAL ANIMATIONS
  ===================================================== */

  const revealElements =
    document.querySelectorAll(
      ".intro-grid > div, " +
      ".story-content, " +
      ".story-visual, " +
      ".note-card, " +
      ".product-card, " +
      ".order-box, " +
      ".order-intro, " +
      ".service-card, " +
      ".contact-container"
    );


  if ("IntersectionObserver" in window) {

    revealElements.forEach(function (element) {

      element.style.opacity = "0";
      element.style.transform =
        "translateY(25px)";
      element.style.transition =
        "opacity .8s ease, transform .8s ease";

    });


    const observer =
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

      observer.observe(element);

    });

  }


  /* =====================================================
     YEAR
  ===================================================== */

  const year =
    document.getElementById("year");

  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     BRAND MESSAGE
  ===================================================== */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

});
