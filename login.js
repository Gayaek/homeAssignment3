let visitorsForView = [...visitors];
const dialog = document.querySelector("#visitor-dialog");

const chooseCurrentUser = (visitor) => {
  const existingDataString = localStorage.getItem("visitor");
  const existingData = existingDataString ? JSON.parse(existingDataString) : {};
  existingData.name = visitor.name;
  existingData.coins = visitor.coins;
  localStorage.setItem("visitor", JSON.stringify(existingData));
};

const getVisitorHTMLCard = (visitor) => {
  const template = `
        <div class="card" >
        <img class="card-img-top" src="${visitor.visitorImg}" alt="${visitor.name}"/>
          <div class="card-body">
            <p id="card-name" class="card-text">${visitor.name}</p>
            <p id="card-coins" class="card-text">${visitor.coins}</p>
          </div>
        </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = template;
  wrapper.addEventListener("click", () => handleVisitorClick(visitor));
  return wrapper;
};

const getChosenHTMLButton = (visitor) => {
  const chooseButton = document.createElement("button");
  chooseButton.innerText = "choose player";
  chooseButton.id = "chooseBtn";
  chooseButton.addEventListener("click", () => {
    chooseCurrentUser(visitor);
    window.location.href = "./zoo.html";
    dialog.close();
  });
  return chooseButton;
};

const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  dialog.append(getVisitorHTMLCard(visitor), getChosenHTMLButton(visitor));
  dialog.showModal();
};

const getSearchBox = () => {
  const queryInput = document.createElement("input");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search Player";
  queryInput.className = "form-control my-4";
  queryInput.oninput = (e) => {
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderVisitors();
  };
  return queryInput;
};

const getSearchIcon = () => {
  const searchIcon = document.createElement("img");
  searchIcon.id = "search-icon";
  searchIcon.src = "https://img.icons8.com/?size=48&id=12773&format=png";
  return searchIcon;
};

const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
      <h2>No Visitors Found</h2>
      <p>We're sorry, but no visitors match your search or filter criteria.</p>
      <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>
      `;
  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return templateWrapper;
};

const clearSearchBox = () => {
  const input = document.getElementById("query-input");
  input.value = "";
  visitorsForView = [...visitors];
  renderVisitors();
};

const renderVisitors = () => {
  const visitorCards = visitorsForView.map(getVisitorHTMLCard);
  const visitorsPlaceholder = document.getElementById("placeholder");
  visitorsPlaceholder.innerHTML = "";

  if (!visitorCards.length) {
    visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  }
  visitorsPlaceholder.append(...visitorCards);
};

function loginAsVisitor() {
  chooseCurrentUser();
}

document.body.insertAdjacentElement("afterbegin", getSearchBox());
document.body.insertAdjacentElement("afterbegin", getSearchIcon());
window.addEventListener("load", renderVisitors);
