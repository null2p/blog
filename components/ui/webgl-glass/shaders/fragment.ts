export const fragmentShader = `
  precision highp float;

  uniform sampler2D u_background;
  uniform vec2 u_resolution;
  uniform vec2 u_elementPos;
  uniform vec2 u_elementSize;
  uniform vec2 u_bgSize;
  uniform float u_aberrationIntensity;
  uniform float u_blurAmount;
  uniform float u_saturation;
  uniform float u_refractionStrength;
  uniform float u_time;

  varying vec2 v_texCoord;

  // Saturation adjustment
  vec3 adjustSaturation(vec3 color, float sat) {
    vec3 grey = vec3(dot(color, vec3(0.2126, 0.7152, 0.0722)));
    return mix(grey, color, sat);
  }


  void main() {
    vec2 fragUV = v_texCoord;

    // Calculate the screen position of this fragment
    // u_elementPos is the top-left corner of the element in screen coordinates
    vec2 screenPos = u_elementPos + fragUV * u_elementSize;

    // Calculate background UV with cover behavior
    // The background image covers the entire viewport
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

    // Clamp UV to valid range
    bgUV = clamp(bgUV, 0.0, 1.0);

    // Edge refraction - 가장자리 굴절 효과
    // Calculate distance from edge (0 = edge, 1 = center)
    float edgeDistX = min(fragUV.x, 1.0 - fragUV.x) * 2.0;
    float edgeDistY = min(fragUV.y, 1.0 - fragUV.y) * 2.0;
    float edgeDist = min(edgeDistX, edgeDistY);

    // Refraction strength (strong at edges, zero at center)
    // 0.12 = refraction stays very close to edges
    float edgeFactor = 1.0 - smoothstep(0.0, 0.12, edgeDist);

    // Direction from fragment to center
    vec2 toCenter = vec2(0.5) - fragUV;
    vec2 refractionOffset = normalize(toCenter) * edgeFactor * u_refractionStrength * 0.015;

    // Apply refraction to background UV
    vec2 refractedUV = clamp(bgUV + refractionOffset, 0.0, 1.0);

    // Chromatic aberration - sample RGB channels with slight offsets (no blur - CSS handles that)
    float aberration = u_aberrationIntensity * 0.003;
    vec2 aberrationDir = vec2(aberration, 0.0);

    float r = texture2D(u_background, refractedUV + aberrationDir).r;
    float g = texture2D(u_background, refractedUV).g;
    float b = texture2D(u_background, refractedUV - aberrationDir).b;

    vec3 color = vec3(r, g, b);

    // Apply saturation
    color = adjustSaturation(color, u_saturation / 100.0);

    // Add subtle glass tint
    color = mix(color, color * vec3(1.02, 1.01, 1.03), 0.3);

    gl_FragColor = vec4(color, 1.0);
  }
`;
