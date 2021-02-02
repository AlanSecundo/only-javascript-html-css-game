let isVisible = false;
let cards = [
  {
    id: "A1",
    img: "./assets/rick.png",
  },
  {
    id: "A2",
    img: "./assets/rick.png",
  },
  {
    id: "B1",
    img: "./assets/pickle-rick.png",
  },
  {
    id: "B2",
    img: "./assets/pickle-rick.png",
  },
  {
    id: "C1",
    img: "./assets/morty-fake.png",
  },
  {
    id: "C2",
    img: "./assets/morty-fake.png",
  },
  {
    id: "D1",
    img: "./assets/morty.png",
  },
  {
    id: "D2",
    img: "./assets/morty.png",
  },
  {
    id: "E1",
    img: "./assets/dog.png",
  },
  {
    id: "E2",
    img: "./assets/dog.png",
  },
  {
    id: "F1",
    img: "./assets/sir.png",
  },
  {
    id: "F2",
    img: "./assets/sir.png",
  },
];
let answer = "";
let points = 0;
let moves = 0;

const colorMatch = "#12b0c8";

function flip(id) {
  var flip = document.getElementById(id);
  flip.classList.toggle("is-flipped");
}

function finishGame() {
  return points === cards.length / 2;
}

function incrementMove() {
  moves = moves + 1;
  document.getElementById("moves").innerHTML = moves;
}

function changeVisibility(id) {
  let actualElement = document.getElementById(id);
  let lastElement = document.getElementById(answer);

  if (!answer) {
    answer = id;
    flip(id);
    return;
  }

  if (answer === id) {
    return;
  }

  if (id.substring(0, 1) === answer.substring(0, 1)) {
    flip(id);
    lastElement.onclick = null;
    actualElement.onclick = null;
    answer = "";
    points = points + 1;
    incrementMove();
    document.getElementById("points").innerHTML = points;
    setTimeout(() => {
      lastElement.style.backgroundColor = colorMatch;
      actualElement.style.backgroundColor = colorMatch;
    }, 800);
    if (finishGame()) {
      setTimeout(() => {
        alert("YOU WON!");
      }, 700);
    }
  } else {
    flip(id);
    setTimeout(() => {
      flip(id);
      flip(answer);
      answer = "";
      incrementMove();
    }, 1100);
  }
}

function sortArray(list) {
  let arraySize = list.length;
  let randomPosition;
  let lastElement;

  while (arraySize) {
    randomPosition = Math.floor(Math.random() * arraySize--);

    lastElement = list[arraySize];
    list[arraySize] = list[randomPosition];
    list[randomPosition] = lastElement;
  }

  return list;
}

function configureImage(element, url) {
  element.setAttribute("src", url);
  element.setAttribute("display", "block");
  element.setAttribute("width", "130px");
  element.setAttribute("height", "130px");
}

function createGame(list) {
  points = 0;
  moves = 0;
  document.getElementById("points").innerHTML = points;
  document.getElementById("moves").innerHTML = moves;
  document.getElementById("total").innerHTML = list.length / 2;
  sortArray(cards);

  list.forEach((element) => {
    const div = document.createElement("div");
    const img = document.createElement("IMG");
    configureImage(img, element.img);

    const divFront = document.createElement("div");
    const divBack = document.createElement("div");
    divFront.setAttribute("class", "card__face");
    divBack.setAttribute("class", "card__back card__face");

    div.setAttribute("class", "section__card");
    div.setAttribute("id", element.id);
    div.onclick = () => changeVisibility(element.id);

    document
      .getElementById("game-content")
      .appendChild(div)
      .appendChild(divFront)
      .parentNode.insertBefore(divBack, divFront.nextSibling)
      .appendChild(img);
  });
}

createGame(cards);

function resetGame() {
  document.querySelectorAll(".section__card").forEach((element) => {
    element.remove();
  });
  createGame(cards);
}
