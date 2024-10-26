const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('.color-btn');
const brushSizeInput = document.getElementById('brush-size');

canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 150;

let drawing = false;
let brushColor = '#000000';
let brushSize = 5;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        brushColor = button.style.backgroundColor;
    });
});

brushSizeInput.addEventListener('input', (e) => {
    brushSize = e.target.value;
});

function startDrawing() {
    drawing = true;
    ctx.beginPath();
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
