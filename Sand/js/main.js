import * as THREE from 'https://unpkg.com/three/build/three.module.js'

let camera, scene, renderer, light;
let geometry, geometry2, material, material2, meshSand, plane;

init();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
    camera.position.z = 3;

    scene = new THREE.Scene();

    //Mouse navigation
    //var controls = new THREE.TrackballControls( camera );

    //Add lightning
    light = new THREE.SpotLight();
    light.position.set( 0, 20, 1 );
    scene.add(light);
    light.castShadow = true;

    //Add ground plan
    geometry2 = new THREE.PlaneGeometry(5, 5, 1, 1);
    material2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    plane = new THREE.Mesh(geometry2, material2);
    plane.receiveShadow = true;
    scene.add(plane);
    plane.rotation.x = -Math.PI/2;
    plane.position.y = -1;

    //Add sand to scene
    geometry = new THREE.SphereGeometry( 0.3, 32, 32);
    material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    meshSand = new THREE.Mesh( geometry, material );
    meshSand.receiveShadow = true;
    scene.add( meshSand );
    
    //Add rendering mechanics
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

}

function animation( time ) {

    meshSand.rotation.x = time / 1000;
    meshSand.rotation.y = time / 1000;

    renderer.render( scene, camera );

}