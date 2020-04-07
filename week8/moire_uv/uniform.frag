precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D tex0;

#define PI 3.14159265358979323846


vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main()  {

  vec2 uv = gl_FragCoord.xy/u_resolution.xy;
  float ar = u_resolution.x / u_resolution.y;
 vec2 pos = gl_FragCoord.xy - (u_resolution.xy) * vec2(u_mouse.x,1.0 - u_mouse.y);

//  vec2 pos = gl_FragCoord.xy - (u_resolution.xy/2.0 );

 pos = rotate2d((u_time*.5)*PI ) * pos;


float d = box(pos,vec2(u_resolution.x) ,u_resolution.x);

  uv.x = ar * uv.x;


  uv = tile(uv * (1.-d) ,20.0);
  //st = tile(st,40.0);

  vec3 color = vec3(uv,0.5);

  gl_FragColor = vec4(color,1.0);

}
