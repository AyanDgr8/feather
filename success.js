const holder = document.querySelector('#confetti');
const colors = ['#ffe56d', '#ffffff', '#ff9db5', '#9ce6df', '#cba1ff'];
for (let i = 0; i < 70; i += 1) {
  const piece = document.createElement('i');
  piece.style.left = `${Math.random() * 100}vw`;
  piece.style.background = colors[Math.floor(Math.random() * colors.length)];
  piece.style.animationDuration = `${4 + Math.random() * 5}s`;
  piece.style.animationDelay = `${-Math.random() * 8}s`;
  piece.style.setProperty('--drift', `${Math.random() * 220 - 110}px`);
  piece.style.transform = `rotate(${Math.random() * 360}deg)`;
  holder.appendChild(piece);
}
