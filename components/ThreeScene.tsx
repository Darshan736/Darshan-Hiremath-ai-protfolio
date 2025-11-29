
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ThreeSceneProps {
  frequencyData: Uint8Array | null;
  isAudioPlaying: boolean;
}

const vertexShader = `
  uniform float time;
  uniform float audioLevel;
  varying vec3 vNormal;
  
  // Perlin noise function
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vNormal = normalize(normalMatrix * normal);
    float noise = snoise(position * 2.0 + time * 0.2) * 0.5 + 0.5;
    vec3 newPosition = position + normal * noise * audioLevel * 2.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  uniform float audioLevel;
  varying vec3 vNormal;

  void main() {
    float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    vec3 color = vec3(1.0, 0.3, 0.2) * (1.0 + audioLevel * 2.0);
    gl_FragColor = vec4(color * intensity, 1.0) * (0.5 + audioLevel * 0.5);
  }
`;

const ThreeScene: React.FC<ThreeSceneProps> = ({ frequencyData, isAudioPlaying }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  // FIX: Explicitly initialize useRef with null to prevent potential issues where an undefined initial value could cause downstream type errors.
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.1);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 4;
    controls.maxPolarAngle = (3 * Math.PI) / 4;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xff4e42, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Anomaly Object
    const geometry = new THREE.IcosahedronGeometry(1.5, 32);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
        audioLevel: { value: 0 },
      },
      wireframe: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphereRef.current = sphere;
    scene.add(sphere);

    // Particles
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    // FIX: Replaced Math.random() with THREE.MathUtils.randFloatSpread to resolve a potential environment-specific error.
    // This is also a more idiomatic way to generate random numbers in Three.js.
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = THREE.MathUtils.randFloatSpread(20);
      positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(20);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(20);
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xff4e42,
      size: 0.02,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // Animation loop
    const clock = new THREE.Clock();
    let animationFrameId: number;
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      let audioLevel = 0;
      if (frequencyData && isAudioPlaying) {
        audioLevel = frequencyData.reduce((a, b) => a + b, 0) / (frequencyData.length * 256);
        audioLevel = Math.pow(audioLevel * 5, 2); // Amplify for visual effect
      }

      material.uniforms.time.value = elapsedTime;
      material.uniforms.audioLevel.value = audioLevel;
      
      controls.autoRotateSpeed = 0.5 + audioLevel * 5;
      controls.update();

      if (particlesRef.current) {
         particlesRef.current.rotation.y = elapsedTime * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [frequencyData, isAudioPlaying]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
};

export default ThreeScene;
