import * as THREE from "https://threejsfundamentals.org/threejs/resources/threejs/r132/build/three.module.js";
import { OrbitControls } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/controls/OrbitControls.js";
import { OBJLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r132/examples/jsm/loaders/MTLLoader.js";

function main() {
  const canvas = document.querySelector("#myCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0xfd5e53, 0.003);
  scene.background = new THREE.Color(0xfd5e53);
  
  // const fov = 45;
  // const aspect = 2; // the canvas default
  // const near = 0.1;
  // const far = 100;
  // const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // camera.position.set(35, 20, 35);

  const sizes = {
    width: 0.9 * window.innerWidth,
    height: 1 * window.innerHeight,
  };
  
  const camera = new THREE.PerspectiveCamera(
    100,
    sizes.width / sizes.height,
    1,
    2000
  );
  camera.position.set(30, 100, 30);
  
  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 2, 0);
  controls.update();

  // const scene = new THREE.Scene();
  // scene.background = new THREE.Color("black");

  // {
  //   const ground = new THREE.Mesh(
  //     new THREE.PlaneGeometry(200, 200),
  //     new THREE.MeshPhongMaterial({
  //       color: 0x262424,
  //       side: THREE.DoubleSide,
  //       shininess: 0,
  //     })
  //   );
  //   ground.rotation.x = -Math.PI / 2;
  //   ground.position.y = -2;
  //   scene.add(ground);    
  // }

  {
    const skyColor = 0xfd5e53; 
    const groundColor = 0xfd5e53;
    const intensity = 0.5;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const mtlLoader = new MTLLoader();
    mtlLoader.load("./source/VG Remix - Fus-Ro-Dioramah!.mtl", (mtl) => {
      mtl.preload();
      const objLoader = new OBJLoader();
      objLoader.setMaterials(mtl);
      objLoader.load("./source/VG Remix - Fus-Ro-Dioramah!.obj", (root) => {
        scene.add(root);
      });
    });
  }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();