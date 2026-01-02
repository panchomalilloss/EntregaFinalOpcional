#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

// 1. Función de ruido avanzada
float noise(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2. Función para crear ráfagas de interferencia (Glitch)
float onOff(float a, float b, float c) {
    return step(c, sin(u_time + a * cos(u_time * b)));
}

// 3. Curvatura de la pantalla
vec2 curve(vec2 uv) {
    uv = (uv - 0.5) * 2.0;
    uv.x *= 1.1;
    uv.x *= 1.0 + pow((abs(uv.y) / 5.0), 2.0);
    uv.y *= 1.0 + pow((abs(uv.x) / 4.0), 2.0);
    uv = (uv / 2.0) + 0.5;
    return uv;
}

void main() {
    vec2 q = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv = curve(q);
    
    // --- EFECTO DE GLITCH (SALTO DE LÍNEA) ---
    // Esto desplaza bloques de píxeles horizontalmente de forma aleatoria
    float look = uv.y;
    float window = 1.0 / (1.0 + 20.0 * pow(sin(u_time / 4.0), 10.0));
    look += sin(uv.y * 10.0 + u_time) / 50.0 * onOff(4.0, 4.0, 0.3) * (1.0 + cos(u_time * 80.0));
    
    vec2 uv_glitch = vec2(uv.x + noise(vec2(look, u_time)) * 0.02 * onOff(2.0, 1.0, 0.9), uv.y);
    
    // --- GENERACIÓN DE COLOR CON ABERRACIÓN ---
    vec3 col;
    // Usamos uv_glitch para que el color también "salte"
    col.r = 0.5 + 0.5 * sin(u_time + (uv_glitch.x + 0.005) * 12.0);
    col.g = 0.5 + 0.5 * sin(u_time + uv_glitch.x * 12.0);
    col.b = 0.5 + 0.5 * sin(u_time + (uv_glitch.x - 0.005) * 12.0);

    // --- INTERFERENCIA TIPO "SNOW" ---
    float snow = noise(uv_glitch * u_time) * 0.15;
    col += snow;

    // --- SCANLINES (Líneas de barrido) ---
    // Añadimos un movimiento sutil a las líneas
    float scanline = sin(uv_glitch.y * u_resolution.y * 2.5 + u_time * 10.0) * 0.1;
    col -= scanline;

    // --- BARRA DE ESCANEO VERTICAL ---
    // Simula el refresco de la pantalla bajando
    float bar = smoothstep(0.2, 0.0, abs(sin(uv.y * 2.0 - u_time)));
    col += bar * 0.05;

    // --- VIÑETEADO Y CURVATURA ---
    float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
    col *= pow(16.0 * vignette, 0.3);

    // Aplicar tinte verde retro
    col *= vec3(0.95, 1.05, 0.95);

    // --- CORTE DE BORDES ---
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
        col = vec3(0.0);
    }

    gl_FragColor = vec4(col, 1.0);
}