// Nous définissons nos objets (scène 3D, caméra, gestionnaire de rendu,
// maillage 3D, chargeur de maillage, lumières...)
var scene, camera, renderer, mesh, loader, light, light2, head, cube, controls;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init() {
    scene = new THREE.Scene();

    initMesh();
    initLights();
    initCamera();
    initRenderer();

    document.body.appendChild(renderer.domElement);
}

function initMesh() {
    loader = new THREE.JSONLoader();
    var textureLoader = new THREE.TextureLoader();
 
    loader.load('./models/head.json', function (geometry, materials) {
        head = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        head.scale.x = head.scale.y = head.scale.z = 1.5;
        head.translation = THREE.GeometryUtils.center(geometry);

        console.log(head);
        for (var i = 0; i < head.geometry.faces.length; i++){
            head.geometry.faces[i].color.setHex(Math.random() * 0xffffff);
        }
        //head.material.color.setHex(Math.random() * 0xffffff);
        scene.add(head);
        camera.lookAt(head.position);
        light2.lookAt(head.position);
    });

    loader.load('./models/cube.json', function (geometry, materials) {
        cube = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());
        cube.scale.x = cube.scale.y = cube.scale.z = 1.5;
        cube.position.set(0, -3, 0);
        //cube.material.color.setHex( Math.random() * 0xffffff );
        cube.translation = THREE.GeometryUtils.center(geometry);
        scene.add(cube);
        camera.lookAt(cube.position);
        light2.lookAt(cube.position);
    });
}



function initLights() {
    light = new THREE.AmbientLight(0x000000);
    scene.add(light);
    light2 = new THREE.DirectionalLight(0x000000, 1);
    scene.add(light2);
}
 
function initCamera() {
    camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 5);
}

function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);
}


function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}



init();
render();
controls = new THREE.OrbitControls(camera, renderer.domElement);
