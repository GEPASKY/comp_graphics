const canvas = document.getElementById('mechanismCanvas');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
let angle = 0;

function drawScottishMechanism() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2; // Центр механизма
    const centerY = height / 2;
    const crankRadius = 50;
    const rodLength = 200;

    // Вычисление позиции кривошипа
    const crankX = centerX + crankRadius * Math.cos(angle);
    const crankY = centerY + crankRadius * Math.sin(angle);

    // Вычисление позиции ползуна
    const dx = crankX - centerX;
    const dy = crankY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (rodLength * dx) / distance;
    const sliderX = centerX + offsetX;

    // Рисуем кривошип
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(crankX, crankY);
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Рисуем шатун
    ctx.beginPath();
    ctx.moveTo(crankX, crankY);
    ctx.lineTo(sliderX, centerY);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 5;
    ctx.stroke();

    // Рисуем горизонтальную балку
    const beamWidth = 300;
    const beamHeight = 10;
    const beamX = sliderX - beamWidth / 2;
    const beamY = centerY - beamHeight / 2;
    ctx.beginPath();
    ctx.rect(beamX, beamY, beamWidth, beamHeight);
    ctx.fillStyle = 'gray';
    ctx.fill();

    // Рисуем ползун (красный квадрат)
    ctx.beginPath();
    ctx.rect(sliderX - 10, centerY - 10, 20, 20);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Рисуем вертикальный индикатор движения (закрепленный на ползуне)
    const verticalRectWidth = 20;
    const verticalRectHeight = 100;
    const verticalRectX = sliderX - verticalRectWidth / 2;
    const verticalRectY = centerY - verticalRectHeight / 2;
    ctx.beginPath();
    ctx.rect(verticalRectX, verticalRectY, verticalRectWidth, verticalRectHeight);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();

    angle += 0.04; // Увеличение скорости
    if (angle >= 2 * Math.PI) {
        angle -= 2 * Math.PI;
    }

    requestAnimationFrame(drawScottishMechanism);
}

drawScottishMechanism();
