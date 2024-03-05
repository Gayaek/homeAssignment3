let visitorsToView = [...visitors];
let animalsToView = [...animals];
let animal = {};

const dialogEaten = document.querySelector("#eaten-dialog");
const dialogRunAway = document.querySelector("#runAway-dialog");
if (localStorage.getItem("chosenAnimal")) {
  animal = JSON.parse(localStorage.getItem("chosenAnimal"));
}
let relatedAnimals = [];

function renderAnimal(event) {
  event.preventDefault();
  const animalImg = document.getElementById("animal-img");
  animalImg.src = animal.animalImage;
  const animalName = document.getElementById("name");
  animalName.innerHTML = animal.name;
  const animalWeight = document.getElementById("weight");
  animalWeight.innerHTML = "weight:" + " " + animal.weight + "kg";
  const animalHeight = document.getElementById("height");
  animalHeight.innerHTML = "height:" + " " + animal.height + "m";
  const animalColor = document.getElementById("color");
  animalColor.innerHTML = "color:" + " " + animal.color;
  const animalHabitat = document.getElementById("habitat");
  animalHabitat.innerHTML = "habitat" + " " + animal.habitat;
  const animalIsPredator = document.getElementById("isPredator");
  animalIsPredator.innerHTML = "predator?" + " " + animal.isPredator;
  renderRelatedAnimals();
}

const getRelatedAnimalHTMLCard = (reAnimal) => {
  const template = `
        <div class="card" style="min-height: 360px;" >
        <img class="card-img-top" src="${reAnimal.animalImage}" alt="${reAnimal.name}" width="150px" height="150px" />
          <div class="card-body">
          
            <p id="card-name" class="card-text">${reAnimal.name}</p>
          </div>
        </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "animal-related-card";
  wrapper.innerHTML = template;
  return wrapper;
};

function renderRelatedAnimals() {
  for (let i = 0; i < animals.length; i++) {
    if (isRelated(animals[i])) {
      relatedAnimals.push(animals[i]);
      localStorage.setItem("relatedAnimals", JSON.stringify(relatedAnimals));
    }
  }
  const relatedCards = relatedAnimals.map(getRelatedAnimalHTMLCard);
  const relatedPlaceholder = document.getElementById("related-animals");
  relatedPlaceholder.innerHTML = "";

  if (!relatedCards.length) {
    relatedPlaceholder.appendChild(getEmptyAnimalCard());
  }
  relatedPlaceholder.append(...relatedCards);
}

const getEmptyAnimalCard = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `  
  <h1>No Animals Related</h1>
  <p>no animals with the same habitat</p>
  `;
  templateWrapper.innerHTML = template;
  return templateWrapper;
};

const isRelated = (reAnimal) => {
  if (reAnimal.habitat === animal.habitat && reAnimal.name !== animal.name) {
    return true;
  }
  return false;
};

function feedAnimal(event) {
  event.preventDefault();
  const visitorFeeding = JSON.parse(localStorage.getItem("visitor"));
  const animalFed = JSON.parse(localStorage.getItem("chosenAnimal"));
  if (visitorFeeding.coins <= 0) {
    if (animalFed.isPredator === true) {
      visitorGotEaten(visitorFeeding);
    } else {
      animalEscaped(animalFed);
    }
  } else {
    let visitorsArray = JSON.parse(localStorage.getItem("visitors"));
    let visitorToUpdate = visitorsArray.find(
      (visitor) => visitor.name === visitorFeeding.name
    );
    visitorToUpdate.coins -= 2;
    visitorToUpdate.animalsFed.push(animalFed);
    localStorage.setItem("visitor", JSON.stringify(visitorToUpdate));
    let newVisitorsArray = visitorsArray.filter(
      (visitor) => visitor.name !== visitorToUpdate.name
    );
    newVisitorsArray.push(visitorToUpdate);
    localStorage.setItem("visitors", JSON.stringify(newVisitorsArray));
    window.location.reload();
  }
}

function visitorGotEaten() {
  let visitorToMove = JSON.parse(localStorage.getItem("visitor"));
  visitorsToView = visitorsToView.filter((v) => v.name !== visitorToMove.name);
  localStorage.setItem("visitors", JSON.stringify(visitorsToView));
  handleVisitorGotEaten();
}

function animalEscaped() {
  let animalToMove = JSON.parse(localStorage.getItem("chosenAnimal"));
  animalsToView = animalsToView.filter((a) => a.name !== animalToMove.name);
  localStorage.setItem("animals", JSON.stringify(animalsToView));
  handleAnimalRunAway();
}

const getCloseEatenMassageHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "go back to login!";
  closeButton.addEventListener("click", () => {
    window.location.href = "./login.html";
    dialogEaten.close();
  });
  return closeButton;
};

const handleVisitorGotEaten = () => {
  dialogEaten.append(getCloseEatenMassageHTMLButton());
  dialogEaten.showModal();
};

const getCloseRunAwayMassageHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "go back to zoo!";
  closeButton.addEventListener("click", () => {
    window.location.href = "./zoo.html";
    dialogRunAway.close();
  });
  return closeButton;
};

const handleAnimalRunAway = () => {
  dialogRunAway.append(getCloseRunAwayMassageHTMLButton());
  dialogRunAway.showModal();
};

const getDashBoardHTMLButton = () => {
  const dashBoardButton = document.createElement("button");
  dashBoardButton.innerText = "dashboard";
  dashBoardButton.className = "btnim";
  dashBoardButton.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
  });
  return dashBoardButton;
};

const feedAnimalBtn = document.getElementById("feed-animal");
if (feedAnimalBtn) {
  feedAnimalBtn.addEventListener("click", feedAnimal);
}

const dashBoardBTNinAnimal = document.getElementById("DashBoardBTN");
dashBoardBTNinAnimal.appendChild(getDashBoardHTMLButton());

window.addEventListener("load", renderAnimal);
