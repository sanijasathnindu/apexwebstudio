"use client";

import { useEffect, useRef } from "react";

type GLResources = {
  program: WebGLProgram;
  position: WebGLBuffer;
  normal: WebGLBuffer;
  triangleIndex: WebGLBuffer;
  lineIndex: WebGLBuffer;
  particleBuffer: WebGLBuffer;
  triangleCount: number;
  lineCount: number;
  particleCount: number;
  attributes: {
    position: number;
    normal: number;
  };
  uniforms: {
    time: WebGLUniformLocation | null;
    mouse: WebGLUniformLocation | null;
    aspect: WebGLUniformLocation | null;
    mode: WebGLUniformLocation | null;
  };
};

const vertexShaderSource = `
  precision highp float;

  attribute vec3 aPosition;
  attribute vec3 aNormal;

  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uMode;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vPulse;

  mat3 rotationX(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(
      1.0, 0.0, 0.0,
      0.0, c, -s,
      0.0, s, c
    );
  }

  mat3 rotationY(float a) {
    float s = sin(a);
    float c = cos(a);
    return mat3(
      c, 0.0, s,
      0.0, 1.0, 0.0,
      -s, 0.0, c
    );
  }

  void main() {
    vec3 position = aPosition;
    vec3 normal = normalize(aNormal);

    float wave =
      sin(position.x * 3.4 + uTime * 1.25) *
      sin(position.y * 4.2 - uTime * 0.9) *
      sin(position.z * 3.8 + uTime * 0.7);

    float displacement = uMode < 1.5 ? wave * 0.17 : 0.0;
    position += normal * displacement;

    float rotY = uTime * 0.12 + uMouse.x * 0.42;
    float rotX = uTime * 0.07 - uMouse.y * 0.28;
    mat3 rotation = rotationY(rotY) * rotationX(rotX);

    position = rotation * position;
    normal = rotation * normal;

    if (uMode > 1.5) {
      position.xy += vec2(
        sin(position.z * 13.0 + uTime) * 0.03,
        cos(position.x * 11.0 - uTime * 0.8) * 0.03
      );
    }

    position.z += 4.6;
    float perspective = 2.4 / max(position.z, 0.5);
    vec2 projected = position.xy * perspective;
    projected.x /= uAspect;

    gl_Position = vec4(projected, (position.z - 4.6) * 0.12, 1.0);
    gl_PointSize = uMode > 1.5 ? 2.0 + 2.0 * (0.5 + 0.5 * sin(uTime + position.x * 12.0)) : 1.0;

    vNormal = normal;
    vPosition = position;
    vPulse = wave;
  }
`;

const fragmentShaderSource = `
  precision highp float;

  uniform float uTime;
  uniform float uMode;

  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vPulse;

  void main() {
    if (uMode > 1.5) {
      float distanceToCenter = length(gl_PointCoord - vec2(0.5));
      if (distanceToCenter > 0.5) discard;
      float alpha = smoothstep(0.5, 0.0, distanceToCenter);
      vec3 sparkle = mix(vec3(0.42, 0.75, 1.0), vec3(0.95, 0.75, 1.0), 0.5 + 0.5 * sin(uTime + vPosition.x));
      gl_FragColor = vec4(sparkle, alpha * 0.72);
      return;
    }

    if (uMode > 0.5) {
      gl_FragColor = vec4(0.76, 0.83, 1.0, 0.22);
      return;
    }

    vec3 lightDirection = normalize(vec3(-0.35, 0.55, 0.9));
    float diffuse = max(dot(normalize(vNormal), lightDirection), 0.0);
    float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.2);
    float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + vPulse * 5.0);

    vec3 deep = vec3(0.18, 0.05, 0.56);
    vec3 violet = vec3(0.45, 0.12, 0.98);
    vec3 cyan = vec3(0.23, 0.72, 1.0);

    vec3 color = mix(deep, violet, diffuse * 0.9 + 0.18);
    color = mix(color, cyan, fresnel * 0.45 + pulse * 0.05);
    color += vec3(0.12, 0.04, 0.2) * fresnel;

    gl_FragColor = vec4(color, 0.97);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create WebGL shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || "Unknown shader error";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext) {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  if (!program) throw new Error("Unable to create WebGL program");

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) || "Unknown link error";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

function buildSphere(latitudeBands = 34, longitudeBands = 46) {
  const positions: number[] = [];
  const normals: number[] = [];
  const triangles: number[] = [];
  const lines: number[] = [];

  for (let latitude = 0; latitude <= latitudeBands; latitude += 1) {
    const theta = (latitude * Math.PI) / latitudeBands;
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);

    for (let longitude = 0; longitude <= longitudeBands; longitude += 1) {
      const phi = (longitude * Math.PI * 2) / longitudeBands;
      const x = Math.cos(phi) * sinTheta;
      const y = cosTheta;
      const z = Math.sin(phi) * sinTheta;
      const radius = 1.36;

      normals.push(x, y, z);
      positions.push(x * radius, y * radius, z * radius);
    }
  }

  for (let latitude = 0; latitude < latitudeBands; latitude += 1) {
    for (let longitude = 0; longitude < longitudeBands; longitude += 1) {
      const first = latitude * (longitudeBands + 1) + longitude;
      const second = first + longitudeBands + 1;

      triangles.push(first, second, first + 1);
      triangles.push(second, second + 1, first + 1);

      if (latitude % 2 === 0 || longitude % 2 === 0) {
        lines.push(first, first + 1, first, second);
      }
    }
  }

  return {
    positions: new Float32Array(positions),
    normals: new Float32Array(normals),
    triangles: new Uint16Array(triangles),
    lines: new Uint16Array(lines),
  };
}

function buildParticles(count = 145) {
  const points = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const radius = 1.8 + Math.random() * 1.9;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    points[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
    points[index * 3 + 1] = radius * Math.cos(phi);
    points[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
  }

  return points;
}

function createResources(gl: WebGLRenderingContext): GLResources {
  const program = createProgram(gl);
  const sphere = buildSphere();
  const particles = buildParticles();

  const position = gl.createBuffer();
  const normal = gl.createBuffer();
  const triangleIndex = gl.createBuffer();
  const lineIndex = gl.createBuffer();
  const particleBuffer = gl.createBuffer();

  if (!position || !normal || !triangleIndex || !lineIndex || !particleBuffer) {
    throw new Error("Unable to allocate WebGL buffers");
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, position);
  gl.bufferData(gl.ARRAY_BUFFER, sphere.positions, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, normal);
  gl.bufferData(gl.ARRAY_BUFFER, sphere.normals, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triangleIndex);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.triangles, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, lineIndex);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, sphere.lines, gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, particles, gl.STATIC_DRAW);

  return {
    program,
    position,
    normal,
    triangleIndex,
    lineIndex,
    particleBuffer,
    triangleCount: sphere.triangles.length,
    lineCount: sphere.lines.length,
    particleCount: particles.length / 3,
    attributes: {
      position: gl.getAttribLocation(program, "aPosition"),
      normal: gl.getAttribLocation(program, "aNormal"),
    },
    uniforms: {
      time: gl.getUniformLocation(program, "uTime"),
      mouse: gl.getUniformLocation(program, "uMouse"),
      aspect: gl.getUniformLocation(program, "uAspect"),
      mode: gl.getUniformLocation(program, "uMode"),
    },
  };
}

function bindSphereAttributes(
  gl: WebGLRenderingContext,
  resources: GLResources
) {
  gl.bindBuffer(gl.ARRAY_BUFFER, resources.position);
  gl.enableVertexAttribArray(resources.attributes.position);
  gl.vertexAttribPointer(resources.attributes.position, 3, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, resources.normal);
  gl.enableVertexAttribArray(resources.attributes.normal);
  gl.vertexAttribPointer(resources.attributes.normal, 3, gl.FLOAT, false, 0, 0);
}

function bindParticles(gl: WebGLRenderingContext, resources: GLResources) {
  gl.bindBuffer(gl.ARRAY_BUFFER, resources.particleBuffer);
  gl.enableVertexAttribArray(resources.attributes.position);
  gl.vertexAttribPointer(resources.attributes.position, 3, gl.FLOAT, false, 0, 0);

  gl.disableVertexAttribArray(resources.attributes.normal);
  gl.vertexAttrib3f(resources.attributes.normal, 0, 0, 1);
}

export default function WebGLScene() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const element = canvas.current;
    if (!element) return;

    const gl = element.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      element.classList.add("webglUnavailable");
      return;
    }

    let resources: GLResources;
    try {
      resources = createResources(gl);
    } catch (error) {
      console.error("APEX WebGL scene failed to initialise", error);
      element.classList.add("webglUnavailable");
      return;
    }

    const pointer = { x: 0, y: 0 };
    const smoothed = { x: 0, y: 0 };
    let frame = 0;
    let running = true;

    const resize = () => {
      const rect = element.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));

      if (element.width !== width || element.height !== height) {
        element.width = width;
        element.height = height;
      }

      gl.viewport(0, 0, width, height);
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (timeMs: number) => {
      if (!running) return;

      resize();
      smoothed.x += (pointer.x - smoothed.x) * 0.045;
      smoothed.y += (pointer.y - smoothed.y) * 0.045;

      const time = timeMs * 0.001;
      const aspect = element.width / Math.max(element.height, 1);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      gl.enable(gl.DEPTH_TEST);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.useProgram(resources.program);

      gl.uniform1f(resources.uniforms.time, time);
      gl.uniform2f(resources.uniforms.mouse, smoothed.x, smoothed.y);
      gl.uniform1f(resources.uniforms.aspect, aspect);

      bindSphereAttributes(gl, resources);

      gl.uniform1f(resources.uniforms.mode, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, resources.triangleIndex);
      gl.drawElements(gl.TRIANGLES, resources.triangleCount, gl.UNSIGNED_SHORT, 0);

      gl.disable(gl.DEPTH_TEST);
      gl.uniform1f(resources.uniforms.mode, 1);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, resources.lineIndex);
      gl.drawElements(gl.LINES, resources.lineCount, gl.UNSIGNED_SHORT, 0);

      bindParticles(gl, resources);
      gl.uniform1f(resources.uniforms.mode, 2);
      gl.drawArrays(gl.POINTS, 0, resources.particleCount);

      frame = window.requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = window.requestAnimationFrame(draw);
        } else if (!entry.isIntersecting && running) {
          running = false;
          window.cancelAnimationFrame(frame);
        }
      },
      { threshold: 0.01 }
    );

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(element);
    observer.observe(element);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      running = false;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);

      gl.deleteProgram(resources.program);
      gl.deleteBuffer(resources.position);
      gl.deleteBuffer(resources.normal);
      gl.deleteBuffer(resources.triangleIndex);
      gl.deleteBuffer(resources.lineIndex);
      gl.deleteBuffer(resources.particleBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      className="nativeWebGLScene"
      aria-label="Interactive animated APEX digital form"
    />
  );
}
