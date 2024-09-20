// Инициализация сцены, камеры и рендерера
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1); // Установка белого фона
document.body.appendChild(renderer.domElement);

// Инициализация OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Создание материала
const material = new THREE.MeshPhongMaterial({ color: 0x0077ff, shininess: 100 });
const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, shininess: 100 });
const lineMaterial = new THREE.MeshPhongMaterial({ color: 0x000000, shininess: 100 });

// Создание геометрии лемнискаты Бернулли
const points = [];
const a = 5; // Константа, определяющая размер лемнискаты
for (let t = -Math.PI / 2; t <= Math.PI / 2; t += 0.01) {
    const x = (a * Math.sqrt(2) * Math.cos(t)) / (Math.sin(t) ** 2 + 1);
    const y = (a * Math.sqrt(2) * Math.cos(t) * Math.sin(t)) / (Math.sin(t) ** 2 + 1);
    points.push(new THREE.Vector3(x, 0, y));
}

const curve = new THREE.CatmullRomCurve3(points);
const geometry = new THREE.TubeGeometry(curve, 100, 0.2, 8, false);
const lemniscate = new THREE.Mesh(geometry, material);
scene.add(lemniscate);

// Создание линий
const createLine = (start, end) => {
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    const cylinderGeometry = new THREE.CylinderGeometry(0.05, 0.05, length, 8);
    const cylinder = new THREE.Mesh(cylinderGeometry, lineMaterial);

    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    cylinder.position.copy(midpoint);

    cylinder.lookAt(end);
    return cylinder;
};

const origin = new THREE.Vector3(0, 0, 0);

const line1End = new THREE.Vector3(10, 0, 5); // Произвольные точки на концах линий
const line2End = new THREE.Vector3(10, 0, -5);
const line3End = new THREE.Vector3(-10, 0, 5);
const line4End = new THREE.Vector3(-10, 0, -5);

const line1 = createLine(origin, line1End);
const line2 = createLine(origin, line2End);
const line3 = createLine(origin, line3End);
const line4 = createLine(origin, line4End);

scene.add(line1);
scene.add(line2);
scene.add(line3);
scene.add(line4);

// Создание шариков
const ballGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const ball1 = new THREE.Mesh(ballGeometry, ballMaterial);
const ball2 = new THREE.Mesh(ballGeometry, ballMaterial);
const ball3 = new THREE.Mesh(ballGeometry, ballMaterial);
const ball4 = new THREE.Mesh(ballGeometry, ballMaterial);

scene.add(ball1);
scene.add(ball2);
scene.add(ball3);
scene.add(ball4);

// Добавление освещения
const ambientLight = new THREE.AmbientLight(0x404040); // мягкий белый свет
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Установка позиции камеры
camera.position.z = 20;

// Анимация
const animate = function () {
    requestAnimationFrame(animate);

    // Вращение объектов
    lemniscate.rotation.x += 0.01;
    lemniscate.rotation.y += 0.01;

    line1.rotation.x += 0.01;
    line1.rotation.y += 0.01;
    line2.rotation.x += 0.01;
    line2.rotation.y += 0.01;
    line3.rotation.x += 0.01;
    line3.rotation.y += 0.01;
    line4.rotation.x += 0.01;
    line4.rotation.y += 0.01;

    // Обновление позиций шариков
    const speed = 0.001; // Скорость движения шариков

    ball1.position.lerpVectors(origin, line1End, (Date.now() * speed) % 1);
    ball2.position.lerpVectors(origin, line2End, (Date.now() * speed) % 1);
    ball3.position.lerpVectors(origin, line3End, (Date.now() * speed) % 1);
    ball4.position.lerpVectors(origin, line4End, (Date.now() * speed) % 1);

    controls.update();
    renderer.render(scene, camera);
};
animate();

// Обработка изменения размеров окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
