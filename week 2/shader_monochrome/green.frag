precision mediump float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float tileno;
uniform float radius;

const float PI = 3.1415926535897932384626433832795;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

float circle(vec2 st, float radius){
    vec2 pos = vec2(0.5)-st;
    radius *= 1.;
    return 1.-smoothstep(radius-(radius*0.0),radius+(radius*0.0),dot(pos,pos)*PI);

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

vec3 red = vec3(1.0,0.0,0.0);
vec3 green = vec3(0.0,1.0,0.0);
vec3 blue = vec3(0.0,0.0,1.0);

// copy the vTexCoord
// vTexCoord is a value that goes from 0.0 - 1.0 depending on the pixels location
// we can use it to access every pixel on the screen
vec2 st = vTexCoord;
vec2 uv = vTexCoord;
uv = 1.0 - uv;
st = 1.0 - st;

float tiles = tileno;//mouse.x;
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

red = vec3(tex.x,tex.x,tex.x);//monochrome version
green = vec3(0.,tex.y,0.);
blue = vec3(0.,0.,tex.z);




vec3 circles = vec3(box(st,vec2(radius),0.0));
//vec3 circles = vec3(circle(st,radius));


vec3 color2 = mix(circles,red, 1./circles.x);

//vec4 colour = vec4(green, circles.x);

gl_FragColor = vec4(color2,1.0);



}
