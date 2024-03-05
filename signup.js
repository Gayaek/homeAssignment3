document.getElementById("moveToLogin").addEventListener("click", function () {
  window.location.href = "login.html";
});

let count = 22;

let newArrVisitors = [...visitors];
if (localStorage.getItem("visitors")) {
  visitors = JSON.parse(localStorage.getItem("visitors"));
}
function createNewVisitor(event) {
  event.preventDefault();
  const newVisitor = document.getElementById("user_name").value;
  addVisitor(newVisitor);
}

const validateFormInputs = (name) => {
  return name.trim() === "";
};

const visitorExists = (name) => {
  return visitors.some((visitor) => visitor.name === name);
};

const addVisitor = (name) => {
  if (!visitorExists(name) && !validateFormInputs(name)) {
    const newUser = {
      name: name,
      coins: 50,
      visitorImg: `./person${count}.png`,
      animalsVisited: [],
      animalsFed: [],
      favoriteAnimal: {},
      countMap: [],
    };
    visitors.push(newUser);
    localStorage.setItem("visitors", JSON.stringify(visitors));
    alert("hello," + name);
    window.location.href = "./login.html";
    clearSearchBox();
  } else {
    if (visitorExists(name)) {
      alert("visitor allready exsists! try new name...");
      clearSearchBox();
    } else {
      if (validateFormInputs(name)) {
        alert("name is empty!");
      }
    }
  }
};

const clearSearchBox = () => {
  const input = document.getElementById("user_name");
  input.value = "";
  const imgInput = document.getElementById("imageInput");
  imgInput.value = "";
};

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
