async function loadXMLDoc(filename) {
  const response = await fetch(filename);
  const xmlText = await response.text();
  const parser = new DOMParser();
  return parser.parseFromString(xmlText, "application/xml");
}

async function displayMenu() {
  const xml = await loadXMLDoc("menu.xml");
  const mealsContainer = document.getElementById("meals");
  const beveragesContainer = document.getElementById("beverages");
  const otherBeveragesContainer = document.getElementById("other-beverages");

  const meals = xml
    .getElementsByTagName("meals")[0]
    .getElementsByTagName("item");
  for (let meal of meals) {
    const name = meal.getElementsByTagName("name")[0].textContent;
    const price = meal.getElementsByTagName("price")[0].textContent;
    const description = meal.getElementsByTagName("description")[0].textContent;
    const image = meal.getElementsByTagName("image")[0].textContent;

    mealsContainer.innerHTML += `
            <div class="menu-item">
                <img src="${image}" alt="${name}" class="menu-image">
                <h3>${name} - ${price}</h3>
                <p>${description}</p>
            </div>
        `;
  }

  const coffeeSizes = xml
    .getElementsByTagName("coffee")[0]
    .getElementsByTagName("size");
  for (let size of coffeeSizes) {
    const name = size.getElementsByTagName("name")[0].textContent;
    const price = size.getElementsByTagName("price")[0].textContent;
    const description =
      size.getElementsByTagName("description")?.[0]?.textContent || "";
    const image =
      size.getElementsByTagName("image")?.[0]?.textContent ||
      "images/default-beverage.jpg";

    beveragesContainer.innerHTML += `
            <div class="menu-item">
                <img src="${image}" alt="${name}" class="menu-image">
                <h4>${name} - ${price}</h4>
                <p>${description}</p>
            </div>
        `;
  }

  const otherBeverages = xml
    .getElementsByTagName("other")[0]
    .getElementsByTagName("item");
  for (let beverage of otherBeverages) {
    const name = beverage.getElementsByTagName("name")[0].textContent;
    const price = beverage.getElementsByTagName("price")[0].textContent;
    const image =
      beverage.getElementsByTagName("image")?.[0]?.textContent ||
      "images/default-beverage.jpg";

    otherBeveragesContainer.innerHTML += `
            <div class="menu-item">
                <img src="${image}" alt="${name}" class="menu-image">
                <h4>${name} - ${price}</h4>
            </div>
        `;
  }
}

document.addEventListener("DOMContentLoaded", displayMenu);
