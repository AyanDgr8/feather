const noButton = document.querySelector('#no-btn');
const yesButton = document.querySelector('#yes-btn');
const zone = document.querySelector('#answer-zone');
const hint = document.querySelector('#hint');
let escapes = 0;

const messages = ['Nice try ♡', 'Wrong button!', 'Too slow 😌', 'It only accepts YES', 'Still no!'];

function dodge(event) {
  if (event) event.preventDefault();
  const zoneBox = zone.getBoundingClientRect();
  const buttonBox = noButton.getBoundingClientRect();
  const yesBox = yesButton.getBoundingClientRect();
  const pad = 6;
  const gap = 12;
  const yesX = yesBox.left - zoneBox.left;
  const yesY = yesBox.top - zoneBox.top;
  const centeredX = yesX + (yesBox.width - buttonBox.width) / 2;
  const centeredY = yesY + (yesBox.height - buttonBox.height) / 2;
  const positions = [
    { x:centeredX, y:yesY - buttonBox.height - gap },
    { x:yesBox.right - zoneBox.left + gap, y:centeredY },
    { x:centeredX, y:yesBox.bottom - zoneBox.top + gap },
    { x:yesX - buttonBox.width - gap, y:centeredY }
  ].filter(({ x, y }) => x >= pad && y >= pad && x + buttonBox.width <= zoneBox.width - pad && y + buttonBox.height <= zoneBox.height - pad);
  const spot = positions[escapes % positions.length] || { x:pad, y:pad };
  noButton.style.left = `${spot.x}px`;
  noButton.style.top = `${spot.y}px`;
  noButton.style.transform = `rotate(${Math.random() * 18 - 9}deg)`;
  hint.innerHTML = `${messages[escapes % messages.length]} <span>♡</span>`;
  escapes += 1;
}

['pointerenter', 'pointerdown', 'touchstart', 'focus'].forEach((eventName) => {
  noButton.addEventListener(eventName, dodge, { passive:false });
});
noButton.addEventListener('click', dodge);
const initialHint = hint.innerHTML;
requestAnimationFrame(() => {
  dodge();
  escapes = 0;
  hint.innerHTML = initialHint;
});

yesButton.addEventListener('click', () => {
  yesButton.innerHTML = '<span>BEST ANSWER EVER</span><b>♥</b>';
  window.location.href = 'success.html';
});
