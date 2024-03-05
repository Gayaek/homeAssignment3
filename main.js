// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    coins: 50,
    visitorImg: "person1.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Emily Johnson",
    coins: 50,
    visitorImg: "person2.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Michael Williams",
    coins: 50,
    visitorImg: "person3.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Jessica Brown",
    coins: 50,
    visitorImg: "person4.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Christopher Jones",
    coins: 50,
    visitorImg: "person5.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Ashley Davis",
    coins: 50,
    visitorImg: "person6.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Matthew Miller",
    coins: 50,
    visitorImg: "person7.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    visitorImg: "person8.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "David Moore",
    coins: 50,
    visitorImg: "person9.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    visitorImg: "person10.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "James Anderson",
    coins: 50,
    visitorImg: "person11.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    visitorImg: "person12.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Robert Jackson",
    coins: 50,
    visitorImg: "person13.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Elizabeth White",
    coins: 50,
    visitorImg: "person14.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Daniel Harris",
    coins: 50,
    visitorImg: "person15.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Melissa Martin",
    coins: 50,
    visitorImg: "person16.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "William Thompson",
    coins: 50,
    visitorImg: "person17.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Linda Garcia",
    coins: 50,
    visitorImg: "person18.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    visitorImg: "person19.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
  {
    name: "Karen Robinson",
    coins: 50,
    visitorImg: "person20.png",
    animalsVisited: [],
    animalsFed: [],
    favoriteAnimal: {},
    countMap: [],
  },
];

let animalImage = document.createElement("img");

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "lion.png",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    animalImage: "elephant.png",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "giraffe.png",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "tiger.png",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "monkey.png",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "kangaroo.png",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    animalImage: "pinguin.png",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "zebra.png",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    animalImage: "cheetah.png",
  },
];

function displayAnimalDetails(animal) {
  let imgElement = document.createElement("img");
  imgElement.src = animal.animalImage;
  document.body.appendChild(imgElement);
}

let visitor = {
  name: "",
  coins: 0,
  visitorImg: "",
  animalsVisited: [],
  animalsFed: [],
  favoriteAnimal: {},
  countMap: [],
};

let chosenAnimal = {};

let animalElement = { name: "", animalImage: "", count: 0 };

// let newUser = {
//   name: "",
//   coins: 0,
//   visitorImg: "",
//   animalsVisited: [],
//   animalsFed: [],
//   favoriteAnimal: {},
//   countMap: [],
// };

let existingFilters = {
  name: "",
  isPredator: "",
  weight: "",
  height: "",
  habitat: "",
  color: "",
};

function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

function logout() {
  let myVisitor = JSON.parse(localStorage.getItem("visitor"));
  myVisitor.name = "";
  myVisitor.coins = 0;
  myVisitor.visitorImg = "";
  myVisitor.animalsVisited = [];
  myVisitor.animalFed = [];
  myVisitor.favoriteAnimal = {};
  myVisitor.countMap = [];
  localStorage.setItem("visitor", JSON.stringify(myVisitor));
  window.location.href = "./login.html";
}
