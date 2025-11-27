/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const TechParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Underwater particles - menggunakan brand colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000; // More particles for underwater feel
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 120;
      posArray[i + 1] = (Math.random() - 0.5) * 120;
      posArray[i + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Teh Group Brand Cyan - #51bed2
        colorsArray[i] = 0.32;
        colorsArray[i + 1] = 0.75;
        colorsArray[i + 2] = 0.82;
      } else if (colorChoice < 0.66) {
        // Teh Group Light Cyan - #5ec6de
        colorsArray[i] = 0.37;
        colorsArray[i + 1] = 0.78;
        colorsArray[i + 2] = 0.87;
      } else {
        // Teh Group Deep Blue - #235977
        colorsArray[i] = 0.14;
        colorsArray[i + 1] = 0.35;
        colorsArray[i + 2] = 0.47;
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.6, // More subtle for underwater feel
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Network lines - Teh Group Ocean Cyan
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x51bed2,
      transparent: true,
      opacity: 0.15,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];

    for (let i = 0; i < 100; i++) {
      const x1 = (Math.random() - 0.5) * 100;
      const y1 = (Math.random() - 0.5) * 100;
      const z1 = (Math.random() - 0.5) * 50;
      const x2 = x1 + (Math.random() - 0.5) * 20;
      const y2 = y1 + (Math.random() - 0.5) * 20;
      const z2 = z1 + (Math.random() - 0.5) * 20;

      linePositions.push(x1, y1, z1, x2, y2, z2);
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // AI Brain - Teh Group Cyan
    const brainGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const brainMaterial = new THREE.MeshBasicMaterial({
      color: 0x5ec6de,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const aiBrain = new THREE.Mesh(brainGeometry, brainMaterial);
    aiBrain.position.set(-30, 20, -20);
    scene.add(aiBrain);

    // Cybersecurity Shield - Teh Group Ocean Blue
    const shieldGeometry = new THREE.OctahedronGeometry(4, 0);
    const shieldMaterial = new THREE.MeshBasicMaterial({
      color: 0x3ea6bd,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cyberShield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    cyberShield.position.set(30, -15, -15);
    scene.add(cyberShield);

    // Enterprise Network - Teh Group Deep Blue
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x265b77,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const enterpriseCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    enterpriseCube.position.set(0, -25, -10);
    scene.add(enterpriseCube);

    // Data streams - Teh Group Ocean Variations
    const rings = [];
    for (let i = 0; i < 6; i++) {
      const ringGeometry = new THREE.TorusGeometry(2, 0.3, 16, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x51bed2 : 0x3ea6bd,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30
      );
      ring.userData = {
        floatSpeed: Math.random() * 0.02 + 0.01,
        initialY: ring.position.y,
      };
      scene.add(ring);
      rings.push(ring);
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollPosition = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollPosition = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Very slow rotation for calm underwater feel
      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.x = mouseY * 0.02 + Math.sin(time * 0.15) * 0.03;
      particlesMesh.position.y = scrollPosition * -0.01;

      // Gentle calm waves - particles floating peacefully underwater
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        // Slow, gentle wave layers - like calm ocean
        const calmWave1 = Math.sin(x * 0.02 + time * 0.15) * 1.5;
        const calmWave2 = Math.cos(z * 0.015 + time * 0.12) * 1.2;
        const calmWave3 = Math.sin((x + z) * 0.01 + time * 0.18) * 0.8;
        const depthWave = Math.cos(y * 0.01 + time * 0.1) * 0.5;

        // Very slow, smooth interpolation for calm movement
        const targetY = (calmWave1 + calmWave2 + calmWave3 + depthWave) * 0.8;
        positions[i + 1] += (targetY - (positions[i + 1] % 10)) * 0.008;

        // Super gentle horizontal drift - barely noticeable like deep water
        positions[i] += Math.sin(time * 0.05 + i * 0.1) * 0.003;
        positions[i + 2] += Math.cos(time * 0.06 + i * 0.1) * 0.002;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      // Lines sway very slowly like seaweed in calm current
      lines.rotation.y += 0.0003;
      lines.rotation.x = Math.sin(time * 0.15) * 0.05 + scrollPosition * 0.0002;
      lines.rotation.z = Math.cos(time * 0.12) * 0.03;

      // Brain floats very slowly like jellyfish in calm water
      aiBrain.rotation.x += 0.003;
      aiBrain.rotation.y += 0.004;
      const brainScale = 1 + Math.sin(time * 0.5) * 0.08;
      aiBrain.scale.set(brainScale, brainScale, brainScale);
      // Slow up-down float
      aiBrain.position.y += Math.sin(time * 0.25) * 0.015;
      aiBrain.position.x += Math.cos(time * 0.18) * 0.01;
      aiBrain.position.z = -20 + Math.sin(time * 0.2) * 2;

      // Shield drifts peacefully
      cyberShield.rotation.x += 0.004;
      cyberShield.rotation.y += 0.003;
      cyberShield.rotation.z += 0.005;
      const shieldScale = 1 + Math.sin(time * 0.6) * 0.06;
      cyberShield.scale.set(shieldScale, shieldScale, shieldScale);
      cyberShield.position.y += Math.sin(time * 0.22) * 0.012;
      cyberShield.position.x += Math.cos(time * 0.28) * 0.008;
      cyberShield.position.z = -15 + Math.cos(time * 0.25) * 2;

      // Cube sways very gently - almost still
      enterpriseCube.rotation.x += 0.003;
      enterpriseCube.rotation.y += 0.0035;
      enterpriseCube.rotation.z = Math.sin(time * 0.2) * 0.05;
      enterpriseCube.position.y += Math.cos(time * 0.3) * 0.01;
      enterpriseCube.position.x = Math.sin(time * 0.18) * 0.5;

      // Rings rise very slowly like air bubbles in thick water
      rings.forEach((ring, idx) => {
        const riseSpeed = ring.userData.floatSpeed * 0.5; // Slower rise
        const waveOffset = idx * 2;

        // Slow, gentle rise and fall
        ring.position.y =
          ring.userData.initialY +
          Math.sin(time * riseSpeed * 0.3 + waveOffset) * 8 +
          Math.cos(time * riseSpeed * 0.15 + waveOffset) * 4;

        // Very slow rotation
        ring.rotation.z += 0.008;
        ring.rotation.x += 0.004;
        ring.rotation.y = Math.sin(time * 0.15 + idx) * 0.3;

        // Gentle sideways drift
        ring.position.x = (Math.random() - 0.5) * 60 + Math.sin(time * 0.12 + idx) * 3;
        ring.position.z = Math.sin(scrollPosition * 0.003 + idx) * 4 +
                          Math.cos(time * 0.18 + idx) * 2;
      });

      // Camera subtle movement - like being suspended underwater
      const cameraSwayX = Math.sin(time * 0.08) * 1.5;
      const cameraSwayY = Math.cos(time * 0.1) * 1;
      camera.position.x = mouseX * 4 + cameraSwayX;
      camera.position.y = mouseY * 4 + cameraSwayY;
      camera.position.z = 50 + Math.sin(time * 0.05) * 0.5; // Subtle zoom in/out
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};
