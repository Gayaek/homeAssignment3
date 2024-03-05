const visitorsFavoriteString = localStorage.getItem("visitor");
const visitorsFavorite = JSON.parse(visitorsFavoriteString);

function showVisitedAnimals(event) {
  event.preventDefault();
  renderVisitedAnimals();
}
function showFeededAnimals(event) {
  event.preventDefault();
  renderFedAnimals();
}

function showFavoriteAnimal(event) {
  event.preventDefault();

  visitorsFavorite.countMap = [];

  visitorsFavorite.animalsVisited.forEach((animalV) => {
    if (
      visitorsFavorite.countMap.some((animalM) => animalM.name === animalV.name)
    ) {
      let updateCount = visitorsFavorite.countMap.find(
        (animalF) => animalF.name === animalV.name
      );
      updateCount.count += 1;
    } else {
      animalElement = {
        name: animalV.name,
        animalImage: animalV.animalImage,
        count: 1,
      };
      visitorsFavorite.countMap.push(animalElement);
    }
    localStorage.setItem("visitor", JSON.stringify(visitorsFavorite));
  });

  let maxVisited = 0;
  for (let i = 0; i < visitorsFavorite.countMap.length; i++) {
    if (visitorsFavorite.countMap[i].count > maxVisited) {
      maxVisited = visitorsFavorite.countMap[i].count;
      visitorsFavorite.favoriteAnimal = {
        name: visitorsFavorite.countMap[i].name,
        animalImage: visitorsFavorite.countMap[i].animalImage,
      };
    }
  }
  localStorage.setItem("visitor", JSON.stringify(visitorsFavorite));

  let visitorsList = JSON.parse(localStorage.getItem("visitors"));

  let visitorVisitUpdate = visitorsList.find(
    (visitor) => visitor.name === visitorsFavorite.name
  );

  let newVisitorsList = visitorsList.filter(
    (visitor) => visitor.name !== visitorVisitUpdate.name
  );

  newVisitorsList.push(visitorsFavorite);

  localStorage.setItem("visitors", JSON.stringify(newVisitorsList));

  renderDashBoard();
}

const renderDashBoard = () => {
  const animalFavoritePlaceHolder = document.getElementById("favorite-animal");
  if (visitorsFavorite.favoriteAnimal.name === undefined) {
    animalFavoritePlaceHolder.appendChild(getEmptyFavoriteCardsHTMLTemplate());
  } else {
    animalFavoritePlaceHolder.appendChild(getFavoriteAnimalHTMLCard(visitor));
  }
};

let visitedArr = [...visitorsFavorite.animalsVisited];
let withoutDupArr = Array.from(
  new Set(visitedArr.map((animal) => animal.name))
).map((name) => {
  return visitedArr.find((animal) => animal.name === name);
});

let fedArr = [...visitorsFavorite.animalsFed];
let withoutDupfedArr = Array.from(
  new Set(fedArr.map((animal) => animal.name))
).map((name) => {
  return fedArr.find((animal) => animal.name === name);
});

const getVisitedAndFedAnimalHTMLCard = (animal) => {
  const favTemplate = `
        <div class="card"  >
        <div id="animal-img-card-top">
        <img class="card-img-top" src="${animal.animalImage}" alt="${animal.name}" width="150px" height="150px" />
        </div>
          <div class="card-body">
            <p id="card-name" class="card-text">${animal.name}</p>
          </div>
        </div>`;

  const favWrapper = document.createElement("div");
  favWrapper.className = "animal-visit-fed-card";
  favWrapper.innerHTML = favTemplate;
  return favWrapper;
};

const getEmptyFedCardsHTMLTemplate = () => {
  const noFeededWrapper = document.createElement("div");
  noFeededWrapper.className = "empty-fed";

  const template = `
      <p>You didn't feed any animal!</p>
      `;
  noFeededWrapper.innerHTML = template;
  return noFeededWrapper;
};

const renderFedAnimals = () => {
  const FedAnimalsCards = withoutDupfedArr.map(getVisitedAndFedAnimalHTMLCard);
  const FedAnimalsPlaceholder = document.getElementById("feeded-animals");

  if (!FedAnimalsCards.length) {
    FedAnimalsPlaceholder.appendChild(getEmptyFedCardsHTMLTemplate());
  }
  FedAnimalsPlaceholder.append(...FedAnimalsCards);
};

const getEmptyVisitedCardsHTMLTemplate = () => {
  const noVisitedWrapper = document.createElement("div");
  noVisitedWrapper.className = "empty-visited";

  const template = `
      <p>No visited animal!</p>
      `;
  noVisitedWrapper.innerHTML = template;
  return noVisitedWrapper;
};

const renderVisitedAnimals = () => {
  const visitedAnimalsCards = withoutDupArr.map(getVisitedAndFedAnimalHTMLCard);
  const visitedAnimalsPlaceholder = document.getElementById("visited-animals");

  if (!visitedAnimalsCards.length) {
    visitedAnimalsPlaceholder.appendChild(getEmptyVisitedCardsHTMLTemplate());
  }
  visitedAnimalsPlaceholder.append(...visitedAnimalsCards);
};

const getFavoriteAnimalHTMLCard = () => {
  const favTemplate = `
        <div class="card" >
       
        <div id="fav-animal-img">
        <img class="card-img-top" src="${visitorsFavorite.favoriteAnimal.animalImage}" alt="${visitorsFavorite.favoriteAnimal.name}" width="150px" height="150px" />
        </div>
          <div class="card-body">
          
            <p id="card-name" class="card-text">${visitorsFavorite.favoriteAnimal.name}</p>
          </div>
        </div>`;

  const favWrapper = document.createElement("div");
  favWrapper.className = "animal-favorite-card";
  favWrapper.innerHTML = favTemplate;
  return favWrapper;
};

const getEmptyFavoriteCardsHTMLTemplate = () => {
  const noFavoriteWrapper = document.createElement("div");
  noFavoriteWrapper.className = "empty-favorite";

  const template = `

      <p>No favorite animal!</p>
      `;
  noFavoriteWrapper.innerHTML = template;
  return noFavoriteWrapper;
};

window.addEventListener("load", showFavoriteAnimal);
window.addEventListener("load", showVisitedAnimals);
window.addEventListener("load", showFeededAnimals);
