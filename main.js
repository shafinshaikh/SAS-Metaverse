import * as THREE from 'three';
import KeyInput from './KeyInput.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(directionalLight);
scene.add(light);

const geometry = new THREE.BoxGeometry( 50, 0.1, 50 );
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const ground = new THREE.Mesh( geometry, material );

scene.add(ground);
camera.position.set( 5, 15, 15 );

const boxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
const boxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( boxGeometry, boxMaterial );
box.position.set(-2,0,8);

scene.add(box);


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