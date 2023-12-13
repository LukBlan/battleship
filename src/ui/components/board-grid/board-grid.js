import './board-grid.css';

function boardGrid() {
  const container = document.createElement('div');
  container.classList.add('board');

  for (let i = 0; i < 7; i += 1) {
    const row = document.createElement('div');
    for (let j = 0; j < 7; j += 1) {
      const cell = document.createElement('div');
      row.append(cell);
    }
    container.append(row);
  }

  return container;
}

export { boardGrid };
