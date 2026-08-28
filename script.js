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
  const maxX = Math.max(8, zoneBox.width - buttonBox.width - 8);
  const maxY = Math.max(8, zoneBox.height - buttonBox.height - 8);
  let x = 8;
  let y = 8;

  // Keep NO fully visible and away from the YES button.
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const candidateX = 8 + Math.random() * Math.max(0, maxX - 8);
    const candidateY = 8 + Math.random() * Math.max(0, maxY - 8);
    const left = zoneBox.left + candidateX;
    const top = zoneBox.top + candidateY;
    const overlapsYes = !(
      left + buttonBox.width + 14 < yesBox.left ||
      left - 14 > yesBox.right ||
      top + buttonBox.height + 14 < yesBox.top ||
      top - 14 > yesBox.bottom
    );

    x = candidateX;
    y = candidateY;
    if (!overlapsYes) break;
  }

  noButton.style.left = `${Math.min(maxX, Math.max(8, x))}px`;
  noButton.style.top = `${Math.min(maxY, Math.max(8, y))}px`;
  noButton.style.transform = `rotate(${Math.random() * 18 - 9}deg)`;
  hint.innerHTML = `${messages[escapes % messages.length]} <span>♡</span>`;
  escapes += 1;
}

['pointerenter', 'pointerdown', 'touchstart', 'focus'].forEach((eventName) => {
  noButton.addEventListener(eventName, dodge, { passive:false });
});
noButton.addEventListener('click', dodge);

yesButton.addEventListener('click', () => {
  yesButton.innerHTML = '<span>BEST ANSWER EVER</span><b>♥</b>';
  window.location.href = 'success.html';
});
