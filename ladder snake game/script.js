
const board = document.getElementById('board');
const message = document.getElementById('message');

const player = {
  position: 0,
};

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 78,
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  28: 84,
  36: 44,
  51: 67,
  71: 91,
  80: 100,
};

// Create the board
for (let i = 100; i > 0; i--) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.id = `cell-${i}`;
  cell.innerText = i;
  board.appendChild(cell);
}

// Roll the dice
function rollDice() {
  const dice = Math.floor(Math.random() * 6) + 1;
  movePlayer(dice);
}

// Move the player
function movePlayer(dice) {
  let newPosition = player.position + dice;

  if (newPosition > 100) {
    message.innerText = `You rolled a ${dice}. Can't move.`;
    return;
  }

  // Check for snakes or ladders
  if (snakes[newPosition]) {
    message.innerText = `You rolled a ${dice}. Oh no! A snake!`;
    newPosition = snakes[newPosition];
  } else if (ladders[newPosition]) {
    message.innerText = `You rolled a ${dice}. Yay! A ladder!`;
    newPosition = ladders[newPosition];
  } else {
    message.innerText = `You rolled a ${dice}. Move to ${newPosition}.`;
  }

  // Update the player's position
  updatePosition(newPosition);

  if (newPosition === 100) {
    message.innerText = 'Congratulations! You win!';
  }
}

// Update the player's position on the board
function updatePosition(newPosition) {
  const oldCell = document.getElementById(`cell-${player.position}`);
  if (oldCell) {
    oldCell.style.backgroundColor = '#fff';
  }

  const newCell = document.getElementById(`cell-${newPosition}`);
  newCell.style.backgroundColor = '#ff0';

  player.position = newPosition;
}

// Initialize the game
updatePosition(player.position);
