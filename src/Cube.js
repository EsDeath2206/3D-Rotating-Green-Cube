import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Cube = () => {
  const mountRef = useRef(null);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [cubeRotation, setCubeRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(3); // Cube plus grand // Changer de Forme Ici //
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000, // Change la Couleur du Cube // // Exemple la 0xff0000 = Rouge //
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      if (isAutoRotate) {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
      } else {
        cube.rotation.x = cubeRotation.x;
        cube.rotation.y = cubeRotation.y;
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [isAutoRotate, cubeRotation]);

  const handleManualRotate = (axis, direction) => {
    setCubeRotation(prev => ({
      ...prev,
      [axis]: prev[axis] + (direction === 'increase' ? 0.1 : -0.1),
    }));
    setIsAutoRotate(false);
  };

  return (
    <div>
      <div ref={mountRef}></div>
      <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <button onClick={() => setIsAutoRotate(!isAutoRotate)}>
          {isAutoRotate ? 'Stop Auto-Rotate' : 'Start Auto-Rotate'}
        </button>
        <div>
          <button onClick={() => handleManualRotate('x', 'increase')}>Rotate X +</button>
          <button onClick={() => handleManualRotate('x', 'decrease')}>Rotate X -</button>
        </div>
        <div>
          <button onClick={() => handleManualRotate('y', 'increase')}>Rotate Y +</button>
          <button onClick={() => handleManualRotate('y', 'decrease')}>Rotate Y -</button>
        </div>
      </div>
    </div>
  );
};

export default Cube;
