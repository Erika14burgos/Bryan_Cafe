document
  .getElementById("enquiryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.getElementById("confirmationMessage").style.display = "block";
  });

fetch("branches.xml")
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");
    const branches = xmlDoc.getElementsByTagName("branch");

    let branchesHTML = "";
    for (let branch of branches) {
      const address = branch.getElementsByTagName("address")[0].textContent;
      const contact = branch.getElementsByTagName("contact")[0].textContent;
      const openingHours =
        branch.getElementsByTagName("openingHours")[0].textContent;
      const googleMapsLink =
        branch.getElementsByTagName("googleMapsLink")[0].textContent;

      branchesHTML += `
              <div class="branch">
                  <p><strong>Address:</strong> ${address}</p>
                  <p><strong>Contact:</strong> ${contact}</p>
                  <p><strong>Opening Hours:</strong> ${openingHours}</p>
                  <a href="${googleMapsLink}" target="_blank">View on Google Maps</a>
              </div>
          `;
    }
    document.querySelector(".branches-section").innerHTML = branchesHTML;
  })
  .catch((error) => console.error("Error loading XML:", error));

document.addEventListener("DOMContentLoaded", function () {
  const currentYear = new Date().getFullYear();
  document.getElementById(
    "footerText"
  ).textContent = `©${currentYear} Bryan’s Café`;
});
