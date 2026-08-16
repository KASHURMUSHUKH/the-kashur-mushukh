// ===== THE KASHUR MUSHUKH — SIMPLE SETTINGS =====
// Put your business WhatsApp number here, including country code.
// Example for India: 919876543210 (do not use + or spaces).
const WHATSAPP_NUMBER = "917889420904";

// Optional: replace with your real Instagram URL.
const INSTAGRAM_URL = "https://instagram.com/";

const message = encodeURIComponent(
  "Hello The Kashur Mushukh, I would like to know more about the signature fragrance and place an order."
);

const wa = document.getElementById("whatsappOrder");
wa.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

const instagram = document.getElementById("instagram");
instagram.href = INSTAGRAM_URL;
instagram.target = "_blank";
instagram.rel = "noopener";

document.getElementById("year").textContent = new Date().getFullYear();

const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});
