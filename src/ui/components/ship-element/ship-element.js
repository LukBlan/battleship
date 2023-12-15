import './ship-element.css';

function shipElement(size) {
  const ship = document.createElement('div');

  ship.classList.add('ship');
  ship.draggable = true;

  for (let i = 0; i < size; i += 1) {
    const shipBlock = document.createElement('div');
    shipBlock.classList.add('ship-block');
    ship.append(shipBlock);
  }

  return ship;
}

export { shipElement };
