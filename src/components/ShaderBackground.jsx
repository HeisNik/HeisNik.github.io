 /*Ensure you had installed the package
or read our installation document. (go to lightswind.com/components/Installation)
npm i lightswind@latest*/

"use client";
import { useEffect, useRef, useState } from "react";

const vertexShaderSource = `
  attribute vec4 a_position;
  void main() {
    gl_Position = a_position;
  }
`;

const fragmentShaderSource = `
precision mediump float;
uniform vec2 iResolution; // Canvas resolution (width, height)
uniform float iTime;       // Time in seconds since the animation started
uniform vec3 u_color;     // Custom color uniform

void mainImage(out vec4 fragColor, in vec2 fragCoord){
    vec2 uv = (1.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
    float t = iTime * 0.5;

    for(float i = 8.0; i < 20.0; i++) {
        uv.x += 0.6 / i * cos(i * 2.5 * uv.y + t);
        uv.y += 0.6 / i * cos(i * 1.5 * uv.x + t);
    }

    float wave = abs(sin(t - uv.y - uv.x));
    float glow = smoothstep(0.9, 0.0, wave);

    vec3 color = glow * u_color; // Use the custom color here

    fragColor = vec4(color, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

/**
 * @typedef {Object} ShaderBackgroundProps
 * @property {string} [backdropBlurAmount] - The size of the backdrop blur to apply.
 * Valid values are "none", "sm", "md", "lg", "xl", "2xl", "3xl".
 * Defaults to "sm" if not provided.
 * @property {string} [color] - The color of the shader's glow in hexadecimal format (e.g., "#RRGGBB").
 * Defaults to "#471CE2" (purple) if not provided.
 * @property {string} [className] - Additional CSS classes to apply to the container div.
 */

/**
 * A mapping from simplified blur size names to full Tailwind CSS backdrop-blur classes.
 * This ensures Tailwind's JIT mode can correctly detect and generate the CSS.
 */
const blurClassMap = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  xl: "backdrop-blur-xl",
  "2xl": "backdrop-blur-2xl",
  "3xl": "backdrop-blur-3xl",
};

/**
 * A React component that renders an animated WebGL shader background.
 * The background features a turbulent, glowing wave pattern that animates over time.
 * An optional backdrop blur can be applied over the shader.
 *
 * @param {ShaderBackgroundProps} props - The component props.
 * @returns {JSX.Element} The rendered ShaderBackground component.
 */
function ShaderBackground({
  backdropBlurAmount = "sm",
  color = "#07eae6ff", // Default purple color
  className = "",
}) {
  const canvasRef = useRef(null);
  const isFixed = className.includes('fixed');
  // Initialize canvasSize with viewport dimensions if fixed, otherwise 0
  const [canvasSize, setCanvasSize] = useState(() => {
    if (typeof window !== 'undefined' && isFixed) {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    return { width: 0, height: 0 };
  });

  // Helper to convert hex color to RGB (0-1 range)
  const hexToRgb = (hex) => {
    const r = parseInt(hex.substring(1, 3), 16) / 255;
    const g = parseInt(hex.substring(3, 5), 16) / 255;
    const b = parseInt(hex.substring(5, 7), 16) / 255;
    return [r, g, b];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
    const iTimeLocation = gl.getUniformLocation(program, "iTime");
    const uColorLocation = gl.getUniformLocation(program, "u_color"); // Get uniform location for custom color

    let startTime = Date.now();

    // Set the initial color
    const [r, g, b] = hexToRgb(color);
    gl.uniform3f(uColorLocation, r, g, b);

    const updateCanvasSize = () => {
      // For fixed positioning, use viewport dimensions; otherwise use canvas dimensions
      const width = isFixed ? window.innerWidth : canvas.clientWidth;
      const height = isFixed ? window.innerHeight : canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
      setCanvasSize({ width, height });
      gl.viewport(0, 0, width, height);
      gl.uniform2f(iResolutionLocation, width, height);
    };

    const render = () => {
      updateCanvasSize();

      const currentTime = (Date.now() - startTime) / 1000;

      gl.uniform1f(iTimeLocation, currentTime);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    render();

    // Add resize listener to update canvas when viewport changes
    const handleResize = () => {
      if (isFixed && canvas) {
        updateCanvasSize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [color, isFixed]);

  // Get the correct Tailwind CSS class from the map
  const finalBlurClass =
    blurClassMap[backdropBlurAmount] || blurClassMap["sm"];

  // If className contains 'fixed' or 'absolute', remove inset-0 and z-index classes, use inline styles instead
  const isPositioned = className.includes('fixed') || className.includes('absolute');
  // Remove 'inset-0' and 'z-0'/'z-10' etc from className to avoid conflicts with inline styles
  const cleanedClassName = isPositioned 
    ? className
        .replace(/\binset-0\b/g, '')
        .replace(/\bz-\d+\b/g, '')
        .trim()
        .replace(/\s+/g, ' ')
    : `w-full h-full overflow-hidden ${className}`;
  const containerClasses = cleanedClassName;

  // Canvas always uses absolute positioning to fill its parent
  // For fixed positioning, use explicit width/height to match canvas.width/height
  const canvasClasses = isFixed 
    ? "absolute inset-0" 
    : "absolute inset-0 w-full h-full";

  // For fixed positioning, ensure canvas CSS size matches canvas.width/height
  const canvasStyle = isFixed && canvasSize.width > 0
    ? { 
        display: "block", 
        pointerEvents: "none",
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`
      }
    : { display: "block", pointerEvents: "none" };

  // For fixed positioning, ensure it's truly fixed with inline styles
  // Use top/left/right/bottom instead of width/height to avoid scrollbar issues
  const containerStyle = isFixed 
    ? { 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: -1 
      }
    : {};

  return (
    <div className={containerClasses} style={containerStyle}>
      <canvas
        ref={canvasRef}
        className={canvasClasses}
        style={canvasStyle}
      />
      {/* Apply the mapped Tailwind CSS class for backdrop blur - ensure it's behind content */}
      <div className={`absolute inset-0 ${finalBlurClass}`} style={{ zIndex: -1 }}></div>
    </div>
  );
}

export default ShaderBackground;