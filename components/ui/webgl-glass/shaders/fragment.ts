export const fragmentShader = `
  precision highp float;

  uniform sampler2D u_background;
  uniform vec2 u_resolution;
  uniform vec2 u_elementPos;
  uniform vec2 u_elementSize;
  uniform vec2 u_bgSize;
  uniform vec2 u_mousePos;
  uniform float u_mouseRadius;
  uniform float u_displacementScale;
  uniform float u_aberrationIntensity;
  uniform float u_blurAmount;
  uniform float u_saturation;
  uniform float u_time;

  varying vec2 v_texCoord;

  // Simple pseudo-random
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Saturation adjustment
  vec3 adjustSaturation(vec3 color, float sat) {
    vec3 grey = vec3(dot(color, vec3(0.2126, 0.7152, 0.0722)));
    return mix(grey, color, sat);
  }

  // Simple blur using multiple samples
  vec4 blur(sampler2D tex, vec2 uv, vec2 texelSize, float radius) {
    vec4 color = vec4(0.0);
    float total = 0.0;

    for (float x = -2.0; x <= 2.0; x += 1.0) {
      for (float y = -2.0; y <= 2.0; y += 1.0) {
        vec2 offset = vec2(x, y) * texelSize * radius;
        float weight = 1.0 - length(vec2(x, y)) / 3.0;
        weight = max(weight, 0.0);
        color += texture2D(tex, uv + offset) * weight;
        total += weight;
      }
    }

    return color / total;
  }

  void main() {
    // Convert fragment coordinates to UV
    vec2 fragUV = v_texCoord;

    // Calculate background UV based on element position
    // This maps the element position to the background image with cover behavior
    vec2 screenPos = u_elementPos + fragUV * u_elementSize;

    // Calculate cover UV - the background image covers the viewport
    // We need to figure out how the background is positioned
    float bgAspect = u_bgSize.x / u_bgSize.y;
    float screenAspect = u_resolution.x / u_resolution.y;

    vec2 bgUV;
    if (bgAspect > screenAspect) {
      // Background is wider - fit height, crop sides
      float scale = u_resolution.y / u_bgSize.y;
      float scaledWidth = u_bgSize.x * scale;
      float offsetX = (scaledWidth - u_resolution.x) * 0.5;
      bgUV.x = (screenPos.x + offsetX) / scaledWidth;
      bgUV.y = screenPos.y / u_resolution.y;
    } else {
      // Background is taller - fit width, crop top/bottom
      float scale = u_resolution.x / u_bgSize.x;
      float scaledHeight = u_bgSize.y * scale;
      float offsetY = (scaledHeight - u_resolution.y) * 0.5;
      bgUV.x = screenPos.x / u_resolution.x;
      bgUV.y = (screenPos.y + offsetY) / scaledHeight;
    }

    // Mouse displacement
    vec2 mouseUV = u_mousePos;
    vec2 toMouse = fragUV - mouseUV;
    float mouseDist = length(toMouse);
    float mouseInfluence = smoothstep(u_mouseRadius, 0.0, mouseDist);

    // Displacement based on mouse
    vec2 displacement = normalize(toMouse + 0.001) * mouseInfluence * u_displacementScale * 0.001;

    // Add subtle wave animation
    float wave = sin(fragUV.x * 10.0 + u_time * 2.0) * cos(fragUV.y * 10.0 + u_time * 1.5);
    displacement += vec2(wave, wave) * 0.002;

    // Apply displacement to background UV
    vec2 displacedUV = bgUV + displacement;

    // Chromatic aberration - sample RGB channels with different offsets
    float aberration = u_aberrationIntensity * 0.003;
    vec2 aberrationDir = normalize(toMouse + 0.001) * aberration * mouseInfluence;

    vec2 texelSize = 1.0 / u_bgSize;
    float blurRadius = u_blurAmount * 20.0;

    // Sample with chromatic aberration
    float r = blur(u_background, displacedUV + aberrationDir * 1.0, texelSize, blurRadius).r;
    float g = blur(u_background, displacedUV, texelSize, blurRadius).g;
    float b = blur(u_background, displacedUV - aberrationDir * 1.0, texelSize, blurRadius).b;

    vec3 color = vec3(r, g, b);

    // Apply saturation
    color = adjustSaturation(color, u_saturation / 100.0);

    // Add subtle glass tint
    color = mix(color, color * vec3(1.02, 1.01, 1.03), 0.3);

    // Add subtle specular highlight near mouse
    float specular = pow(mouseInfluence, 3.0) * 0.15;
    color += vec3(specular);

    // Add edge highlight for glass effect
    float edge = 1.0 - smoothstep(0.0, 0.05, min(min(fragUV.x, 1.0 - fragUV.x), min(fragUV.y, 1.0 - fragUV.y)));
    color += vec3(edge * 0.1);

    gl_FragColor = vec4(color, 1.0);
  }
`;
