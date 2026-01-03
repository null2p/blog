/**
 * WebGL Shader Compiler Utilities
 */

export function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
): WebGLProgram | null {
  const vertexShader = compileShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  // Clean up shaders after linking
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  return program;
}

export function getUniformLocations<T extends string>(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  uniforms: T[]
): Record<T, WebGLUniformLocation | null> {
  const locations = {} as Record<T, WebGLUniformLocation | null>;
  for (const name of uniforms) {
    locations[name] = gl.getUniformLocation(program, name);
  }
  return locations;
}

export function getAttribLocations<T extends string>(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  attribs: T[]
): Record<T, number> {
  const locations = {} as Record<T, number>;
  for (const name of attribs) {
    locations[name] = gl.getAttribLocation(program, name);
  }
  return locations;
}

export function createBuffer(
  gl: WebGLRenderingContext,
  data: Float32Array,
  usage: number = gl.STATIC_DRAW
): WebGLBuffer | null {
  const buffer = gl.createBuffer();
  if (!buffer) return null;

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);

  return buffer;
}

export function createTexture(
  gl: WebGLRenderingContext,
  image: HTMLImageElement | HTMLCanvasElement,
  options: {
    wrap?: number;
    filter?: number;
  } = {}
): WebGLTexture | null {
  const texture = gl.createTexture();
  if (!texture) return null;

  const wrap = options.wrap ?? gl.CLAMP_TO_EDGE;
  const filter = options.filter ?? gl.LINEAR;

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);

  return texture;
}
