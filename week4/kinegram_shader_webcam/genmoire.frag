precision mediump float;
const float PI = 3.1415926535897932384626433832795;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform sampler2D tex5;

uniform vec2 resolution;
uniform float u_time;

float size = 6.;


float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size*0.5;
    vec2 uv = smoothstep(_size,_size+vec2(0.001),
                        _st);
    uv *= smoothstep(_size,
                    _size+vec2(0.001),
                    vec2(1.0)-_st);
    return uv.x*uv.y;
}

float line(in vec2 _uv, in float _stepsize) {

  float c = _uv.x * (resolution.x / (size)) ;
      c = mod(c, 1.0);
      c = step(c, _stepsize);

return c;
}



void main() {



vec2 uv0 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+0.0,resolution.y/2.0);; //mask for tex0
vec2 uv1 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+1.0,resolution.y/2.0); //mask for tex1
vec2 uv2 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+2.0,resolution.y/2.0);
vec2 uv3 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+3.0,resolution.y/2.0);
vec2 uv4 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+4.0,resolution.y/2.0);
vec2 uv5 = gl_FragCoord.xy  - vec2((resolution.x/2.0)+5.0,resolution.y/2.0);

vec2  center = vec2(0.5);



 vec2 pos0 = mod(uv0, vec2(size)) - vec2(size/2.0);
  vec2 pos1 = mod(uv1, vec2(size)) - vec2(size/2.0);
  vec2 pos2 = mod(uv2, vec2(size)) - vec2(size/2.0);
  vec2 pos3 = mod(uv3, vec2(size)) - vec2(size/2.0);
  vec2 pos4 = mod(uv4, vec2(size)) - vec2(size/2.0);
  vec2 pos5 = mod(uv5, vec2(size)) - vec2(size/2.0);



  float d0 = box(pos0,vec2(size-1.0 ,size+1.0));
//float d0 = line(uv0,0.1);

  float d1 = box(pos1,vec2(size-1.0 ,size+1.0));
  float d2 = box(pos2,vec2(size-1.0 ,size+1.0));
  float d3 = box(pos3,vec2(size-1.0 ,size+1.0));
  float d4 = box(pos4,vec2(size-1.0 ,size+1.0));
  float d5 = box(pos5,vec2(size-1.0 ,size+1.0));

  vec3 bg  = vec3(1.0, 1.0, 1.0);
  vec3 sq = vec3(0.0, 0.0, 0.0);

  vec3 mask0 = mix(sq,bg,1.-d0);
  vec3 mask1 = mix(sq,bg,1.-d1);
  vec3 mask2 = mix(sq,bg,1.-d2);
  vec3 mask3 = mix(sq,bg,1.-d3);
  vec3 mask4 = mix(sq,bg,1.-d4);
  vec3 mask5 = mix(sq,bg,1.-d5);


  vec2 tex_uv = gl_FragCoord.xy/resolution.xy;
  tex_uv.y = 1. - tex_uv.y;

  vec3 texture0 = texture2D(tex0, tex_uv,-32.0).rgb;
  vec3 texture1 = texture2D(tex1, tex_uv,-32.0).rgb;
  vec3 texture2 = texture2D(tex2, tex_uv,-32.0).rgb;
  vec3 texture3 = texture2D(tex3, tex_uv,-32.0).rgb;
  vec3 texture4 = texture2D(tex4, tex_uv,-32.0).rgb;
  vec3 texture5 = texture2D(tex5, tex_uv,-32.0).rgb;


  vec3 col0 = mix(bg,texture0,mask0.x);
  vec3 col1 = mix(bg,texture1,mask1.x);
  vec3 col2 = mix(bg,texture2,mask2.x);
  vec3 col3 = mix(bg,texture3,mask3.x);
  vec3 col4 = mix(bg,texture4,mask4.x);
  vec3 col5 = mix(bg,texture5,mask5.x);

vec3 final0 = mix(col0,col1,col0.x);
vec3 final1 = mix(col2,final0,col2.x);
vec3 final2 = mix(col3,final1,col3.x);
vec3 final3 = mix(col4,final2,col4.x);
vec3 final4 = mix(col5,final3,col5.x);






  // render the output
  gl_FragColor = vec4(final4,1.0);
}
