// Получение элемента canvas и его контекста рисования
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Определение размеров canvas
const width = canvas.width;
const height = canvas.height;

// Угол для анимации
let angle = 0;

// Длины звеньев
const r = 150; // радиус окружности для точки B
const l = 200; // длины звеньев AB, BC, CD, DA

// Начальная точка механизма (центр canvas, точка O)
const xO = width / 2;
const yO = height / 2;

// Функция для рисования механизма
function draw() {
    // Очистка canvas
    ctx.clearRect(0, 0, width, height);

    // Вычисление точки B (вращение по окружности вокруг точки O)
    const xB = xO + r * Math.cos(angle);
    const yB = yO + r * Math.sin(angle);

    // Вычисление точек A и C, которые формируют ромб ABCD
    const d = Math.sqrt(l**2 - (r / 2)**2); // Высота ромба от AB до CD

    const xA = (xO + xB) / 2 + d * Math.sin(angle);
    const yA = (yO + yB) / 2 - d * Math.cos(angle);

    const xC = (xO + xB) / 2 - d * Math.sin(angle);
    const yC = (yO + yB) / 2 + d * Math.cos(angle);

    // Вычисление точки D, движущейся по прямой линии
    const xD = xC + (xC - xA);
    const yD = yC + (yC - yA);

    // Рисование красной окружности для движения точки B
    ctx.beginPath();
    ctx.arc(xO, yO, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // Рисование голубой линии для движения точки D
    ctx.beginPath();
    ctx.moveTo(xD, 0);
    ctx.lineTo(xD, height);
    ctx.strokeStyle = 'blue';
    ctx.stroke();

    // Рисование звеньев механизма
    ctx.beginPath();
    ctx.moveTo(xA, yA);
    ctx.lineTo(xB, yB);
    ctx.lineTo(xC, yC);
    ctx.lineTo(xD, yD);
    ctx.closePath();
    ctx.strokeStyle = 'black';
    ctx.stroke();

    // Рисование точек
    ctx.beginPath();
    ctx.arc(xO, yO, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xA, yA, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'green';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xB, yB, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xC, yC, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(xD, yD, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.fill();

    // Увеличение угла для анимации
    angle += 0.01;

    // Рекурсивный вызов функции для следующего кадра
    requestAnimationFrame(draw);
}

// Запуск функции рисования
draw();
