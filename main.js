import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Creating the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 25);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Constants
const room_length = 10;
const room_width = 10;
const room_height = 2.5;

// Colors
const floor_color = new THREE.MeshBasicMaterial( { color: 0xF3F3F3 } );
const wall_color = new THREE.MeshBasicMaterial( { color: 0xA83232 } );

// Initializing the camera controls
const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set(0, 1, 3);
controls.update();


function createSceneWalls(){
	const wall_ns = new THREE.PlaneGeometry( room_length , room_height );
	const wall_ew = new THREE.PlaneGeometry( room_width , room_height );

	const wall_north = new THREE.Mesh( wall_ns, wall_color );
	const wall_south = new THREE.Mesh( wall_ns, wall_color );
	const wall_east = new THREE.Mesh( wall_ew, wall_color );
	const wall_west = new THREE.Mesh( wall_ew, wall_color );

	wall_north.material.side = THREE.DoubleSide;
	wall_south.material.side = THREE.DoubleSide;
	wall_east.material.side = THREE.DoubleSide;
	wall_west.material.side = THREE.DoubleSide;

	wall_north.translateZ(-(room_width/2));
	wall_south.translateZ(room_width/2);
	wall_east.rotation.y = 90 * Math.PI / 180;
	wall_east.translateZ(room_length/2);
	wall_west.rotation.y = -90 * Math.PI / 180;
	wall_west.translateZ(room_length/2);

	scene.add( wall_west );
	scene.add( wall_east );
	scene.add( wall_south );
	scene.add( wall_north );
}

function createSceneFloor() {
	const floor_geo = new THREE.PlaneGeometry( room_length, room_width );
	const floor_mesh = new THREE.Mesh( floor_geo, floor_color );
	floor_mesh.rotation.x = 90 * Math.PI / 180;
	floor_mesh.translateZ(room_height/2);
	floor_mesh.material.side = THREE.DoubleSide;
	scene.add( floor_mesh );
}

function createSceneCeiling() {
	const floor_geo = new THREE.PlaneGeometry( room_length, room_width );
	const floor_mesh = new THREE.Mesh( floor_geo, floor_color );
	floor_mesh.rotation.x = 90 * Math.PI / 180;
	floor_mesh.translateZ(-(room_height/2));
	floor_mesh.material.side = THREE.DoubleSide;
	scene.add( floor_mesh );
}

function animate() {
	controls.update();
	renderer.render( scene, camera );
}

function main() {
	createSceneFloor();
	createSceneCeiling();
	createSceneWalls();

	renderer.setAnimationLoop( animate );
}

main();
