// Variables
let scene, camera, renderer, starGeo, stars;
const fov = 60;
const gameArea = document.querySelector(".game-space");

// THREE.js Initializer
function init() {
	scene = new THREE.Scene();
	// Camera Settings
	camera = new THREE.PerspectiveCamera(
		fov,
		window.innerWidth / window.innerHeight,
		1,
		1000
	);
	// Camera Position
	camera.position.z = 5;
	camera.position.y = 1;
	camera.lookAt(0, 0, 0);

	// Display Axes
	let axesHelper = new THREE.AxesHelper(5);
	scene.add(axesHelper);

	// Renderer Settings

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	gameArea.appendChild(renderer.domElement);

	// Stars Settings
	starGeo = new THREE.Geometry();
	for (let i = 0; i < 2500; i++) {
		star = new THREE.Vector3(
			Math.random() * 600 - 300,
			Math.random() * 600 - 300,
			Math.random() * 600 - 300
		);
		// Star velocity settings

		star.velocity = 0;
		star.acceleration = 0.02;

		starGeo.vertices.push(star);
	}
	let sprite = new THREE.TextureLoader().load("./images/starTexture.jpg");
	let starMaterial = new THREE.PointsMaterial({
		color: 0xaaaaaa,
		size: 0.7,
		map: sprite,
	});

	stars = new THREE.Points(starGeo, starMaterial);
	scene.add(stars);

	// Space ship Loader
	let spaceShipLoader = new THREE.GLTFLoader();
	spaceShipLoader.load("./models/space-ship.gltf", function (gltf) {
		spaceShip = gltf.scene.children[0];
		spaceShip.scale.set(0.1, 0.1, 0.1);
		spaceShip.position.set(0, 0, 3);
		scene.add(spaceShip);
	});

	//Lights
	let directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);

	scene.add(directionalLight);

	// Run Animation Loop
	animate();
}

function animate() {
	starGeo.vertices.forEach((p) => {
		p.velocity += p.acceleration;
		p.z += p.velocity;
		if (p.z > 200) {
			p.z = -200;
			p.velocity = 0;
		}
	});
	starGeo.verticesNeedUpdate = true;

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

init();
