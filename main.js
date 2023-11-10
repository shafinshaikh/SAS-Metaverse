import * as THREE from 'three';

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
const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const ground = new THREE.Mesh( geometry, material );
scene.add( ground );

camera.position.set( 0, 5, 15 );

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();