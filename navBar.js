const visitorsInNavBarString = localStorage.getItem("visitor");
const visitorsInNavBar = JSON.parse(visitorsInNavBarString);

const getVisitorOnNavBar = (event) => {
  event.preventDefault();
  const detTemplate = `
    <div class="currentPlayer" style="height:50px;" >
            <div class="card-details">
            
              <p id="card-current-name" class="card-text">player: ${visitorsInNavBar.name} &nbsp; &nbsp; coins: ${visitorsInNavBar.coins}</p>
            </div>
          </div>`;

  const detWrapper = document.createElement("div");
  detWrapper.className = "animal-visit-fed-card";
  detWrapper.innerHTML = detTemplate;
  const visitorDetailsPlaceholder = document.getElementById("visitor-details");
  visitorDetailsPlaceholder.appendChild(detWrapper);
};

const dialogChange = document.querySelector("#changeUser-dialog");

const getYesChangeHTMLButton = (selectedVisitor) => {
  const yesButton = document.createElement("button");
  yesButton.innerText = "YES";
  yesButton.addEventListener("click", () => {
    changeUser(selectedVisitor);
    dialogChange.close();

    window.location.reload();
  });
  return yesButton;
};

const getNoChangeHTMLButton = () => {
  const noButton = document.createElement("button");
  noButton.innerText = "NO";
  noButton.addEventListener("click", () => {
    dialogChange.close();
  });
  return noButton;
};

const getInnerHtmlChangeUser = () => {
  const detTemplate = `
    <div >
              <p id="changeUser">Are you sure that you want to change user?</p>
          </div>`;

  const detWrapper = document.createElement("div");
  detWrapper.className = "animal-visit-fed-card";
  detWrapper.innerHTML = detTemplate;
  return detWrapper;
};

const handleVisitorChange = (selectedVisitor) => {
  dialogChange.innerHTML = "";
  dialogChange.append(
    getInnerHtmlChangeUser(),
    getYesChangeHTMLButton(selectedVisitor),
    getNoChangeHTMLButton()
  );
  dialogChange.showModal();
};

const getVisitorsDropDown = (event) => {
  event.preventDefault();
  const visitorsToNavBar = JSON.parse(localStorage.getItem("visitors")) || [];

  const selectContainer = document.getElementById("visitorsDropDown");
  const selectElement = document.createElement("select");

  const defaultOption = document.createElement("option");
  defaultOption.value = 0;
  defaultOption.text = "Visitors";
  selectElement.appendChild(defaultOption);

  visitorsToNavBar.forEach((visitor, index) => {
    const optionElement = document.createElement("option");
    optionElement.value = index;
    optionElement.text = visitor.name;
    selectElement.appendChild(optionElement);
  });
  selectContainer.appendChild(selectElement);

  selectElement.addEventListener("change", handleSelectVisitor);
};

function handleSelectVisitor(selectedVisitor) {
  selectedVisitor = this.value;
  if (selectedVisitor !== 0) {
    changeUser(selectedVisitor);
  }
}

const createResetBTN = () => {
  const resetBTN = document.getElementById("resetBTN");
  resetBTN.className = "btnim";
  resetBTN.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "./signup.html";
  });
};

const getLogoutBTN = () => {
  const logoutBTN = document.getElementById("logout");
  logoutBTN.className = "btnim";
  logoutBTN.addEventListener("click", function () {
    logout();
  });
};

const getGoBTNtoZoo = () => {
  const zooBTN = document.getElementById("goToZoo");
  if (zooBTN) {
    zooBTN.className = "btnim";
    zooBTN.addEventListener("click", function () {
      window.location.href = "./zoo.html";
    });
  }
};

const changeUser = (selectedVisitor) => {
  const visitorsArr = JSON.parse(localStorage.getItem("visitors")) || [];
  if (visitorsArr[selectedVisitor]) {
    const newVisitor = visitorsArr[selectedVisitor];
    localStorage.setItem("visitor", JSON.stringify(newVisitor));
    handleVisitorChange(selectedVisitor);
  }
};

window.addEventListener("load", getVisitorOnNavBar);
window.addEventListener("load", getVisitorsDropDown);
window.addEventListener("load", createResetBTN);
window.addEventListener("load", getLogoutBTN);
window.addEventListener("load", getGoBTNtoZoo);
