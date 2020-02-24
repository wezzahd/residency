precision mediump float;

uniform vec2 resolution;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}



void main() {

float aspect = resolution.x / resolution.y;

vec3 color = vec3(0.0);

// copy the vTexCoord
// vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
// we can use it to access every pixel on the screen
vec2 st = vTexCoord;
vec2 uv = vTexCoord;
uv = 1.0 - uv;


float tiles = 10.0;
//uv.x *= aspect;
uv = uv * tiles;
uv = floor(uv);
uv = uv / tiles;

vec4 tex = texture2D(tex0, uv);

//st.x *= aspect;

// lets multiply the coordinates by a factor of 10
st *= tiles;

// use the fract function so that the values always fluctuate between 0 - 1
// fract will return whatever number is to the right of the decimal point
// it is built in to glsl
st = fract(st);

color = vec3(tex.x,tex.y,tex.z);

//vec3 circles = vec3(1.-box(st,vec2(0.4),0.01));
vec3 circles = vec3(1.-circle(st,0.9));

vec3 color2 = mix(color,circles,circles.x);

gl_FragColor = vec4(color2,1.0);



}
