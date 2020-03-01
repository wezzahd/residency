precision mediump float;

uniform vec2 u_resolution;
uniform vec2 mouse;
uniform float tileno;
uniform float radius;
uniform float u_time;


const float PI = 3.1415926535897932384626433832795;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = u_time*_speed;
    if( fract(time)>0.5 ){
        if (fract( _st.y * 0.5) > 0.5){
            _st.x += fract(time)*2.0;
        } else {
            _st.x -= fract(time)*2.0;
        }
    } else {
        if (fract( _st.x * 0.5) > 0.5){
            _st.y += fract(time)*2.0;
        } else {
            _st.y -= fract(time)*2.0;
        }
    }
    return fract(_st);
}

float circle(vec2 _st, float _radius){
    vec2 pos = vec2(0.5)-_st;
    return smoothstep(1.0-_radius,1.0-_radius+_radius*0.2,1.-dot(pos,pos)*3.14);
}

vec2 pixel(vec2 _st, float _tiles){
return floor( _st * _tiles ) / _tiles;
}


void main() {

float aspect = u_resolution.x / u_resolution.y;


vec2 tileSize = vec2(tileno,tileno);
vec2 tileNum = floor(vec2(gl_FragCoord.xy)/tileSize);
vec2 st =  tileNum * tileSize/u_resolution.xy;
st = 1.0 - st;


vec2 uv = gl_FragCoord.xy/u_resolution.xy;
uv.x *= aspect;

//uv = 1.0 - uv;

uv *= sqrt(tileSize);

uv = fract(uv);


// st = pixel(st,10.);
    //st = movingTiles(st,tileno,0.0);


    vec4 tex = texture2D(tex0, st);


    vec3 circles = vec3(circle(uv, 0.3 ) );
    vec3 camtex = vec3(tex.xyz);

vec3 color = mix(camtex,circles, circles.x);

    gl_FragColor = vec4(color,1.0);
}
