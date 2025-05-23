const rows = 4;
const cols = 4;
const totalPieces = rows * cols;

const piecesContainer = document.getElementById('pieces');
const puzzleContainer = document.getElementById('puzzle');

const imageURL = 'love.jpg'; // ảnh 400x400 px

// Tạo các ô slot để thả mảnh ghép
for (let i = 0; i < totalPieces; i++) {
  const slot = document.createElement('div');
  slot.classList.add('slot');
  slot.dataset.index = i;
  slot.addEventListener('dragover', dragOver);
  slot.addEventListener('drop', dropPiece);
  puzzleContainer.appendChild(slot);
}

// Tạo các mảnh ghép
let pieces = [];

for (let i = 0; i < totalPieces; i++) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.setAttribute('draggable', 'true');
  piece.dataset.index = i;

  const x = (i % cols) * 100;
  const y = Math.floor(i / cols) * 100;

  piece.style.backgroundImage = `url(${imageURL})`;
  piece.style.backgroundPosition = `-${x}px -${y}px`;

  piece.addEventListener('dragstart', dragStart);

  pieces.push(piece);
}

// Hàm trộn mảng
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(pieces);

pieces.forEach(piece => {
  piecesContainer.appendChild(piece);
});

let draggedPiece = null;

function dragStart(e) {
  draggedPiece = e.target;
  e.dataTransfer.setData('text/plain', draggedPiece.dataset.index);
}

function dragOver(e) {
  e.preventDefault();
}

function dropPiece(e) {
  e.preventDefault();
  const slot = e.target.closest('.slot');
  if (!slot) return;
  
  if (slot.classList.contains('placed')) return;

  const pieceIndex = e.dataTransfer.getData('text/plain');

  if (parseInt(slot.dataset.index) === parseInt(pieceIndex)) {
    const piece = piecesContainer.querySelector(`.piece[data-index='${pieceIndex}']`);
    if (!piece) return;

    slot.appendChild(piece);
    piece.style.position = 'static';
    piece.style.width = '100%';
    piece.style.height = '100%';
    piece.setAttribute('draggable', 'false');
    piece.style.clipPath = 'none'; // bỏ clip-path khi đặt đúng chỗ

    slot.classList.add('placed');

    checkWin();
  } else {
    alert('Bạn phải thả mảnh ghép vào đúng vị trí!');
  }
}

function checkWin() {
  const placedPieces = puzzleContainer.querySelectorAll('.placed').length;
  if (placedPieces === totalPieces) {
    alert('Giỏi đếy!');
    window.location.href = "book.html";
  }


}
// Giả sử có nút chuyển sang trang letter.html, hoặc bạn muốn chuyển trang bằng JS
function goToLetter() {
    // Thêm class zoom-out cho body để tạo hiệu ứng
    document.body.classList.add('zoom-out');
  
    // Sau 600ms (thời gian hiệu ứng), chuyển trang
    setTimeout(() => {
      window.location.href = 'book.html';
    }, 600);
  }
  
  // Ví dụ: gọi hàm khi người dùng click nút (bạn tự thêm nút hoặc gọi hàm này khi muốn chuyển trang)
  document.addEventListener('DOMContentLoaded', () => {
    // Nếu bạn có nút chuyển trang, ví dụ id="goLetter"
    const btn = document.getElementById('goLetter');
    if (btn) {
      btn.addEventListener('click', goToLetter);
    }
  });
  
