let snake = [{ x: 1, y: 1 }];

let i = 0;
let started = false;
let appleEaten = true;
let apple = [8, 8];

let movementChecker = [0, 0];
document.onkeydown = (e) => {
  console.log(e.key);

  if (started === false) {
    started = true;
    movementChecker[0] = 4;
  } else {
    if (e.key === "a" && movementChecker[1] !== 3) {
      movementChecker[0] = 1;
    } else if (e.key === "w" && movementChecker[1] !== 4) {
      movementChecker[0] = 2;
    } else if (e.key === "d" && movementChecker[1] !== 1) {
      movementChecker[0] = 3;
    } else if (e.key === "s" && movementChecker[1] !== 2) {
      movementChecker[0] = 4;
    }
  }
};

setInterval(() => {
  if (started === true) {
    movementChecker[1] = movementChecker[0];

    snakeMovement(snake, appleEaten);

    snake = borderControl(snake);

    appleEaten = checkApple(snake, apple);

    apple = spawnApple(snake, apple, appleEaten);
    [appleEaten, snake] = removeSegment(snake, appleEaten);
    render(snake, apple);

    snake = checkDeath(snake);
  }
}, 500);

const counter = (i, cap) => {
  if (i >= cap) {
    return (i = 0);
  } else {
    return i++;
  }
};

const render = (snake, apple) => {
  let container = document.getElementById("container");

  container.innerHTML = "";

  for (let i = 0; i < snake.length; i++) {
    let bodysegment = document.createElement("div");

    bodysegment.className = "bodysegment";

    bodysegment.style = `grid-row: ${snake[i].x}/${snake[i].x}; 
                         grid-column: ${snake[i].y}/${snake[i].y};`;

    container.appendChild(bodysegment);
  }

  let appleRender = document.createElement("div");

  appleRender.className = "apple";

  appleRender.style = `grid-row: ${apple[0]}/${apple[0]}; 
                    grid-column: ${apple[1]}/${apple[1]};`;

  container.appendChild(appleRender);
};

let snakeMovement = function (snake, appleEaten) {
  if (movementChecker[0] === 1) {
    snake.push({
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y - 1,
    });
  } else if (movementChecker[0] === 2) {
    snake.push({
      x: snake[snake.length - 1].x - 1,
      y: snake[snake.length - 1].y,
    });
  } else if (movementChecker[0] === 3) {
    snake.push({
      x: snake[snake.length - 1].x,
      y: snake[snake.length - 1].y + 1,
    });
  } else if (movementChecker[0] === 4) {
    snake.push({
      x: snake[snake.length - 1].x + 1,
      y: snake[snake.length - 1].y,
    });
  }
};

let removeSegment = (snake, appleEaten) => {
  if (appleEaten === false) {
    snake.shift();
  }
  return [(appleEaten = false), snake];
};

let checkApple = (snake, apple) => {
  if (
    apple[0] === snake[snake.length - 1].x &&
    apple[1] === snake[snake.length - 1].y
  ) {
    return true;
  } else return false;
};

let spawnApple = (snake, apple, appleEaten) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  if (appleEaten === true) {
    apple[0] = getRandomInt(9) + 1;
    apple[1] = getRandomInt(9) + 1;

    for (let i = 0; i < snake.length; i++) {
      if (apple[1] === snake[i].x && apple[0] === snake[i].y) {
        apple[0] = getRandomInt(9) + 1;
        apple[1] = getRandomInt(9) + 1;
        i = 0;
      }
    }
  }
  console.log(apple);
  return apple;
};

let borderControl = (snake) => {
  console.log(snake);

  if (snake[snake.length - 1].x >= 11) {
    snake[snake.length - 1].x = 1;
  } else if (snake[snake.length - 1].x <= 0) {
    snake[snake.length - 1].x = 10;
  }
  if (snake[snake.length - 1].y >= 11) {
    snake[snake.length - 1].y = 1;
  } else if (snake[snake.length - 1].y <= 0) {
    snake[snake.length - 1].y = 10;
  }
  console.log(snake);

  return snake;
};

let checkDeath = (snake) => {
  let e = false;
  for (let i = 0; i < snake.length - 1; i++) {
    if (
      snake[snake.length - 1].y == snake[i].y &&
      snake[snake.length - 1].x == snake[i].x
    ) {
      e = true;
    }
  }

  if (e === true) {
    return [{ x: 1, y: 1 }];
  } else {
    return snake;
  }
};
