let animalsForView = [...animals];
let filters = {};

const getClearBTN = () => {
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.id = "clear-button";
  clearBtn.innerText = "clear all";
  clearBtn.onclick = () => {
    animalsForView = [...animals];
    clearInputs();
    renderAvailableAnimals();
  };
  return clearBtn;
};

const clearBTNFilter = document.getElementById("btnClear");
clearBTNFilter.appendChild(getClearBTN());

const clearInputs = () => {
  for (let i = 0; i < form.elements.length; i++) {
    const element = form.elements[i];
    if (
      (element.tagName === "INPUT" || element.tagName === "SELECT") &&
      element.type !== "submit" &&
      element.type !== "radio"
    ) {
      element.value = "";
    } else if (element.tagName === "INPUT" && element.type === "radio") {
      element.checked = false;
    }
  }
  const clearFilter = {
    name: "",
    color: "",
    habitat: "",
    height: 0,
    weight: 0,
    isPredator: "",
  };
  localStorage.setItem("existingFilters", JSON.stringify(clearFilter));
};

const getAnimalHTMLCard = (animal) => {
  const template = `
            <div class="card" style="min-height: 360px;" >
            <img class="card-img-top" src="${animal.animalImage}" alt="${animal.name}"/>
              <div class="card-body">
              
                <p id="card-name" class="card-text">${animal.name}</p>
              </div>
            </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "animal-card";
  wrapper.innerHTML = template;
  wrapper.addEventListener("click", () => visitAnimal(animal));
  return wrapper;
};

const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
          <h2>No Animals Found</h2>
          <p>We're sorry, but no animals match your search or filter criteria.</p>
          <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>
          `;
  templateWrapper.innerHTML = template;
  alert("change your Filters!");
  return templateWrapper;
};

const filterByColor = () => {
  if (filters.color !== "all") {
    animalsForView = animalsForView.filter((animal) =>
      animal.color.includes(filters.color)
    );
  }
};

const filterByWeight = () => {
  animalsForView = animalsForView.filter(
    (animal) => animal.weight > filters.weight
  );
};

const filterByHeight = () => {
  animalsForView = animalsForView.filter(
    (animal) => animal.height > filters.height
  );
};

const filterByHabitat = () => {
  animalsForView = animalsForView.filter((animal) =>
    animal.habitat.includes(filters.habitat)
  );
};

const filterByIsPredator = () => {
  if (filters.isPredator !== "") {
    animalsForView = animalsForView.filter(
      (animal) => animal.isPredator === filters.isPredator
    );
  }
};

const filterByName = () => {
  animalsForView = animalsForView.filter((animal) =>
    animal.name.toLowerCase().includes(filters.name.toLowerCase())
  );
};

function visitAnimal(animal) {
  const existingAnimalString = localStorage.getItem("chosenAnimal");
  const existingAnimal = existingAnimalString
    ? JSON.parse(existingAnimalString)
    : {};
  existingAnimal.name = animal.name;
  existingAnimal.weight = animal.weight;
  existingAnimal.height = animal.height;
  existingAnimal.color = animal.color;
  existingAnimal.habitat = animal.habitat;
  existingAnimal.isPredator = animal.isPredator;
  existingAnimal.animalImage = animal.animalImage;

  localStorage.setItem("chosenAnimal", JSON.stringify(existingAnimal));

  const visitorVisiting = JSON.parse(localStorage.getItem("visitor"));
  const animalVisiting = JSON.parse(localStorage.getItem("chosenAnimal"));
  let visitorsArr = JSON.parse(localStorage.getItem("visitors"));
  let updateVisitor = visitorsArr.find(
    (visitor) => visitor.name === visitorVisiting.name
  );
  updateVisitor.animalsVisited.push(animalVisiting);
  localStorage.setItem("visitor", JSON.stringify(updateVisitor));
  let newVisitorsArray = visitorsArr.filter(
    (visitor) => visitor.name !== updateVisitor.name
  );
  newVisitorsArray.push(updateVisitor);
  localStorage.setItem("visitors", JSON.stringify(newVisitorsArray));

  window.location.href = "./animal.html";
}

const setFilter = (event) => {
  event.preventDefault();
  const FilterAnimalName = document.getElementById("AnimalName").value;
  const filterWeight = document.getElementById("weight").value;
  const filterHeight = document.getElementById("height").value;
  const filterColor = document.getElementById("color").value;
  const filterLandHabitat = document.getElementById("land").checked;
  const filterSeaHabitat = document.getElementById("sea").checked;
  const filterIsPredator = document.getElementById("predator").checked;
  const filterIsNotPredator = document.getElementById("Notpredator").checked;

  let color = "";
  let name = "";
  let weight = 0;
  let height = 0;
  let habitat = "";
  let isPredator = null;
  if (filterColor === "brown") {
    color = "brown";
  } else if (filterColor === "grey") {
    color = "grey";
  }
  if (FilterAnimalName) {
    name = FilterAnimalName;
  }
  if (filterWeight) {
    weight = filterWeight;
  }
  if (filterHeight) {
    height = filterHeight;
  }

  if (!filterLandHabitat && !filterSeaHabitat) {
    habitat = "";
  } else if (filterLandHabitat) {
    habitat = "land";
  } else {
    habitat = "sea";
  }
  if (!filterIsPredator && !filterIsNotPredator) {
    isPredator = "";
  } else if (filterIsPredator) {
    isPredator = true;
  } else {
    isPredator = false;
  }

  filters = {
    name: name,
    weight: weight,
    height: height,
    color: color,
    habitat: habitat,
    isPredator: isPredator,
  };

  localStorage.setItem("existingFilters", JSON.stringify(filters));
  filterByColor();
  filterByHabitat();
  filterByHeight();
  filterByIsPredator();
  filterByName();
  filterByWeight();
  renderAvailableAnimals();
};

const renderAvailableAnimals = () => {
  const animalCards = animalsForView.map(getAnimalHTMLCard);
  const animalsPlaceholder = document.getElementById("animal-cards");
  animalsPlaceholder.innerHTML = "";
  if (!animalCards.length) {
    animalsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  }
  animalsPlaceholder.append(...animalCards);
};

function saveExsistingFilters(event) {
  event.preventDefault();
  filters = JSON.parse(localStorage.getItem("existingFilters"));
  if (filters) {
    if (filters.isPredator) {
      document.getElementById("predator").checked = true;
    } else if (filters.isPredator === false) {
      document.getElementById("Notpredator").checked = true;
    }
    if (filters.habitat === "land") {
      document.getElementById("land").checked = true;
    } else if (filters.habitat === "sea") {
      document.getElementById("sea").checked = true;
    }
    document.getElementById("weight").value = filters.weight;
    document.getElementById("height").value = filters.height;
    document.getElementById("color").value = filters.color;
    document.getElementById("AnimalName").value = filters.name;
  }
  filterByColor();
  filterByHabitat();
  filterByHeight();
  filterByIsPredator();
  filterByName();
  filterByWeight();
  renderAvailableAnimals();
}

window.addEventListener("load", saveExsistingFilters);
window.addEventListener("load", renderAvailableAnimals);
const form = document.getElementById("animal-filter-form");
if (form) {
  form.addEventListener("change", () => (animalsForView = [...animals]));
  form.addEventListener("input", () => (animalsForView = [...animals]));
  form.addEventListener("select", () => (animalsForView = [...animals]));
  form.addEventListener("submit", setFilter);
}
