precision mediump float;

const float PI = 3.1415926535897932384626433832795;

uniform vec2 resolution;
uniform vec2 mouse;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;


  float circle(vec2 st, float radius){
      vec2 pos = vec2(0.5)-st;
      radius *= 0.75;
      return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*PI);

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
st = 1.0 - st;

float tiles = 3.0;//mouse.x;
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


//color = vec3(tex.x,tex.y,tex.z);
color = vec3(0.3,0.,0.3);
//color = vec3(tex.x,0,0);

//vec3 circles = vec3(1.-box(st,vec2(0.4),0.01));
vec3 circles = vec3(circle(st,0.2));
//vec4 circles2 = vec3(circle(st,0.205));


vec3 color2 = mix(circles, color, circles.x);
//vec3 color2 = vec3(color.x,circles.x,circles.x);

gl_FragColor = vec4(color2,1.0);



}
