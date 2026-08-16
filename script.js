/* =========================================================
   THE KASHUR MUSHUKH
   Website Functionality
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* -------------------------------------------------------
     BUSINESS DETAILS
  ------------------------------------------------------- */

  const WHATSAPP_NUMBER = "917889420904";

  const PRODUCT_NAME =
    "The Kashur Mushukh - 50 ML";

  const PRODUCT_PRICE =
    "1499";


  /* -------------------------------------------------------
     CURRENT YEAR
  ------------------------------------------------------- */

  const year =
    document.getElementById("year");

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }


  /* -------------------------------------------------------
     MOBILE MENU
  ------------------------------------------------------- */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".navigation");

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {

      navigation.classList.toggle("active");

      const opened =
        navigation.classList.contains("active");

      menuToggle.setAttribute(
        "aria-label",
        opened
          ? "Close navigation"
          : "Open navigation"
      );

    });


    navigation
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            navigation.classList.remove("active");

            menuToggle.setAttribute(
              "aria-label",
              "Open navigation"
            );

          }
        );

      });

  }


  /* -------------------------------------------------------
     HEADER ON SCROLL
  ------------------------------------------------------- */

  const header =
    document.querySelector(".site-header");

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 40) {

      header.style.background =
        "rgba(16,16,14,.94)";

      header.style.backdropFilter =
        "blur(14px)";

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


  /* -------------------------------------------------------
     ORDER MODAL
  ------------------------------------------------------- */

  const modal =
    document.getElementById("orderModal");

  const buyButtons =
    document.querySelectorAll(".buy-button");

  const closeButton =
    document.querySelector(".modal-close");

  const codButton =
    document.getElementById("codButton");

  const upiButton =
    document.getElementById("upiButton");


  function openModal() {

    if (modal) {
      modal.classList.add("active");
    }

  }


  function closeModal() {

    if (modal) {
      modal.classList.remove("active");
    }

  }


  buyButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      openModal
    );

  });


  if (closeButton) {

    closeButton.addEventListener(
      "click",
      closeModal
    );

  }


  if (modal) {

    modal.addEventListener(
      "click",
      function (event) {

        if (event.target === modal) {
          closeModal();
        }

      }
    );

  }


  /* -------------------------------------------------------
     MODAL → ORDER FORM
  ------------------------------------------------------- */

  function goToOrder(paymentMethod) {

    closeModal();

    const orderSection =
      document.getElementById("order");

    if (orderSection) {

      orderSection.scrollIntoView({
        behavior: "smooth"
      });

    }

    const paymentRadio =
      document.querySelector(
        'input[name="payment"][value="' +
        paymentMethod +
        '"]'
      );

    if (paymentRadio) {

      setTimeout(function () {

        paymentRadio.checked = true;

      }, 500);

    }

  }


  if (codButton) {

    codButton.addEventListener(
      "click",
      function () {

        goToOrder("COD");

      }
    );

  }


  if (upiButton) {

    upiButton.addEventListener(
      "click",
      function () {

        goToOrder("UPI");

      }
    );

  }


  /* -------------------------------------------------------
     ORDER FORM
  ------------------------------------------------------- */

  const orderForm =
    document.getElementById("orderForm");


  if (orderForm) {

    orderForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        const name =
          document
            .getElementById("customerName")
            .value
            .trim();


        const phone =
          document
            .getElementById("customerPhone")
            .value
            .trim();


        const address =
          document
            .getElementById("customerAddress")
            .value
            .trim();


        const city =
          document
            .getElementById("customerCity")
            .value
            .trim();


        const pincode =
          document
            .getElementById("customerPincode")
            .value
            .trim();


        const payment =
          document
            .querySelector(
              'input[name="payment"]:checked'
            )
            .value;


        if (!name ||
            !phone ||
            !address ||
            !city ||
            !pincode) {

          alert(
            "Please fill all the required details."
          );

          return;

        }


        const message =
`Hello, I want to place an order for ${PRODUCT_NAME}.

Name: ${name}
Mobile: ${phone}

Address:
${address}
${city} - ${pincode}

Payment Method: ${payment}

Product: ${PRODUCT_NAME}
Price: ₹${PRODUCT_PRICE}

Please confirm my order and share the next steps.`;


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

  }


  /* -------------------------------------------------------
     SMOOTH ANCHOR NAVIGATION
  ------------------------------------------------------- */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const id =
            link.getAttribute("href");

          if (!id || id === "#") {
            return;
          }

          const target =
            document.querySelector(id);

          if (!target) {
            return;
          }

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* -------------------------------------------------------
     REVEAL ANIMATION
  ------------------------------------------------------- */

  const revealElements =
    document.querySelectorAll(
      ".intro-grid, .story-grid, .note, .product-card, .why-card, .order-container, .delivery-grid, .faq-list, .contact-inner"
    );


  revealElements.forEach(function (element) {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(25px)";

    element.style.transition =
      "opacity .8s ease, transform .8s ease";

  });


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        function (entries, observer) {

          entries.forEach(
            function (entry) {

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

            }
          );

        },
        {
          threshold: 0.08
        }
      );


    revealElements.forEach(
      function (element) {

        observer.observe(element);

      }
    );

  } else {

    revealElements.forEach(
      function (element) {

        element.style.opacity = "1";

        element.style.transform =
          "translateY(0)";

      }
    );

  }


  /* -------------------------------------------------------
     ESCAPE KEY CLOSES MODAL
  ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeModal();
      }

    }
  );


  /* -------------------------------------------------------
     BRAND CONSOLE
  ------------------------------------------------------- */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

});
