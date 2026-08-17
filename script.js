/* =========================================================
   THE KASHUR MUSHUKH
   E-COMMERCE WEBSITE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =========================================================
     BUSINESS DETAILS
     ========================================================= */

  const WHATSAPP_NUMBER = "917889420904";

  const UPI_ID = "yourupi@upi";

  /*
     IMPORTANT:
     Replace the UPI_ID above with your real UPI ID.

     Example:
     const UPI_ID = "7889420904@hdfc";
  */


  /* =========================================================
     PRODUCT CATALOGUE
     ========================================================= */

  const PRODUCTS = {

    mushukh: {
      id: "mushukh",
      name: "The Kashur Mushukh",
      size: "50 ML",
      price: 1449,
      category: "Signature Fragrance",
      description:
        "Our signature Kashmir-inspired fragrance — elegant, warm and unforgettable."
    },

    oud: {
      id: "oud",
      name: "Kashur Oud",
      size: "50 ML",
      price: 1649,
      category: "Luxury Collection",
      description:
        "A rich and sophisticated oud fragrance inspired by the timeless character of Kashmir."
    },

    musk: {
      id: "musk",
      name: "Kashur Musk",
      size: "50 ML",
      price: 1349,
      category: "Signature Collection",
      description:
        "Soft, warm and sensual musk with a refined Kashmir-inspired character."
    },

    rose: {
      id: "rose",
      name: "Kashur Rose",
      size: "50 ML",
      price: 1299,
      category: "Floral Collection",
      description:
        "A graceful floral fragrance inspired by the roses and gardens of Kashmir."
    },

    attar: {
      id: "attar",
      name: "Kashur Attar",
      size: "12 ML",
      price: 899,
      category: "Traditional Collection",
      description:
        "A concentrated traditional fragrance inspired by the heritage of Kashmir."
    },

    discovery: {
      id: "discovery",
      name: "Kashur Discovery Set",
      size: "5 × 5 ML",
      price: 1199,
      category: "Discovery Collection",
      description:
        "Discover a selection of Kashur Mushukh fragrances in one elegant set."
    },

    gift: {
      id: "gift",
      name: "Kashur Luxury Gift Set",
      size: "Gift Set",
      price: 2299,
      category: "Gift Collection",
      description:
        "A beautifully presented fragrance experience created for gifting."
    }

  };


  /* =========================================================
     CART
     ========================================================= */

  let cart = [];


  /* =========================================================
     DOM ELEMENTS
     ========================================================= */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".navigation");

  const cartButtons =
    document.querySelectorAll(".add-to-cart");

  const orderButtons =
    document.querySelectorAll(".order-button");

  const paymentButtons =
    document.querySelectorAll(".payment-option");

  const cartContainer =
    document.querySelector(".cart-items");

  const cartCount =
    document.querySelector(".cart-count");

  const cartTotal =
    document.querySelector(".cart-total");

  const cartSubtotal =
    document.querySelector(".cart-subtotal");

  const upiDetails =
    document.getElementById("upi-details");

  const codDetails =
    document.getElementById("cod-details");

  const checkoutForm =
    document.querySelector(".checkout-form");

  const header =
    document.querySelector(".site-header");

  let selectedPayment = "UPI";


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

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
        isOpen
          ? "Close navigation"
          : "Open navigation"
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


  /* =========================================================
     HEADER ON SCROLL
     ========================================================= */

  function updateHeader() {

    if (!header) {
      return;
    }

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


  /* =========================================================
     FORMAT CURRENCY
     ========================================================= */

  function formatPrice(price) {

    return "₹" +
      price.toLocaleString("en-IN");

  }


  /* =========================================================
     FIND PRODUCT
     ========================================================= */

  function findProduct(productId) {

    return PRODUCTS[productId] || null;

  }


  /* =========================================================
     ADD PRODUCT TO CART
     ========================================================= */

  function addToCart(productId) {

    const product =
      findProduct(productId);

    if (!product) {
      return;
    }


    const existingProduct =
      cart.find(function (item) {

        return item.id === productId;

      });


    if (existingProduct) {

      existingProduct.quantity += 1;

    } else {

      cart.push({

        id: product.id,
        name: product.name,
        size: product.size,
        price: product.price,
        quantity: 1

      });

    }


    updateCart();

    showCartMessage(
      product.name + " added to cart."
    );

  }


  /* =========================================================
     REMOVE FROM CART
     ========================================================= */

  function removeFromCart(productId) {

    cart =
      cart.filter(function (item) {

        return item.id !== productId;

      });

    updateCart();

  }


  /* =========================================================
     CHANGE QUANTITY
     ========================================================= */

  function changeQuantity(productId, change) {

    const item =
      cart.find(function (product) {

        return product.id === productId;

      });


    if (!item) {
      return;
    }


    item.quantity += change;


    if (item.quantity <= 0) {

      removeFromCart(productId);

      return;

    }


    updateCart();

  }


  /* =========================================================
     CALCULATE CART TOTAL
     ========================================================= */

  function calculateTotal() {

    return cart.reduce(

      function (total, item) {

        return total +
          (item.price * item.quantity);

      },

      0

    );

  }


  /* =========================================================
     CART COUNT
     ========================================================= */

  function calculateCartCount() {

    return cart.reduce(

      function (total, item) {

        return total + item.quantity;

      },

      0

    );

  }


  /* =========================================================
     UPDATE CART
     ========================================================= */

  function updateCart() {

    const count =
      calculateCartCount();

    const total =
      calculateTotal();


    if (cartCount) {

      cartCount.textContent =
        count;

    }


    if (cartTotal) {

      cartTotal.textContent =
        formatPrice(total);

    }


    if (cartSubtotal) {

      cartSubtotal.textContent =
        formatPrice(total);

    }


    if (!cartContainer) {
      return;
    }


    if (cart.length === 0) {

      cartContainer.innerHTML =

        '<p class="empty-cart">' +
        'Your cart is empty.' +
        '</p>';

      return;

    }


    cartContainer.innerHTML = "";


    cart.forEach(function (item) {

      const cartItem =
        document.createElement("div");

      cartItem.className =
        "cart-item";


      cartItem.innerHTML = `

        <div class="cart-item-info">

          <strong>
            ${item.name}
          </strong>

          <span>
            ${item.size}
          </span>

          <span>
            ${formatPrice(item.price)}
          </span>

        </div>


        <div class="cart-item-actions">

          <button
            type="button"
            class="quantity-minus"
            data-id="${item.id}">
            −
          </button>

          <span>
            ${item.quantity}
          </span>

          <button
            type="button"
            class="quantity-plus"
            data-id="${item.id}">
            +
          </button>

          <button
            type="button"
            class="remove-cart-item"
            data-id="${item.id}">
            Remove
          </button>

        </div>

      `;


      cartContainer.appendChild(
        cartItem
      );

    });


    attachCartEvents();

  }


  /* =========================================================
     CART BUTTON EVENTS
     ========================================================= */

  function attachCartEvents() {

    document
      .querySelectorAll(".quantity-minus")
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            changeQuantity(
              button.dataset.id,
              -1
            );

          }
        );

      });


    document
      .querySelectorAll(".quantity-plus")
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            changeQuantity(
              button.dataset.id,
              1
            );

          }
        );

      });


    document
      .querySelectorAll(".remove-cart-item")
      .forEach(function (button) {

        button.addEventListener(
          "click",
          function () {

            removeFromCart(
              button.dataset.id
            );

          }
        );

      });

  }


  /* =========================================================
     ADD TO CART BUTTONS
     ========================================================= */

  cartButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();

        const productId =
          button.dataset.product;

        if (productId) {

          addToCart(productId);

        }

      }
    );

  });


  /* =========================================================
     QUICK ORDER BUTTON
     ========================================================= */

  orderButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function (event) {

        event.preventDefault();


        const productId =
          button.dataset.product;


        if (productId) {

          addToCart(productId);

          const cartSection =
            document.querySelector("#cart");

          if (cartSection) {

            cartSection.scrollIntoView({
              behavior: "smooth"
            });

          }

          return;

        }


        if (cart.length === 0) {

          addToCart("mushukh");

        }


        const cartSection =
          document.querySelector("#cart");

        if (cartSection) {

          cartSection.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  });


  /* =========================================================
     PAYMENT METHOD
     ========================================================= */

  paymentButtons.forEach(function (button) {

    button.addEventListener(
      "click",
      function () {

        paymentButtons.forEach(
          function (item) {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add(
          "active"
        );


        selectedPayment =
          button.dataset.payment === "cod"
            ? "Cash on Delivery"
            : "UPI";


        if (upiDetails) {

          upiDetails.style.display =
            selectedPayment === "UPI"
              ? "block"
              : "none";

        }


        if (codDetails) {

          codDetails.style.display =
            selectedPayment ===
              "Cash on Delivery"
              ? "block"
              : "none";

        }

      }
    );

  });


  /* =========================================================
     GENERATE ORDER SUMMARY
     ========================================================= */

  function generateOrderSummary(
    customerName,
    phone,
    address,
    city,
    pincode
  ) {

    let message =
      "Hello, I would like to place an order with The Kashur Mushukh.\n\n";


    message +=
      "ORDER DETAILS\n";

    message +=
      "------------------------\n";


    cart.forEach(function (item) {

      message +=
        item.name +
        " (" +
        item.size +
        ")\n";

      message +=
        "Quantity: " +
        item.quantity +
        "\n";

      message +=
        "Price: " +
        formatPrice(
          item.price *
          item.quantity
        ) +
        "\n\n";

    });


    message +=
      "TOTAL: " +
      formatPrice(
        calculateTotal()
      ) +
      "\n\n";


    message +=
      "CUSTOMER DETAILS\n";

    message +=
      "------------------------\n";

    message +=
      "Name: " +
      customerName +
      "\n";

    message +=
      "Phone: " +
      phone +
      "\n";

    message +=
      "Address: " +
      address +
      "\n";

    message +=
      "City: " +
      city +
      "\n";

    message +=
      "PIN Code: " +
      pincode +
      "\n\n";


    message +=
      "PAYMENT METHOD: " +
      selectedPayment +
      "\n";


    if (selectedPayment === "UPI") {

      message +=
        "UPI ID: " +
        UPI_ID +
        "\n";

    }


    message +=
      "\nPlease confirm my order and share the next steps.";

    return message;

  }


  /* =========================================================
     CHECKOUT FORM
     ========================================================= */

  if (checkoutForm) {

    checkoutForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();


        if (cart.length === 0) {

          alert(
            "Your cart is empty. Please add a product first."
          );

          return;

        }


        const customerName =
          document.querySelector(
            "#customer-name"
          )?.value.trim();


        const phone =
          document.querySelector(
            "#customer-phone"
          )?.value.trim();


        const address =
          document.querySelector(
            "#customer-address"
          )?.value.trim();


        const city =
          document.querySelector(
            "#customer-city"
          )?.value.trim();


        const pincode =
          document.querySelector(
            "#customer-pincode"
          )?.value.trim();


        if (
          !customerName ||
          !phone ||
          !address ||
          !city ||
          !pincode
        ) {

          alert(
            "Please fill in all delivery details."
          );

          return;

        }


        if (
          phone.length < 10
        ) {

          alert(
            "Please enter a valid phone number."
          );

          return;

        }


        if (
          pincode.length !== 6
        ) {

          alert(
            "Please enter a valid 6-digit PIN code."
          );

          return;

        }


        const message =
          generateOrderSummary(
            customerName,
            phone,
            address,
            city,
            pincode
          );


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


  /* =========================================================
     BUY NOW BUTTONS
     ========================================================= */

  document
    .querySelectorAll(".buy-now")
    .forEach(function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();


          const productId =
            button.dataset.product;


          if (!productId) {
            return;
          }


          cart = [];


          addToCart(productId);


          const checkout =
            document.querySelector(
              "#checkout"
            );


          if (checkout) {

            checkout.scrollIntoView({
              behavior: "smooth"
            });

          }

        }
      );

    });


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(function (link) {

      link.addEventListener(
        "click",
        function (event) {

          const targetID =
            link.getAttribute(
              "href"
            );


          if (
            !targetID ||
            targetID === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetID
            );


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


  /* =========================================================
     CART MESSAGE
     ========================================================= */

  function showCartMessage(message) {

    let notification =
      document.querySelector(
        ".cart-notification"
      );


    if (!notification) {

      notification =
        document.createElement(
          "div"
        );

      notification.className =
        "cart-notification";


      document.body.appendChild(
        notification
      );

    }


    notification.textContent =
      message;


    notification.classList.add(
      "show"
    );


    setTimeout(
      function () {

        notification.classList.remove(
          "show"
        );

      },
      2500
    );

  }


  /* =========================================================
     REVEAL ANIMATIONS
     ========================================================= */

  const revealElements =
    document.querySelectorAll(
      ".intro-grid > div, " +
      ".story-content, " +
      ".story-visual, " +
      ".note-card, " +
      ".product-card, " +
      ".product-item, " +
      ".order-box, " +
      ".order-intro, " +
      ".service-card, " +
      ".contact-container"
    );


  if (
    "IntersectionObserver" in window
  ) {

    revealElements.forEach(
      function (element) {

        element.style.opacity =
          "0";

        element.style.transform =
          "translateY(25px)";

        element.style.transition =
          "opacity .8s ease, transform .8s ease";

      }
    );


    const observer =
      new IntersectionObserver(
        function (
          entries,
          observer
        ) {

          entries.forEach(
            function (entry) {

              if (
                !entry.isIntersecting
              ) {

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
          threshold: 0.12
        }
      );


    revealElements.forEach(
      function (element) {

        observer.observe(
          element
        );

      }
    );

  }


  /* =========================================================
     CURRENT YEAR
     ========================================================= */

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        navigation
      ) {

        navigation.classList.remove(
          "active"
        );

      }

    }
  );


  /* =========================================================
     INITIAL CART
     ========================================================= */

  updateCart();


  /* =========================================================
     BRAND MESSAGE
     ========================================================= */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

});
