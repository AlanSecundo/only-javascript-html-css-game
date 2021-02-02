let isVisible = false;
let cards = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2", "E1", "E2"];
let answer = "";
let points = 0;

function show(id) {
  document.getElementById(id).style.display = "flex";
  isVisible = true;
}

function hidden(id) {
  document.getElementById(id).style.display = "none";
  isVisible = false;
}

function finishGame() {
  return points === cards.length ? true : false;
}

function changeVisibility(id) {
  if (answer === "") {
    answer = id;
    show(id);
    return;
  }

  if (
    document.getElementById(id).textContent ===
    document.getElementById(answer).textContent
  ) {
    show(id);
    document.getElementById(answer).style.backgroundColor = "green";
    document.getElementById(id).style.backgroundColor = "green";
    document.getElementById(answer).style.cursor = "now-allowed";
    document.getElementById(id).style.cursor = "now-allowed";
    document.getElementById(answer).onclick = null;
    document.getElementById(id).onclick = null;
    answer = "";
    points = points + 2;
    if (finishGame()) {
      setTimeout(() => {
        alert("YOU WON!");
      }, 500);
    }
  } else {
    show(id);
    setTimeout(() => {
      hidden(id);
      hidden(answer);
      answer = "";
    }, 500);
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

function createGame(list) {
  sortArray(cards);

  list.forEach((element) => {
    const div = document.createElement("div");
    const internalDiv = document.createElement("div");
    const h1 = document.createElement("h1");
    let text = document.createTextNode(element.substring(0, 1));

    div.setAttribute("class", "section__card");
    internalDiv.setAttribute("id", element);
    div.onclick = () => changeVisibility(element);

    document
      .getElementById("game-content")
      .appendChild(div)
      .appendChild(internalDiv)
      .appendChild(h1)
      .appendChild(text);
  });
}

createGame(cards);

function resetGame() {
  document.querySelectorAll('.section__card').forEach(element => {
    element.remove();
  })
  createGame(cards);
}
