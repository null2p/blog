'use client';

import { useEffect, useRef, useCallback, RefObject } from 'react';
import { createProgram, getUniformLocations, getAttribLocations, createBuffer, createTexture } from '../utils/shader-compiler';

type UniformValue = number | number[] | Float32Array;

interface Uniforms {
  [key: string]: UniformValue;
}

interface UseWebGLRendererOptions {
  vertexShader: string;
  fragmentShader: string;
  uniforms?: Uniforms;
}

interface WebGLRendererState {
  gl: WebGLRenderingContext | null;
  program: WebGLProgram | null;
  texture: WebGLTexture | null;
  uniformLocations: Record<string, WebGLUniformLocation | null>;
  attribLocations: Record<string, number>;
  animationFrameId: number | null;
}

export function useWebGLRenderer(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  backgroundImageSrc: string,
  options: UseWebGLRendererOptions
) {
  const stateRef = useRef<WebGLRendererState>({
    gl: null,
    program: null,
    texture: null,
    uniformLocations: {},
    attribLocations: {},
    animationFrameId: null,
  });

  const uniformsRef = useRef<Uniforms>(options.uniforms || {});
  const imageRef = useRef<HTMLImageElement | null>(null);
  const isInitializedRef = useRef(false);
  const shadersRef = useRef({ vertex: options.vertexShader, fragment: options.fragmentShader });

  // Update uniforms without re-initializing
  const updateUniforms = useCallback((newUniforms: Uniforms) => {
    uniformsRef.current = { ...uniformsRef.current, ...newUniforms };
  }, []);

  // Set uniform value based on type
  const setUniform = useCallback((
    gl: WebGLRenderingContext,
    location: WebGLUniformLocation | null,
    value: UniformValue
  ) => {
    if (!location) return;

    if (typeof value === 'number') {
      gl.uniform1f(location, value);
    } else if (Array.isArray(value) || value instanceof Float32Array) {
      switch (value.length) {
        case 2:
          gl.uniform2fv(location, value);
          break;
        case 3:
          gl.uniform3fv(location, value);
          break;
        case 4:
          gl.uniform4fv(location, value);
          break;
        default:
          gl.uniform1fv(location, value);
      }
    }
  }, []);

  // Render frame
  const render = useCallback(() => {
    const { gl, program, texture, uniformLocations } = stateRef.current;
    if (!gl || !program || !texture) return;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);

    // Bind texture
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    setUniform(gl, uniformLocations['u_background'], 0);

    // Update all uniforms
    for (const [name, value] of Object.entries(uniformsRef.current)) {
      setUniform(gl, uniformLocations[name], value);
    }

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, [setUniform]);

  // Animation loop
  const animate = useCallback(() => {
    render();
    stateRef.current.animationFrameId = requestAnimationFrame(animate);
  }, [render]);

  // Initialize WebGL
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isInitializedRef.current) return;

    const initWebGL = () => {
      const canvas = canvasRef.current;
      if (!canvas) return false;

      const gl = canvas.getContext('webgl', {
        alpha: true,
        premultipliedAlpha: false,
        preserveDrawingBuffer: false,
      });

      if (!gl) {
        console.error('WebGL not supported');
        return false;
      }

      stateRef.current.gl = gl;

      // Compile shaders and create program
      const program = createProgram(gl, shadersRef.current.vertex, shadersRef.current.fragment);
      if (!program) {
        console.error('Failed to create WebGL program');
        return false;
      }

      stateRef.current.program = program;

      // Get uniform locations
      const uniformNames = [
        'u_background',
        'u_resolution',
        'u_elementPos',
        'u_elementSize',
        'u_bgSize',
        'u_mousePos',
        'u_mouseRadius',
        'u_displacementScale',
        'u_aberrationIntensity',
        'u_blurAmount',
        'u_saturation',
        'u_refractionStrength',
        'u_time',
      ];
      stateRef.current.uniformLocations = getUniformLocations(gl, program, uniformNames);

      // Get attribute locations
      stateRef.current.attribLocations = getAttribLocations(gl, program, ['a_position', 'a_texCoord']);

      // Create vertex buffer (full-screen quad)
      const positions = new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
         1,  1,
      ]);
      const positionBuffer = createBuffer(gl, positions);

      // Create texture coordinate buffer
      const texCoords = new Float32Array([
        0, 1,
        1, 1,
        0, 0,
        1, 0,
      ]);
      const texCoordBuffer = createBuffer(gl, texCoords);

      // Setup attributes
      const { a_position, a_texCoord } = stateRef.current.attribLocations;

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(a_position);
      gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.enableVertexAttribArray(a_texCoord);
      gl.vertexAttribPointer(a_texCoord, 2, gl.FLOAT, false, 0, 0);

      // Load background image
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => {
        imageRef.current = image;
        const texture = createTexture(gl, image);
        if (texture) {
          stateRef.current.texture = texture;

          // Set initial uniforms
          updateUniforms({
            u_bgSize: [image.width, image.height],
          });

          // Start animation loop
          isInitializedRef.current = true;
          animate();
        }
      };
      image.onerror = () => {
        console.error('Failed to load background image:', backgroundImageSrc);
      };
      image.src = backgroundImageSrc;

      return true;
    };

    // Try to initialize, retry if canvas not ready
    if (!initWebGL()) {
      const retryInterval = setInterval(() => {
        if (initWebGL()) {
          clearInterval(retryInterval);
        }
      }, 50);

      return () => clearInterval(retryInterval);
    }

    // Cleanup
    return () => {
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
      if (stateRef.current.gl && stateRef.current.texture) {
        stateRef.current.gl.deleteTexture(stateRef.current.texture);
      }
      if (stateRef.current.gl && stateRef.current.program) {
        stateRef.current.gl.deleteProgram(stateRef.current.program);
      }
      isInitializedRef.current = false;
    };
  }, [backgroundImageSrc, animate, updateUniforms]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        updateUniforms({
          u_resolution: [window.innerWidth, window.innerHeight],
          u_elementSize: [width, height],
        });
      }
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [canvasRef, updateUniforms]);

  return {
    updateUniforms,
    isInitialized: isInitializedRef.current,
  };
}
