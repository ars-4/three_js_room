import { Project, ProjectLight, ModelLoader, Cube, Sphere, Plane } from './scripts/constructor.js';
import './assets/css/global.style.css';
import * as THREE from 'three';
import { GUI } from 'dat.gui'

const body = document.getElementById('body');
let canvas = document.createElement('canvas');
canvas.id = 'canvas';
body.appendChild(canvas);

const project = new Project({ canvas: document.getElementById('canvas'), width: window.innerWidth, height: window.innerHeight });
project.init();


// const box = new Cube({ width: 1, height: 1, depth: 1, color: 0x00ff00 });
// project.add_geometry(box.mesh);
// box.mesh.castShadow = true;
// box.mesh.position.x = -2.6;
// box.mesh.position.y = -.6;


let floor = new Plane({ width: 6, height: 5, depth: 1, color: 0x00ff00 });
project.add_geometry(floor.mesh);
floor.mesh.position.y = -1;
floor.mesh.rotation.x = -Math.PI / 2;
floor.mesh.receiveShadow = true;
floor.material.side = THREE.DoubleSide;

let side_wall = new Plane({ width: 5, height: 3, depth: 1, color: 0x00ff00 });
project.add_geometry(side_wall.mesh);
side_wall.mesh.position.x = -3;
side_wall.mesh.position.y = .5;
side_wall.mesh.rotation.y = Math.PI / 2;
side_wall.material.side = THREE.DoubleSide;

let back_wall = new Plane({ width: 6, height: 3, depth: 1, color: 0x00ff00 });
project.add_geometry(back_wall.mesh);
back_wall.mesh.position.z = -2.5;
back_wall.mesh.position.y = .5;
// back_wall.mesh.rotation.y = Math.PI / 1;
back_wall.material.side = THREE.DoubleSide;


const light_1 = new ProjectLight('point', 0xffffff, 10, { x: -1, y: 2, z: 1 }, true);
project.scene.add(light_1.light);

const light_bulb = new Sphere({ radius: 0.1, color: 0xffffff, position: { x: -1, y: 2, z: 1 } });
project.scene.add(light_bulb.mesh);

let computer = new ModelLoader({ path: '../assets/models/computers/computer.glb', position: { x: -2.6, y: -1, z: -1.4 }, scale: { x: 0.5, y: 0.5, z: 0.5 }, rotation: {x: 0, y:1.6, z:0}, scene: project.scene });
computer.load_model();

let cupboard = new ModelLoader({ path: '../assets/models/cupboards/cupboard_1.glb', position: { x: -3.8, y: -1, z: -1 }, scale: { x: 0.3, y: 0.3, z: 0.3 }, rotation: { x: 0, y: -0.3, z: 0 }, scene: project.scene });
cupboard.load_model();

let bed = new ModelLoader({ path: '../assets/models/beds/bed_1.glb', position: { x: 1, y: -1, z: -1.8 }, scale: { x: 0.3, y: 0.3, z: 0.3 }, rotation: { x: 0, y: -1.6, z: 0 }, scene: project.scene });
bed.load_model();


const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(floor.mesh.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(floor.mesh.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(floor.mesh.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.add(floor.material.color, 'color', 0, 0xffffff).onChange(() => {
//     floor.mesh.material.color.set(floor.mesh.material.color)
// })
// cubeFolder.open()

var params = {
    color: 0x00ff00
};
var room_folder = gui.addFolder('Room');
room_folder.addColor(params, 'color')
    .onChange(function () { 
        floor.mesh.material.color.set(params.color);
        side_wall.mesh.material.color.set(params.color); 
        back_wall.mesh.material.color.set(params.color);
     });
// folder.add(bed.model_url, 'pathname').onChange(() => {
//     bed.model_url.href = bed.model_url.href;
//     bed.load_model();
// })
room_folder.addColor(light_1, 'color').onChange(() => {
    light_1.light.color.set(light_1.color);
    light_bulb.mesh.material.color.set(light_1.color);
})
room_folder.__controllers[0].name("Room Color");
room_folder.__controllers[1].name("Light Color");


var bed_folder = gui.addFolder('Bed');
var bed_position_folder = bed_folder.addFolder('Position');
bed_position_folder.add(bed.position, 'x').onChange(() => {
    bed.position.x = bed.position.x;
    bed.destroy_model();
    bed.load_model();
})
bed_position_folder.add(bed.position, 'y').onChange(() => {
    bed.position.y = bed.position.y;
    bed.destroy_model();
    bed.load_model();
})
bed_position_folder.add(bed.position, 'z').onChange(() => {
    bed.position.z = bed.position.z;
    bed.destroy_model();
    bed.load_model();
})
var bed_rotation_folder = bed_folder.addFolder('Rotation');
bed_rotation_folder.add(bed.rotation, 'x').onChange(() => {
    bed.rotation.x = bed.rotation.x;
    bed.destroy_model();
    bed.load_model();
})
bed_rotation_folder.add(bed.rotation, 'y').onChange(() => {
    bed.rotation.y = bed.rotation.y;
    bed.destroy_model();
    bed.load_model();
})
bed_rotation_folder.add(bed.rotation, 'z').onChange(() => {
    bed.rotation.z = bed.rotation.z;
    bed.destroy_model();
    bed.load_model();
})
var bed_scale_folder = bed_folder.addFolder('Scale');
bed_scale_folder.add(bed.scale, 'x').onChange(() => {
    bed.scale.x = bed.scale.x;
    bed.destroy_model();
    bed.load_model();
})
bed_scale_folder.add(bed.scale, 'y').onChange(() => {
    bed.scale.y = bed.scale.y;
    bed.destroy_model();
    bed.load_model();
})
bed_scale_folder.add(bed.scale, 'z').onChange(() => {
    bed.scale.z = bed.scale.z;
    bed.destroy_model();
    bed.load_model();
})
var computer_folder = gui.addFolder('Computer');
var computer_position_folder = computer_folder.addFolder('Position');
computer_position_folder.add(computer.position, 'x').onChange(() => {
    computer.position.x = computer.position.x;
    computer.destroy_model();
    computer.load_model();
})
computer_position_folder.add(computer.position, 'y').onChange(() => {
    computer.position.y = computer.position.y;
    computer.destroy_model();
    computer.load_model();
})
computer_position_folder.add(computer.position, 'z').onChange(() => {
    computer.position.z = computer.position.z;
    computer.destroy_model();
    computer.load_model();
})
var computer_rotation_folder = computer_folder.addFolder('Rotation');
computer_rotation_folder.add(computer.rotation, 'x').onChange(() => {
    computer.rotation.x = computer.rotation.x;
    computer.destroy_model();
    computer.load_model();
})
computer_rotation_folder.add(computer.rotation, 'y').onChange(() => {
    computer.rotation.y = computer.rotation.y;
    computer.destroy_model();
    computer.load_model();
})
computer_rotation_folder.add(computer.rotation, 'z').onChange(() => {
    computer.rotation.z = computer.rotation.z;
    computer.destroy_model();
    computer.load_model();
})
var computer_scale_folder = computer_folder.addFolder('Scale');
computer_scale_folder.add(computer.scale, 'x').onChange(() => {
    computer.scale.x = computer.scale.x;
    computer.destroy_model();
    computer.load_model();
})
computer_scale_folder.add(computer.scale, 'y').onChange(() => {
    computer.scale.y = computer.scale.y;
    computer.destroy_model();
    computer.load_model();
})
computer_scale_folder.add(computer.scale, 'z').onChange(() => {
    computer.scale.z = computer.scale.z;
    computer.destroy_model();
    computer.load_model();
})
var cupboard_folder = gui.addFolder('Cupboard');
var cupboard_position_folder = cupboard_folder.addFolder('Position');
cupboard_position_folder.add(cupboard.position, 'x').onChange(() => {
    cupboard.position.x = cupboard.position.x;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_position_folder.add(cupboard.position, 'y').onChange(() => {
    cupboard.position.y = cupboard.position.y;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_position_folder.add(cupboard.position, 'z').onChange(() => {
    cupboard.position.z = cupboard.position.z;
    cupboard.destroy_model();
    cupboard.load_model();
})
var cupboard_rotation_folder = cupboard_folder.addFolder('Rotation');
cupboard_rotation_folder.add(cupboard.rotation, 'x').onChange(() => {
    cupboard.rotation.x = cupboard.rotation.x;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_rotation_folder.add(cupboard.rotation, 'y').onChange(() => {
    cupboard.rotation.y = cupboard.rotation.y;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_rotation_folder.add(cupboard.rotation, 'z').onChange(() => {
    cupboard.rotation.z = cupboard.rotation.z;
    cupboard.destroy_model();
    cupboard.load_model();
})
var cupboard_scale_folder = cupboard_folder.addFolder('Scale');
cupboard_scale_folder.add(cupboard.scale, 'x').onChange(() => {
    cupboard.scale.x = cupboard.scale.x;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_scale_folder.add(cupboard.scale, 'y').onChange(() => {
    cupboard.scale.y = cupboard.scale.y;
    cupboard.destroy_model();
    cupboard.load_model();
})
cupboard_scale_folder.add(cupboard.scale, 'z').onChange(() => {
    cupboard.scale.z = cupboard.scale.z;
    cupboard.destroy_model();
    cupboard.load_model();
})






project.animate();

