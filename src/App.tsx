import { useEffect } from 'react'
import './App.css'

import * as THREE from "three";

function App() {
  useEffect(() => {
    const scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const canvas: HTMLCanvasElement | OffscreenCanvas = document.getElementById("myThreeJsCanvas") as HTMLCanvasElement | OffscreenCanvas;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      powerPreference: "high-performance",
      antialias: false,
    });

    const windowSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    scene.add(spotLight);

    const boxGeometry = new THREE.BoxGeometry(16, 16, 16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(boxMesh);

    const animate = () => {
      boxMesh.rotation.x += 0.01;
      boxMesh.rotation.y += 0.01;
      renderer.render(scene, camera);
      if (window.innerWidth != windowSize.width || window.innerHeight != windowSize.height) {
        Resize();
      }
      window.requestAnimationFrame(animate);
    }

    function Resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 50;

      // camera.aspect = window.innerWidth / window.innerHeight;
      windowSize.width = window.innerWidth;
      windowSize.height = window.innerHeight;
    }
    animate();
  });

  return (
    <div className="App overflow-hidden">
      <canvas className="absolute -z-[1]" id="myThreeJsCanvas" />
    </div>
  )
}

export default App
