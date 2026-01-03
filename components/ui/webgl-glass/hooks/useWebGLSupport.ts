'use client';

import { useState, useEffect } from 'react';

interface WebGLSupportInfo {
  supported: boolean;
  version: 1 | 2 | null;
  maxTextureSize: number;
  renderer: string | null;
}

export function useWebGLSupport(): WebGLSupportInfo {
  const [support, setSupport] = useState<WebGLSupportInfo>({
    supported: false,
    version: null,
    maxTextureSize: 0,
    renderer: null,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = document.createElement('canvas');

    // Try WebGL2 first
    let gl: WebGLRenderingContext | WebGL2RenderingContext | null =
      canvas.getContext('webgl2');
    let version: 1 | 2 | null = gl ? 2 : null;

    // Fall back to WebGL1
    if (!gl) {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      version = gl ? 1 : null;
    }

    if (!gl) {
      setSupport({
        supported: false,
        version: null,
        maxTextureSize: 0,
        renderer: null,
      });
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    setSupport({
      supported: true,
      version,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      renderer,
    });
  }, []);

  return support;
}

export function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;

  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2') ||
             canvas.getContext('webgl') ||
             canvas.getContext('experimental-webgl');

  return gl !== null;
}
