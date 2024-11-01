document.addEventListener("DOMContentLoaded", () => {
  const footerText = document.getElementById("footer-text");
  const currentYear = new Date().getFullYear();
  footerText.textContent = `@${currentYear} Bryan's Café`;
});
