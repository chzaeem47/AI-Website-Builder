import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./Strands.css";

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = `#version 300 es
in vec2 position;

void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(
    2.0 * PI * (t + vec3(0.00, 0.33, 0.67))
  );
}

vec3 samplePalette(float t) {
  t = fract(t);

  float scaled = t * float(uColorCount);
  int index = int(floor(scaled));
  float blend = fract(scaled);

  int nextIndex = index + 1;

  if (nextIndex >= uColorCount) {
    nextIndex = 0;
  }

  return mix(
    uColors[index],
    uColors[nextIndex],
    blend
  );
}

vec3 strandColor(float t) {
  if (uColorCount > 0) {
    return samplePalette(t);
  }

  return spectrum(t);
}

void main() {
  vec2 uv =
    (gl_FragCoord.xy - 0.5 * uResolution) /
    uResolution.y;

  uv /= max(uScale, 0.0001);

  float energy = 0.06 + uIntensity * 0.94;

  float envelope = pow(
    max(cos(uv.x * PI * 1.3), 0.0),
    uTaper
  );

  vec3 color = vec3(0.0);

  for (int i = 0; i < ${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) {
      break;
    }

    float strandIndex = float(i);
    float phase = strandIndex * 1.7 * uSpread;
    float frequency =
      (2.0 + strandIndex * 0.35) *
      uWaviness;

    float strandSpeed =
      1.4 + strandIndex * 1.2;

    float time = uTime * uSpeed;

    float wave =
      sin(
        uv.x * frequency +
        time * strandSpeed +
        phase
      ) * 0.60
      +
      sin(
        uv.x * frequency * 1.1 -
        time * strandSpeed * 0.7 +
        phase * 1.7
      ) * 0.40;

    float amplitude =
      (0.1 + 0.02 * energy) *
      envelope *
      uAmplitude;

    float y = wave * amplitude;

    float distanceFromLine =
      abs(uv.y - y);

    float thickness =
      (0.001 + 0.05 * energy) *
      (0.35 + envelope) *
      uThickness;

    float glow =
      thickness /
      (distanceFromLine + thickness * 0.45);

    glow *= glow;

    float hue =
      strandIndex / float(uStrandCount) +
      uv.x * 0.30 +
      uTime * 0.04;

    color +=
      strandColor(hue) *
      glow *
      envelope;
  }

  color *= 0.45 + 0.7 * energy;

  color =
    1.0 -
    exp(-color * uGlow);

  float gray =
    dot(
      color,
      vec3(0.2126, 0.7152, 0.0722)
    );

  color =
    max(
      mix(
        vec3(gray),
        color,
        uSaturation
      ),
      0.0
    );

  float luminance =
    max(
      max(color.r, color.g),
      color.b
    );

  float alpha =
    clamp(luminance, 0.0, 1.0) *
    uOpacity;

  fragColor = vec4(
    color * uOpacity,
    alpha
  );
}
`;

const buildPalette = (colors) => {
  const sourceColors =
    colors && colors.length
      ? colors
      : ["#ffffff"];

  const palette = [];

  for (let i = 0; i < MAX_COLORS; i++) {
    const hex =
      sourceColors[i] ??
      sourceColors[sourceColors.length - 1];

    const color = new Color(hex);

    palette.push([
      color.r,
      color.g,
      color.b,
    ]);
  }

  return palette;
};

function Strands({
  colors = ["#7C3AED", "#3B82F6", "#EC4899"],
  count = 3,
  speed = 0.5,
  amplitude = 1,
  waviness = 1,
  thickness = 0.7,
  glow = 2.6,
  taper = 3,
  spread = 1,
  intensity = 0.6,
  saturation = 1.5,
  opacity = 1,
  scale = 1.5,
  className = "",
}) {
  const containerRef = useRef(null);

  const propsRef = useRef({});

  propsRef.current = {
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    intensity,
    saturation,
    opacity,
    scale,
  };

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true,
    });

    const gl = renderer.gl;

    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(
      gl.ONE,
      gl.ONE_MINUS_SRC_ALPHA
    );

    gl.canvas.style.backgroundColor =
      "transparent";

    const geometry = new Triangle(gl);

    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },

        uResolution: {
          value: [
            container.offsetWidth,
            container.offsetHeight,
          ],
        },

        uColors: {
          value: buildPalette(
            propsRef.current.colors
          ),
        },

        uColorCount: {
          value: Math.min(
            propsRef.current.colors.length,
            MAX_COLORS
          ),
        },

        uStrandCount: {
          value: Math.min(
            propsRef.current.count,
            MAX_STRANDS
          ),
        },

        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaviness: { value: waviness },
        uThickness: { value: thickness },
        uGlow: { value: glow },
        uTaper: { value: taper },
        uSpread: { value: spread },
        uIntensity: { value: intensity },
        uOpacity: { value: opacity },
        uScale: { value: scale },
        uSaturation: { value: saturation },
      },
    });

    const mesh = new Mesh(gl, {
      geometry,
      program,
    });

    container.appendChild(gl.canvas);

    const resize = () => {
      const width = container.offsetWidth;
      const height = container.offsetHeight;

      renderer.setSize(width, height);

      program.uniforms.uResolution.value = [
        width,
        height,
      ];
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    let animationFrameId;

    const update = (time) => {
      animationFrameId =
        requestAnimationFrame(update);

      const current = propsRef.current;

      program.uniforms.uTime.value =
        time * 0.001;

      program.uniforms.uColors.value =
        buildPalette(current.colors);

      program.uniforms.uColorCount.value =
        Math.min(
          current.colors.length,
          MAX_COLORS
        );

      program.uniforms.uStrandCount.value =
        Math.min(
          Math.max(
            Math.round(current.count),
            1
          ),
          MAX_STRANDS
        );

      program.uniforms.uSpeed.value =
        current.speed;

      program.uniforms.uAmplitude.value =
        current.amplitude;

      program.uniforms.uWaviness.value =
        current.waviness;

      program.uniforms.uThickness.value =
        current.thickness;

      program.uniforms.uGlow.value =
        current.glow;

      program.uniforms.uTaper.value =
        current.taper;

      program.uniforms.uSpread.value =
        current.spread;

      program.uniforms.uIntensity.value =
        current.intensity;

      program.uniforms.uOpacity.value =
        current.opacity;

      program.uniforms.uScale.value =
        current.scale;

      program.uniforms.uSaturation.value =
        current.saturation;

      renderer.render({
        scene: mesh,
      });
    };

    animationFrameId =
      requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(
        animationFrameId
      );

      window.removeEventListener(
        "resize",
        resize
      );

      if (
        gl.canvas.parentNode === container
      ) {
        container.removeChild(gl.canvas);
      }

      gl
        .getExtension(
          "WEBGL_lose_context"
        )
        ?.loseContext();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`strands-container ${className}`}
    />
  );
}

export default Strands;