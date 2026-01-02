#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

mat3 rotY(float a) {
    float c = cos(a), s = sin(a);
    return mat3(c, 0, -s, 0, 1, 0, s, 0, c);
}
mat3 rotX(float a) {
    float c = cos(a), s = sin(a);
    return mat3(1, 0, 0, 0, c, -s, 0, s, c);
}

float sdSphere(vec3 p, float s) { return length(p) - s; }

float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
    float s1 = sdSphere(p - vec3(sin(u_time)*1.2, 0., 0.), 0.8);
    float s2 = sdSphere(p - vec3(0., cos(u_time)*0.8, 0.), 0.6);
    return smin(s1, s2, 0.7);
}

float shadow(vec3 ro, vec3 rd) {
    float res = 1.0;
    float t = 0.01;
    for(int i = 0; i < 16; i++) {
        float h = map(ro + rd * t);
        if(h < 0.001) return 0.0;
        res = min(res, 32.0 * h / t);
        t += h;
    }
    return res;
}

vec3 calcNormal(vec3 p) {
    vec2 e = vec2(0.001, 0.0);
    return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),
                          map(p+e.yxy)-map(p-e.yxy),
                          map(p+e.yyx)-map(p-e.yyx)));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    vec2 m = u_mouse.xy / u_resolution.xy;
    if(u_mouse.x <= 0.) m = vec2(0.5);

    vec3 ro = vec3(0, 0, 4);
    vec3 rd = normalize(vec3(uv, -1.5));
    mat3 rotation = rotY((m.x-0.5)*6.28) * rotX((0.5-m.y)*3.14);
    ro = rotation * ro;
    rd = rotation * rd;

    float stars = pow(fract(sin(dot(rd, vec3(12.9, 78.2, 45.1))) * 43758.5), 500.0);
    vec3 col = vec3(stars); 

    float t = 0.0;
    for(int i = 0; i < 80; i++) {
        float d = map(ro + rd * t);
        if(d < 0.001 || t > 10.0) break;
        t += d;
    }

    if(t < 10.0) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);
        vec3 lp = vec3(2, 5, 2);
        vec3 ld = normalize(lp - p);

        float dif = dot(n, ld) * 0.5 + 0.5;
        float sh = shadow(p, ld);
        
        vec3 objCol = 0.5 + 0.5 * cos(u_time + n.xyy + vec3(0, 2, 4));
        
        col = objCol * dif * (sh + 0.2);
        col += pow(max(dot(reflect(-ld, n), -rd), 0.0), 32.0) * sh;
    }

    gl_FragColor = vec4(pow(col, vec3(0.4545)), 1.0);
}
