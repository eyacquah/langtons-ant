const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const numCyclesEl = document.getElementById("numberOfCycles");

// Initial Params
let antDir = "up";
const coords = [canvas.width / 2 - 10, canvas.height / 2 - 10];

// Storage for a cell's status
let filled = {};
filled[`${coords[0]},${coords[1]}`] = false;

const cellIsFilled = () => Boolean(filled[`${coords[0]},${coords[1]}`]);

const fillCell = (color) => {
  ctx.fillStyle = color;
  ctx.fillRect(coords[0], coords[1], 10, 10);

  filled[`${coords[0]},${coords[1]}`] = color === "white" ? false : true;
};

const rotateClockwise = () => {
  switch (antDir) {
    case "up":
      antDir = "right";
      coords[0] += 10;
      break;
    case "right":
      antDir = "down";
      coords[1] += 10;
      break;

    case "down":
      antDir = "left";
      coords[0] -= 10;
      break;

    case "left":
      antDir = "up";
      coords[1] -= 10;
      break;

    default:
      break;
  }
};

const rotateAnticlockwise = () => {
  switch (antDir) {
    case "up":
      antDir = "left";
      coords[0] -= 10;
      break;

    case "left":
      antDir = "down";
      coords[1] += 10;
      break;

    case "down":
      antDir = "right";
      coords[0] += 10;
      break;

    case "right":
      antDir = "up";
      coords[1] -= 10;
      break;

    default:
      break;
  }
};

const moveAnt = (numCycles) => {
  for (let i = 0; i < numCycles; i++) {
    if (cellIsFilled()) {
      fillCell("white");
      rotateAnticlockwise();
    } else {
      fillCell("red");
      rotateClockwise();
    }
  }
};

const setInitialParams = () => {
  coords[0] = canvas.width / 2 - 10;
  coords[1] = canvas.height / 2 - 10;

  filled = {};
  filled[`${coords[0]},${coords[1]}`] = false;

  antDir = "up";
};

const run = () => {
  setInitialParams();
  moveAnt(+numCyclesEl.value);
};

const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

const btnContainer = document.querySelector(".btn-container");

btnContainer.addEventListener("click", (e) => {
  e.target.classList.contains("run") ? run() : clear();
});
