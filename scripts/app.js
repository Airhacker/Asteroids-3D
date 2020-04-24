// Variables
let scene, camera, renderer, starGeo, stars, meteorGroup;
let starAmount = 2500;
const fov = 60;
const gameArea = document.querySelector(".game-space");

// THREE.js Initializer
function init() {
	scene = new THREE.Scene();
	scene.fog = new THREE.FogExp2(0xf0fff0, 0.1);
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
	for (let i = 0; i < starAmount; i++) {
		star = new THREE.Vector3(
			Math.random() * 600 - 300,
			Math.random() * 600 - 300,
			Math.random() * 600 - 300
		);
		// Star velocity settings

		star.velocity = 0;
		star.acceleration = 0.05;

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
	let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
	scene.add(hemiLight);

	let directionalLight = new THREE.DirectionalLight(0xfefce9, 2);
	directionalLight.position.set(-5, 2, 0);
	scene.add(directionalLight);

	// Meteor Loader
	meteorGeo = new THREE.SphereGeometry(0.2, 8, 6);
	meteorMat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
	meteor = new THREE.Mesh(meteorGeo, meteorMat);

	// Meteor Array
	meteorGroup = new THREE.Object3D();
	for (let i = 0; i < 100; i++) {
		meteorGroup.add(meteor);
	}
	scene.add(meteorGroup);
	//meteor.position.set(Math.random() * 600 - 300, 0, -450);

	// Run Animation Loop
	animate(meteorGroup);
}

function animate(group) {
	starGeo.vertices.forEach((p) => {
		p.velocity += p.acceleration;
		p.z += p.velocity;
		if (p.z > 100) {
			p.z = -450;
			p.velocity = 0;
		}
	});
	starGeo.verticesNeedUpdate = true;

	// Meteor Movement Settings

	//group.forEach();

	if (meteor.position.z >= 50) {
		meteor.position.z += 0.25;
	} else {
	}

	renderer.render(scene, camera);
	requestAnimationFrame(animate);
}

init();

// Key presses
window.addEventListener("keydown", (e) => {
	// Checks for left movement
	if (e.keyCode == 65 || e.keyCode == 37) {
		if (spaceShip.position.x >= -1) {
			spaceShip.position.x -= 0.125;
		}
		// Checks for right movement
	} else if (e.keyCode == 68 || e.keyCode == 39) {
		if (spaceShip.position.x <= 1) {
			spaceShip.position.x += 0.125;
		}
		// Check for Spacebar
	} else if (e.keyCode == 32) {
		shipFire();
	}
});

function shipFire() {}

function meteors() {}
