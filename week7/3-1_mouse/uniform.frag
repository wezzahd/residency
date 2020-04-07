precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform sampler2D tex0;

#define PI 3.14159265358979323846

vec2 rotate2D(vec2 _st, float _angle){
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}

vec2 tile(vec2 _st, float _zoom){
    _st *= _zoom;
    return fract(_st);
}

float ComputeCircle(vec2 pos, vec2 center, float radius, float feather){
    // Determine the distance to the center of the circle.
	float dist = length(center - pos);

    // Use the distance and the specified feather factor to determine where the distance lies
    // relative to the circle border.
    float start = radius - feather;
    float end   = radius + feather;
    return smoothstep(start, end, dist);
}

float box(vec2 _st, vec2 _size, float _smoothEdges){
    _size = vec2(0.5)-_size*0.5;
    vec2 aa = vec2(_smoothEdges*0.5);
    vec2 uv = smoothstep(_size,_size+aa,_st);
    uv *= smoothstep(_size,_size+aa,vec2(1.0)-_st);
    return uv.x*uv.y;
}

float circle(in vec2 _st, in float _radius){
    vec2 l = _st-vec2(0.5);
    return 1.-smoothstep(_radius-(_radius*0.01),
                         _radius+(_radius*0.01),
                         dot(l,l)*4.0);
}


vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                        -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i); // Avoid truncation effects in permutation
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));

    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

vec3 noiser (vec2 pos, float factor) {
	vec3 noisecolor = vec3(0.0);
	vec2 posi = vec2(pos*factor);

	float DF = 0.0;

	// Add a random position
	float a = 0.0;
	vec2 vel = vec2(u_time*.1);
	DF += snoise(posi+vel)*.25+.25;

	a = snoise(posi*vec2(cos(u_time*0.15),sin(u_time*0.1))*0.1)*3.1415;
			vel = vec2(cos(a),sin(a));
			DF += snoise(posi+vel)*.25+.25;

			return vec3( smoothstep(0.,2.0,fract(DF)) );
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

  float ar = u_resolution.x / u_resolution.y;
  st.x = ar * st.x;
    vec2 pos = gl_FragCoord.xy - (u_resolution.xy) * vec2(u_mouse.x,1.0 - u_mouse.y);
    vec3 color = vec3(0.0);

    // Divide the space in 4


    // Use a matrix to rotate the space 45 degrees
    //st = rotate2D(st,PI*0.25);

    // Draw a square
    //color = vec3(box(st,vec2(0.7),0.01));
  //  color = vec3(st,0.0);

//   vec3 color2 = vec3(box(pos,vec2(2000.),2000.0));

  vec3 noisecolor2 = noiser(st,1.0);

float tiles = 20.0;

//st = floor((st*noisecolor2.xy) * tiles ) / tiles;
 //vec3 noisecolor2 = noiser(st,1.0);

st = tile(st*1.0-noisecolor2.xy,tiles);
//st = tile(st,40.0);

color = vec3(st,0.6);

    //vec3 color2 = vec3(circle(st,0.5));

//vec3 color2 = vec3(box(st,vec2(10.),10.0));

//	vec3 texColor = texture2D(tex0, st, -32.0).rgb;


//color = vec3(st,1.0);
    gl_FragColor = vec4(color,1.0);
}
