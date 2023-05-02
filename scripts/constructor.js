import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


class Project {
    constructor({ canvas = document.getElementById('canvas'), width = window.innerWidth, height = window.innerHeight }) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.loader = new GLTFLoader();
        // this.init();
        this.animations = [];
    }

    add_geometry(geometry) {
        this.scene.add(geometry);
    }

    init() {
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(0x000000, 1);
        this.camera.position.set(6, 3, 6);
        this.controls.update();
    }

    animate() {
        // this.animations[0];
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate.bind(this));
    }

}

const lights = {
    "directional": THREE.DirectionalLight,
    point: THREE.PointLight,
    spot: THREE.SpotLight,
    ambient: THREE.AmbientLight,
    hemisphere: THREE.HemisphereLight,
    rectarea: THREE.RectAreaLight
}
class ProjectLight {
    constructor(type = 'directional', color = 0xffffff, intensity = 1, position = { x: 0, y: 0, z: 0 }, shadow = false) {
        this.color = color;
        this.intensity = intensity;
        this.position = position;
        this.light = new lights[type](this.color, this.intensity);
        this.light.position.set(this.position.x, this.position.y, this.position.z);
        this.light.castShadow = shadow;

    }
}


class Cube {
    constructor({
        width = 1, height = 1, depth = 1,
        color = 0x00ff00, texture = null,
        position = { x: 0, y: 0, z: 0 } }
    ) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshStandardMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
    }
}

class Plane {
    constructor({
        width = 1, height = 1, depth = 1,
        color = 0x00ff00, texture = null,
        position = { x: 0, y: 0, z: 0 } }
    ) {
        this.geometry = new THREE.PlaneGeometry(width, height, depth);
        this.material = new THREE.MeshStandardMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
    }
}

class Sphere {
    constructor({
        radius = 1,
        color = 0x00ff00, texture = null,
        position = { x: 0, y: 0, z: 0 } }
    ) {
        this.geometry = new THREE.SphereGeometry(radius);
        this.material = new THREE.MeshBasicMaterial({ color: color });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(position.x, position.y, position.z);
    }
}


class ModelLoader {
    constructor({ path = '', position = { x: 0, y: 0, z: 0 }, scale = { x: 1, y: 1, z: 1 }, rotation = { x:0, y:0, z:0 }, scene = null }) {
        this.scene = scene;
        this.model_url = new URL(path, import.meta.url);
        this.loader = new GLTFLoader();
        this.model = null;
        this.position = position;
        this.scale = scale;
        this.rotation = rotation;
    }

    load_model = function () {
        this.loader.load(this.model_url.href, (gltf) => {
            this.model = gltf.scene;
            this.scene.add(this.model);
            this.model.scale.set(this.scale.x, this.scale.y, this.scale.z);
            this.model.position.set(this.position.x, this.position.y, this.position.z);
            this.model.rotation.set(this.rotation.x, this.rotation.y, this.rotation.z);
            this.model.traverse( function( node ) {
                if ( node.isMesh ) { node.castShadow = true; }
            } );
        }, undefined, (error) => {
            console.error(error);
        });
    }

    destroy_model = function () {
        this.scene.remove(this.model);
    }

}




// export default Project = Project;
export { Project, ProjectLight, ModelLoader, Cube, Sphere, Plane };