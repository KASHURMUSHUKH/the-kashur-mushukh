/* =========================================================
   THE KASHUR MUSHUKH
   Complete Website & Order Management
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* =====================================================
     BUSINESS DETAILS
  ===================================================== */

  const BUSINESS = {
    name: "The Kashur Mushukh",
    address: "Kangan, Ganderbal, Jammu & Kashmir",
    pincode: "191202",
    phone: "9596208713",
    whatsapp: "917889420904",
    email: "kashurmushukh@gmail.com"
  };


  /* =====================================================
     PRODUCT DETAILS
  ===================================================== */

  const PRODUCTS = {
    "kashur-mushukh": {
      name: "The Kashur Mushukh",
      size: "50 ML",
      price: 1499
    },

    "mushukh-noir": {
      name: "Mushukh Noir",
      size: "50 ML",
      price: 1699
    },

    "mushukh-royal": {
      name: "Mushukh Royal",
      size: "50 ML",
      price: 1799
    },

    "kashmir-mist": {
      name: "Kashmir Mist",
      size: "50 ML",
      price: 1399
    },

    "gulab-mushukh": {
      name: "Gulab Mushukh",
      size: "50 ML",
      price: 1449
    },

    "oud-kashmir": {
      name: "Oud Kashmir",
      size: "50 ML",
      price: 1899
    }
  };


  /* =====================================================
     CURRENT ORDER
  ===================================================== */

  let selectedPayment = "UPI";

  let currentProduct = PRODUCTS["kashur-mushukh"];


  /* =====================================================
     MOBILE MENU
  ===================================================== */

  const menuToggle =
    document.querySelector(".menu-toggle");

  const navigation =
    document.querySelector(".navigation");


  if (menuToggle && navigation) {

    menuToggle.addEventListener(
      "click",
      function () {

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

      }
    );


    navigation
      .querySelectorAll("a")
      .forEach(function (link) {

        link.addEventListener(
          "click",
          function () {

            navigation.classList.remove(
              "active"
            );

            menuToggle.setAttribute(
              "aria-expanded",
              "false"
            );

          }
        );

      });

  }


  /* =====================================================
     HEADER SCROLL EFFECT
  ===================================================== */

  const header =
    document.querySelector(".site-header");


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
    {
      passive: true
    }
  );


  updateHeader();


  /* =====================================================
     PAYMENT METHOD
  ===================================================== */

  const paymentButtons =
    document.querySelectorAll(
      ".payment-option"
    );


  const upiDetails =
    document.getElementById(
      "upi-details"
    );


  const codDetails =
    document.getElementById(
      "cod-details"
    );


  paymentButtons.forEach(
    function (button) {

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


          if (
            button.dataset.payment ===
            "cod"
          ) {

            selectedPayment =
              "Cash on Delivery";


            if (upiDetails) {

              upiDetails.style.display =
                "none";

            }


            if (codDetails) {

              codDetails.style.display =
                "block";

            }

          } else {

            selectedPayment =
              "UPI";


            if (upiDetails) {

              upiDetails.style.display =
                "block";

            }


            if (codDetails) {

              codDetails.style.display =
                "none";

            }

          }

        }
      );

    }
  );


  /* =====================================================
     PRODUCT SELECTION
  ===================================================== */

  const productSelectors =
    document.querySelectorAll(
      "[data-product]"
    );


  productSelectors.forEach(
    function (element) {

      element.addEventListener(
        "click",
        function () {

          const productID =
            element.dataset.product;


          if (
            PRODUCTS[productID]
          ) {

            currentProduct =
              PRODUCTS[productID];

            updateProductInformation();

          }

        }
      );

    }
  );


  function updateProductInformation() {

    const productNames =
      document.querySelectorAll(
        ".selected-product-name"
      );


    productNames.forEach(
      function (element) {

        element.textContent =
          currentProduct.name;

      }
    );


    const productPrices =
      document.querySelectorAll(
        ".selected-product-price"
      );


    productPrices.forEach(
      function (element) {

        element.textContent =
          formatCurrency(
            currentProduct.price
          );

      }
    );


    const productSizes =
      document.querySelectorAll(
        ".selected-product-size"
      );


    productSizes.forEach(
      function (element) {

        element.textContent =
          currentProduct.size;

      }
    );

  }


  /* =====================================================
     CURRENCY FORMAT
  ===================================================== */

  function formatCurrency(amount) {

    return "₹" +
      Number(amount).toLocaleString(
        "en-IN"
      );

  }


  /* =====================================================
     CUSTOMER DETAILS
  ===================================================== */

  function getCustomerDetails() {

    const customerName =
      document.getElementById(
        "customer-name"
      );


    const customerPhone =
      document.getElementById(
        "customer-phone"
      );


    const customerEmail =
      document.getElementById(
        "customer-email"
      );


    const customerAddress =
      document.getElementById(
        "customer-address"
      );


    const customerPincode =
      document.getElementById(
        "customer-pincode"
      );


    return {

      name:
        customerName
          ? customerName.value.trim()
          : "",

      phone:
        customerPhone
          ? customerPhone.value.trim()
          : "",

      email:
        customerEmail
          ? customerEmail.value.trim()
          : "",

      address:
        customerAddress
          ? customerAddress.value.trim()
          : "",

      pincode:
        customerPincode
          ? customerPincode.value.trim()
          : ""

    };

  }


  /* =====================================================
     VALIDATE CUSTOMER DETAILS
  ===================================================== */

  function validateCustomer() {

    const customer =
      getCustomerDetails();


    if (!customer.name) {

      alert(
        "Please enter the customer's name."
      );

      return false;

    }


    if (!customer.phone) {

      alert(
        "Please enter the customer's phone number."
      );

      return false;

    }


    if (!customer.address) {

      alert(
        "Please enter the delivery address."
      );

      return false;

    }


    if (!customer.pincode) {

      alert(
        "Please enter the PIN code."
      );

      return false;

    }


    return true;

  }


  /* =====================================================
     QUANTITY
  ===================================================== */

  const quantityInput =
    document.getElementById(
      "quantity"
    );


  function getQuantity() {

    if (!quantityInput) {
      return 1;
    }


    let quantity =
      parseInt(
        quantityInput.value,
        10
      );


    if (
      isNaN(quantity) ||
      quantity < 1
    ) {

      quantity = 1;

    }


    return quantity;

  }


  /* =====================================================
     CALCULATE ORDER
  ===================================================== */

  function calculateOrder() {

    const quantity =
      getQuantity();


    const subtotal =
      currentProduct.price *
      quantity;


    const shipping =
      subtotal >= 1999
        ? 0
        : 99;


    const total =
      subtotal +
      shipping;


    return {

      quantity,
      subtotal,
      shipping,
      total

    };

  }


  /* =====================================================
     UPDATE ORDER SUMMARY
  ===================================================== */

  function updateOrderSummary() {

    const order =
      calculateOrder();


    const subtotalElement =
      document.getElementById(
        "order-subtotal"
      );


    const shippingElement =
      document.getElementById(
        "order-shipping"
      );


    const totalElement =
      document.getElementById(
        "order-total"
      );


    if (subtotalElement) {

      subtotalElement.textContent =
        formatCurrency(
          order.subtotal
        );

    }


    if (shippingElement) {

      shippingElement.textContent =
        order.shipping === 0
          ? "FREE"
          : formatCurrency(
              order.shipping
            );

    }


    if (totalElement) {

      totalElement.textContent =
        formatCurrency(
          order.total
        );

    }

  }


  if (quantityInput) {

    quantityInput.addEventListener(
      "input",
      updateOrderSummary
    );

  }


  updateProductInformation();

  updateOrderSummary();


  /* =====================================================
     GENERATE INVOICE NUMBER
  ===================================================== */

  function generateInvoiceNumber() {

    const date =
      new Date();


    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(2, "0");


    const day =
      String(
        date.getDate()
      ).padStart(2, "0");


    const random =
      Math.floor(
        1000 +
        Math.random() * 9000
      );


    return (
      "KM-" +
      year +
      month +
      day +
      "-" +
      random
    );

  }


  /* =====================================================
     SAVE BILL RECORD
  ===================================================== */

  function saveBillRecord(invoice) {

    let records =
      JSON.parse(
        localStorage.getItem(
          "kashurMushukhBills"
        )
      ) || [];


    records.push(invoice);


    localStorage.setItem(
      "kashurMushukhBills",
      JSON.stringify(records)
    );

  }


  /* =====================================================
     CREATE BILL OBJECT
  ===================================================== */

  function createBill() {

    const customer =
      getCustomerDetails();


    const order =
      calculateOrder();


    return {

      invoiceNumber:
        generateInvoiceNumber(),

      date:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      time:
        new Date().toLocaleTimeString(
          "en-IN"
        ),

      business: BUSINESS,

      customer: customer,

      product: {

        name:
          currentProduct.name,

        size:
          currentProduct.size,

        quantity:
          order.quantity,

        price:
          currentProduct.price

      },

      subtotal:
        order.subtotal,

      shipping:
        order.shipping,

      total:
        order.total,

      payment:
        selectedPayment

    };

  }


  /* =====================================================
     WHATSAPP ORDER
  ===================================================== */

  const orderButtons =
    document.querySelectorAll(
      ".order-button"
    );


  orderButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();


          if (
            !validateCustomer()
          ) {

            return;

          }


          const customer =
            getCustomerDetails();


          const order =
            calculateOrder();


          const message =

            "Hello, I would like to place an order from The Kashur Mushukh.\n\n" +

            "PRODUCT DETAILS\n" +
            "Product: " +
            currentProduct.name +
            "\n" +

            "Size: " +
            currentProduct.size +
            "\n" +

            "Quantity: " +
            order.quantity +
            "\n" +

            "Price: " +
            formatCurrency(
              currentProduct.price
            ) +
            "\n\n" +

            "ORDER TOTAL\n" +
            "Subtotal: " +
            formatCurrency(
              order.subtotal
            ) +
            "\n" +

            "Shipping: " +
            (
              order.shipping === 0
                ? "FREE"
                : formatCurrency(
                    order.shipping
                  )
            ) +
            "\n" +

            "Total: " +
            formatCurrency(
              order.total
            ) +
            "\n\n" +

            "PAYMENT\n" +
            selectedPayment +
            "\n\n" +

            "CUSTOMER DETAILS\n" +
            "Name: " +
            customer.name +
            "\n" +

            "Phone: " +
            customer.phone +
            "\n" +

            "Email: " +
            customer.email +
            "\n" +

            "Address: " +
            customer.address +
            "\n" +

            "PIN Code: " +
            customer.pincode;


          const whatsappURL =
            "https://wa.me/" +
            BUSINESS.whatsapp +
            "?text=" +
            encodeURIComponent(
              message
            );


          window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
          );

        }
      );

    }
  );


  /* =====================================================
     GENERATE CUSTOMER BILL
  ===================================================== */

  const billButtons =
    document.querySelectorAll(
      ".generate-bill, #generate-bill"
    );


  billButtons.forEach(
    function (button) {

      button.addEventListener(
        "click",
        function (event) {

          event.preventDefault();


          if (
            !validateCustomer()
          ) {

            return;

          }


          const bill =
            createBill();


          saveBillRecord(
            bill
          );


          localStorage.setItem(
            "lastKashurMushukhBill",
            JSON.stringify(bill)
          );


          openBillWindow(
            bill
          );

        }
      );

    }
  );


  /* =====================================================
     OPEN BILL WINDOW
  ===================================================== */

  function openBillWindow(
    bill
  ) {

    const billWindow =
      window.open(
        "",
        "_blank"
      );


    if (!billWindow) {

      alert(
        "Please allow pop-ups in your browser to generate the bill."
      );

      return;

    }


    const customer =
      bill.customer;


    const product =
      bill.product;


    billWindow.document.write(`

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>
Invoice ${bill.invoiceNumber}
-
The Kashur Mushukh
</title>

<style>

* {
  box-sizing: border-box;
}

body {

  margin: 0;

  padding: 30px;

  background: #f3f1ec;

  color: #171614;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

}

.invoice {

  max-width: 850px;

  margin: auto;

  background: white;

  padding: 45px;

  box-shadow:
    0 10px 35px
    rgba(0,0,0,.08);

}

.header {

  display: flex;

  justify-content:
    space-between;

  gap: 30px;

  padding-bottom: 30px;

  border-bottom:
    2px solid #b99a63;

}

.brand h1 {

  margin: 0;

  color: #171614;

  font-family:
    Georgia,
    serif;

  font-size: 32px;

  letter-spacing: 2px;

}

.brand p {

  margin: 8px 0 0;

  color: #777;

  font-size: 12px;

}

.invoice-info {

  text-align: right;

  font-size: 12px;

  line-height: 1.8;

}

.invoice-info strong {

  color: #b99a63;

}

.address-section {

  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 50px;

  margin-top: 35px;

}

.address-box h3 {

  margin: 0 0 10px;

  color: #b99a63;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform:
    uppercase;

}

.address-box p {

  margin: 3px 0;

  font-size: 13px;

  line-height: 1.7;

}

table {

  width: 100%;

  margin-top: 40px;

  border-collapse:
    collapse;

}

th {

  padding: 13px 10px;

  background: #171614;

  color: white;

  font-size: 11px;

  text-align: left;

}

td {

  padding: 15px 10px;

  border-bottom:
    1px solid #ddd;

  font-size: 13px;

}

.text-right {

  text-align: right;

}

.summary {

  width: 330px;

  margin:
    25px 0 0 auto;

}

.summary-row {

  display: flex;

  justify-content:
    space-between;

  padding: 8px 0;

  font-size: 13px;

}

.total {

  margin-top: 8px;

  padding-top: 15px;

  border-top:
    2px solid #b99a63;

  font-size: 18px;

  font-weight: bold;

}

.payment {

  margin-top: 35px;

  padding: 18px;

  background: #f6f3ed;

  font-size: 13px;

}

.footer {

  margin-top: 50px;

  padding-top: 20px;

  border-top:
    1px solid #ddd;

  text-align: center;

  color: #777;

  font-size: 11px;

  line-height: 1.8;

}

.print-button {

  display: block;

  margin:
    25px auto 0;

  padding:
    12px 25px;

  border: none;

  background: #b99a63;

  color: #171614;

  font-weight: bold;

  cursor: pointer;

}

@media print {

  body {

    padding: 0;

    background: white;

  }

  .invoice {

    max-width: none;

    box-shadow: none;

  }

  .print-button {

    display: none;

  }

}

@media(max-width:600px) {

  body {

    padding: 10px;

  }

  .invoice {

    padding: 25px;

  }

  .header {

    flex-direction:
      column;

  }

  .invoice-info {

    text-align: left;

  }

  .address-section {

    grid-template-columns:
      1fr;

    gap: 20px;

  }

  .summary {

    width: 100%;

  }

}

</style>

</head>

<body>

<div class="invoice">

  <div class="header">

    <div class="brand">

      <h1>
        THE KASHUR MUSHUKH
      </h1>

      <p>
        A Fragrance from Kashmir
      </p>

    </div>

    <div class="invoice-info">

      <div>
        <strong>INVOICE</strong>
      </div>

      <div>
        ${bill.invoiceNumber}
      </div>

      <div>
        Date: ${bill.date}
      </div>

      <div>
        Time: ${bill.time}
      </div>

    </div>

  </div>


  <div class="address-section">

    <div class="address-box">

      <h3>
        Seller
      </h3>

      <p>
        <strong>
          ${bill.business.name}
        </strong>
      </p>

      <p>
        ${bill.business.address}
      </p>

      <p>
        PIN:
        ${bill.business.pincode}
      </p>

      <p>
        Phone:
        ${bill.business.phone}
      </p>

      <p>
        Email:
        ${bill.business.email}
      </p>

    </div>


    <div class="address-box">

      <h3>
        Bill To
      </h3>

      <p>
        <strong>
          ${customer.name}
        </strong>
      </p>

      <p>
        ${customer.address}
      </p>

      <p>
        PIN:
        ${customer.pincode}
      </p>

      <p>
        Phone:
        ${customer.phone}
      </p>

      ${
        customer.email
          ? `<p>Email: ${customer.email}</p>`
          : ""
      }

    </div>

  </div>


  <table>

    <thead>

      <tr>

        <th>
          Product
        </th>

        <th>
          Size
        </th>

        <th>
          Qty
        </th>

        <th class="text-right">
          Price
        </th>

        <th class="text-right">
          Amount
        </th>

      </tr>

    </thead>

    <tbody>

      <tr>

        <td>
          ${product.name}
        </td>

        <td>
          ${product.size}
        </td>

        <td>
          ${product.quantity}
        </td>

        <td class="text-right">
          ${formatCurrency(product.price)}
        </td>

        <td class="text-right">
          ${formatCurrency(bill.subtotal)}
        </td>

      </tr>

    </tbody>

  </table>


  <div class="summary">

    <div class="summary-row">

      <span>
        Subtotal
      </span>

      <strong>
        ${formatCurrency(bill.subtotal)}
      </strong>

    </div>


    <div class="summary-row">

      <span>
        Shipping
      </span>

      <strong>
        ${
          bill.shipping === 0
            ? "FREE"
            : formatCurrency(
                bill.shipping
              )
        }
      </strong>

    </div>


    <div class="summary-row total">

      <span>
        Total
      </span>

      <strong>
        ${formatCurrency(bill.total)}
      </strong>

    </div>

  </div>


  <div class="payment">

    <strong>
      Payment Method:
    </strong>

    ${bill.payment}

  </div>


  <div class="footer">

    <strong>
      Thank you for choosing
      The Kashur Mushukh.
    </strong>

    <br>

    A fragrance inspired by
    the timeless soul of Kashmir.

    <br><br>

    ${bill.business.name}
    ·
    ${bill.business.phone}
    ·
    ${bill.business.email}

  </div>


  <button
    class="print-button"
    onclick="window.print()">

    PRINT / SAVE BILL

  </button>

</div>

</body>

</html>

    `);


    billWindow.document.close();

  }


  /* =====================================================
     VIEW SAVED BILL RECORDS
  ===================================================== */

  const recordsButton =
    document.getElementById(
      "view-bill-records"
    );


  if (recordsButton) {

    recordsButton.addEventListener(
      "click",
      function () {

        showBillRecords();

      }
    );

  }


  /* =====================================================
     BILL RECORDS
  ===================================================== */

  function showBillRecords() {

    const records =
      JSON.parse(
        localStorage.getItem(
          "kashurMushukhBills"
        )
      ) || [];


    if (
      records.length === 0
    ) {

      alert(
        "No bill records found on this device."
      );

      return;

    }


    const recordsWindow =
      window.open(
        "",
        "_blank"
      );


    if (!recordsWindow) {

      alert(
        "Please allow pop-ups to view bill records."
      );

      return;

    }


    let rows = "";


    records
      .slice()
      .reverse()
      .forEach(
        function (bill) {

          rows += `

          <tr>

            <td>
              ${bill.invoiceNumber}
            </td>

            <td>
              ${bill.date}
            </td>

            <td>
              ${bill.customer.name}
            </td>

            <td>
              ${bill.product.name}
            </td>

            <td>
              ${bill.payment}
            </td>

            <td>
              ${formatCurrency(
                bill.total
              )}
            </td>

          </tr>

          `;

        }
      );


    recordsWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>
Bill Records -
The Kashur Mushukh
</title>

<style>

body {

  margin: 0;

  padding: 30px;

  background: #f5f2eb;

  font-family: Arial,
    Helvetica,
    sans-serif;

  color: #171614;

}

.container {

  max-width: 1200px;

  margin: auto;

  background: white;

  padding: 35px;

}

h1 {

  font-family: Georgia,
    serif;

  font-weight: normal;

  letter-spacing: 2px;

}

.subtitle {

  color: #777;

  font-size: 13px;

}

table {

  width: 100%;

  margin-top: 30px;

  border-collapse:
    collapse;

}

th {

  padding: 12px;

  background: #171614;

  color: white;

  font-size: 11px;

  text-align: left;

}

td {

  padding: 12px;

  border-bottom:
    1px solid #ddd;

  font-size: 12px;

}

button {

  margin-top: 25px;

  padding: 12px 20px;

  border: none;

  background: #b99a63;

  cursor: pointer;

}

@media(max-width:700px) {

  body {

    padding: 10px;

  }

  .container {

    padding: 15px;

    overflow-x: auto;

  }

  table {

    min-width: 800px;

  }

}

</style>

</head>

<body>

<div class="container">

<h1>
THE KASHUR MUSHUKH
</h1>

<p class="subtitle">
Customer Bill Records
</p>

<table>

<thead>

<tr>

<th>
Invoice
</th>

<th>
Date
</th>

<th>
Customer
</th>

<th>
Product
</th>

<th>
Payment
</th>

<th>
Total
</th>

</tr>

</thead>

<tbody>

${rows}

</tbody>

</table>


<button
onclick="window.print()">

PRINT RECORDS

</button>

</div>

</body>

</html>

    `);


    recordsWindow.document.close();

  }


  /* =====================================================
     DELETE ALL BILL RECORDS
  ===================================================== */

  const deleteRecordsButton =
    document.getElementById(
      "delete-bill-records"
    );


  if (deleteRecordsButton) {

    deleteRecordsButton.addEventListener(
      "click",
      function () {

        const confirmation =
          confirm(
            "Are you sure you want to delete all saved bill records from this browser?"
          );


        if (!confirmation) {
          return;
        }


        localStorage.removeItem(
          "kashurMushukhBills"
        );


        alert(
          "All bill records have been deleted."
        );

      }
    );

  }


  /* =====================================================
     SMOOTH SCROLL
  ===================================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      function (link) {

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

      }
    );


  /* =====================================================
     REVEAL ANIMATIONS
  ===================================================== */

  const revealElements =
    document.querySelectorAll(

      ".intro-grid > div, " +

      ".story-content, " +

      ".story-visual, " +

      ".story-image, " +

      ".note-card, " +

      ".product-card, " +

      ".order-box, " +

      ".order-intro, " +

      ".service-card, " +

      ".contact-container"

    );


  if (
    "IntersectionObserver"
    in window
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


  /* =====================================================
     CURRENT YEAR
  ===================================================== */

  const year =
    document.getElementById(
      "year"
    );


  if (year) {

    year.textContent =
      new Date().getFullYear();

  }


  /* =====================================================
     INITIAL PAYMENT STATE
  ===================================================== */

  if (
    paymentButtons.length > 0
  ) {

    paymentButtons[0].classList.add(
      "active"
    );

  }


  if (upiDetails) {

    upiDetails.style.display =
      "block";

  }


  if (codDetails) {

    codDetails.style.display =
      "none";

  }


  /* =====================================================
     BRAND CONSOLE MESSAGE
  ===================================================== */

  console.log(
    "The Kashur Mushukh — A Fragrance from Kashmir."
  );

  console.log(
    "Order system loaded successfully."
  );

});
