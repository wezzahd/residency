precision mediump float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float tileno;
uniform float radius;
uniform float u_time;

const float PI = 3.1415926535897932384626433832795;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;


// The min and max sizes of the circles (in pixels) over time.
#define MIN_SIZE 2.0
#define MAX_SIZE 200.0

// Compute the relative distance to the circle, where < 0.0 is outside the feathered border,
// and > 1.0 is inside the feathered border.
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

vec3 random3(vec3 c) {
    float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));
    vec3 r;
    r.z = fract(512.0*j);
    j *= .125;
    r.x = fract(512.0*j);
    j *= .125;
    r.y = fract(512.0*j);
    return r-0.5;
}

const float F3 =  0.3333333;
const float G3 =  0.1666667;


float snoise(vec3 p) {

    vec3 s = floor(p + dot(p, vec3(F3)));
    vec3 x = p - s + dot(s, vec3(G3));

    vec3 e = step(vec3(0.0), x - x.yzx);
    vec3 i1 = e*(1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy*(1.0 - e);

    vec3 x1 = x - i1 + G3;
    vec3 x2 = x - i2 + 2.0*G3;
    vec3 x3 = x - 1.0 + 3.0*G3;

    vec4 w, d;

    w.x = dot(x, x);
    w.y = dot(x1, x1);
    w.z = dot(x2, x2);
    w.w = dot(x3, x3);

    w = max(0.6 - w, 0.0);

    d.x = dot(random3(s), x);
    d.y = dot(random3(s + i1), x1);
    d.z = dot(random3(s + i2), x2);
    d.w = dot(random3(s + 1.0), x3);

    w *= w;
    w *= w;
    d *= w;

    return dot(d, vec4(52.0));
}







// The main function, which is executed once per pixel.
void main()  {
    // Prepare the circle parameters, cycling the circle size over time.
    float cycle = clamp(cos(u_time / 2.0) * 0.6 + 0.7, 0.0, 1.0);
    float diameter = radius;//mix(MAX_SIZE, MIN_SIZE, cycle);
    float radius = diameter / 2.0;
    vec2  center = vec2(0.0);

    // Compute the relative distance to the circle, using mod() to repeat the circle across the display.
    // A feather value (in pixels) is used to reduce aliasing artifacts when the circles are small.
    // The position is adjusted so that a circle is in the center of the display.
    vec2 screenPos = gl_FragCoord.xy - (resolution.xy / 2.0) - vec2(radius);
    vec2 pos = mod(screenPos, vec2(diameter)) - vec2(radius);
    //float d = ComputeCircle(pos, center, radius/2., 0.5);
	  float d = box(pos, vec2(radius), 0.5);

    // Compute "pixelated" (stepped) texture coordinates using the floor() function.
    // The position is adjusted to match the circles, i.e. so a pixelated block is at the center of the
    // display.
  //  vec2 tileNum = floor(vec2(gl_FragCoord.xy)/tileSize);
  //  vec2 st =  tileNum * tileSize/u_resolution.xy;
    vec2 count = resolution.xy / diameter;
    vec2 shift = vec2(0.5) - fract(count / 2.0);
    vec2 uv = floor(count * gl_FragCoord.xy / resolution.xy + shift) / count;

	// Sample the texture, using an offset to the center of the pixelated block.
    // NOTE: Use a large negative bias to effectively disable mipmapping, which would otherwise lead
    // to sampling artifacts where the UVs change abruptly at the pixelated block boundaries.
    uv += vec2(0.5) / count;
    uv = clamp(uv, 0.0, 0.99);
    uv.y = 1.0 - uv.y;

		float t = u_time*0.5;
		float df = 1.0;
		//df = mix(hex(uv,t),hex(uv,t+1.),fract(t));
		    df += snoise(vec3(uv*2.,t*0.3))*0.8;
			vec3 newdf = vec3(mix(vec3(0.),vec3(1.),smoothstep(1.0,0.7,df)));


    vec3 texColor = texture2D(tex0, uv, -32.0).rgb;

	// Calculate the color based on the circle shape, mixing between that color and a background color.
    // NOTE: Set the mix factor to 0.0 to see the pixelating effect directly, without the circles.
    vec3 bg  = vec3(0.0, 0.0, 0.0);
    vec3 col = mix(texColor, bg, (1.-d));
		vec3 col2 = mix(col,newdf,newdf.x);
    vec3 red = vec3(col2.x,0.,0.);


    // Set the final fragment color.
	   gl_FragColor = vec4(red,1.0);
}
