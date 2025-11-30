'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LiquidWater() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create water plane geometry
    const geometry = new THREE.PlaneGeometry(20, 10, 128, 128);

    // Custom shader material for liquid effect
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        varying vec2 vUv;
        varying float vDisplacement;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Create multiple wave layers
          float wave1 = sin(pos.x * 2.0 + uTime * 0.4) * 0.15;
          float wave2 = sin(pos.y * 3.0 + uTime * 0.6) * 0.12;
          float wave3 = sin((pos.x + pos.y) * 1.5 + uTime * 0.3) * 0.18;
          float wave4 = cos(pos.x * 1.0 - uTime * 0.5) * 0.1;

          // Mouse interaction ripple
          float dist = distance(uv, uMouse);
          float ripple = sin(dist * 15.0 - uTime * 3.0) * 0.08 * (1.0 - smoothstep(0.0, 0.5, dist));

          vDisplacement = wave1 + wave2 + wave3 + wave4 + ripple;
          pos.z += vDisplacement;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vDisplacement;

        void main() {
          // Water-like colors with variation
          vec3 waterDeep = vec3(0.2, 0.4, 0.7);
          vec3 waterShallow = vec3(0.4, 0.65, 0.85);
          vec3 waterHighlight = vec3(0.6, 0.8, 0.95);

          // Mix colors based on displacement
          float mixer = (vDisplacement + 0.3) * 1.5;
          vec3 color = mix(waterDeep, waterShallow, mixer);
          color = mix(color, waterHighlight, smoothstep(0.2, 0.4, mixer));

          // Add fresnel-like effect
          float fresnel = pow(1.0 - abs(vDisplacement), 2.0);
          color += vec3(fresnel * 0.1);

          // Transparency with variation
          float alpha = 0.25 + abs(vDisplacement) * 0.3;

          gl_FragColor = vec4(color, alpha);
        }
      `,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse tracking
    let mouseX = 0.5;
    let mouseY = 0.5;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (event.clientX - rect.left) / rect.width;
      mouseY = 1.0 - (event.clientY - rect.top) / rect.height;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = (event.touches[0].clientX - rect.left) / rect.width;
        mouseY = 1.0 - (event.touches[0].clientY - rect.top) / rect.height;
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      material.uniforms.uTime.value = elapsedTime;
      material.uniforms.uMouse.value.set(mouseX, mouseY);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
      }}
    />
  );
}
