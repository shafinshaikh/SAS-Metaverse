import * as THREE from 'three';
import KeyInput from './KeyInput.js';
import { connect, getBuildings } from './Connect.js';
//import image  

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Existing ambient and directional lights
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(10, 10, 10);

// Add HemisphereLight for a softer, more natural light
const hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 0.6);
scene.add(hemiLight);

// Add the lights to the scene
scene.add(ambientLight);
scene.add(directionalLight);

const loader = new THREE.CubeTextureLoader();
const skyboxTexture = loader.load([
    './assets/Daylight_Box_Right.bmp', './assets/Daylight_Box_Left.bmp',
    './assets/Daylight_Box_Top.bmp', './assets/Daylight_Box_Bottom.bmp',
    './assets/Daylight_Box_Front.bmp', './assets/Daylight_Box_Back.bmp'
]);
scene.background = skyboxTexture;


const groundTexture = new THREE.TextureLoader().load('./assets/ground_texture.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(50, 50);

const groundMaterial = new THREE.MeshPhongMaterial({ map: groundTexture });
const geometry = new THREE.BoxGeometry( 50, 0.1, 50 );
const ground = new THREE.Mesh(geometry, groundMaterial);
scene.add(ground);

camera.position.set( 5, 15, 15 );

function animate() {
	requestAnimationFrame( animate );
	if(KeyInput.isPressed(38)){
		camera.position.y += 0.05;
		camera.position.x += 0.05;
	}
	if(KeyInput.isPressed(40)){
		camera.position.y -= 0.05;
		camera.position.x -= 0.05;
	}

    camera.lookAt(ground.position);
	renderer.render( scene, camera );
}
animate();

// Function to create a 3D building
function createBuilding(building) {
    const w = parseFloat(building.w); // Convert to number
    const h = parseFloat(building.h); // Convert to number
    const d = parseFloat(building.d); // Convert to number
    const x = parseFloat(building.x); // Convert to number
    const y = parseFloat(building.y); // Convert to number
    const z = parseFloat(building.z); // Convert to number

    const geometry = new THREE.BoxGeometry(w, h, d);
    const color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`);
    const material = new THREE.MeshPhongMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);
}
connect.then(async () => {
    const buildings = await getBuildings();
    buildings.forEach(createBuilding);
	console.log(buildings);
}).catch(error => {
    console.error('Failed to connect:', error);
});