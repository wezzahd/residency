precision mediump float;

uniform vec2 resolution;
uniform vec2 mouse;
uniform float tileno;
uniform float radius;
uniform float u_time;
uniform bool isMobile;


const float PI = 3.1415926535897932384626433832795;

// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform sampler2D tex0;
//uniform sampler2D tex1; //alphamask


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

			return vec3( smoothstep(0.,1.,fract(DF)) );
}

float lerp(float from, float to, float rel){
  return ((1.0 - rel) * from) + (rel * to);
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
	//	vec2 screenPos2 = gl_FragCoord.xy - (resolution.xy / 2.0) + vec2(radius/3.0,0.0);
vec2 screenPos2 = gl_FragCoord.xy - (resolution.xy / 2.0);
		vec2 screenPos3 = gl_FragCoord.xy/resolution.xy;
vec2 screenPos4 = gl_FragCoord.xy - (resolution.xy) * vec2(mouse.x,1.0 - mouse.y);


		vec2 count = resolution.xy / (diameter);
		vec2 shift = vec2(0.5) - fract(count / 2.0);
		vec2 uv = floor(count * gl_FragCoord.xy / resolution.xy + shift) / count;

    vec2 pos = mod(screenPos, vec2(diameter)) - vec2(radius);

	float d2 = ComputeCircle(screenPos4, center, 100.0 , 100.0);


	vec2 st = gl_FragCoord.xy/resolution.xy;
	  st.x *= resolution.x/resolution.y;

vec3 noisecolor = noiser(pos,0.01);
vec3 noisecolor2 = noiser(st,5.0);



//float d = box(pos, vec2(radius), 0.5); // rectangles

    // Compute "pixelated" (stepped) texture coordinates using the floor() function.
    // The position is adjusted to match the circles, i.e. so a pixelated block is at the center of the
    // display.
  //  vec2 tileNum = floor(vec2(gl_FragCoord.xy)/tileSize);
  //  vec2 st =  tileNum * tileSize/u_resolution.xy;
    // vec2 count = resolution.xy / (diameter);
    // vec2 shift = vec2(0.5) - fract(count / 2.0);
    // vec2 uv = floor(count * gl_FragCoord.xy / resolution.xy + shift) / count;

	// Sample the texture, using an offset to the center of the pixelated block.
    // NOTE: Use a large negative bias to effectively disable mipmapping, which would otherwise lead
    // to sampling artifacts where the UVs change abruptly at the pixelated block boundaries.
    uv += vec2(0.5) / count;
    uv = clamp(uv, 0.0, 0.99);


//isMobile == false

float mobiletest = float(isMobile);

// if (x<0.5)
// {
//   x=a;
//   }else{
//   x=b;
// }
//
// // faster
// x=a*step(x,0.5)+b*step(0.5,x);

//If conditional statement below equivalent: see example above


uv.y = (1.0 -uv.y) * step(mobiletest,0.9) + uv.y * step(0.9,mobiletest);

//uv.y = (mobiletest) - uv.y; // flip UV if on Desktop





	vec3 texColor = texture2D(tex0, uv, -32.0).rgb;
	//vec3 alphmask = texture2D(tex1, uv, -32.0).rgb; //pixellate alphamask

	float edge = radius/2.0 + (radius * 2.0 * noisecolor2.x * sin(u_time) * (1.0-d2));//(radius * (noisecolor.x) * noisecolor2.x); // random sizes // generate different si
// float edge2 = radius;
//
// float edge3 = screenPos4;


float d = ComputeCircle(pos, center, edge, 0.5); //circles

//	float d = box(screenPos2, vec2(edge/3.0,edge) , 0.5); //circles
//	float d = box(screenPos2, vec2(edge) , 0.5);

	// Calculate the color based on the circle shape, mixing between that color and a background color.
    // NOTE: Set the mix factor to 0.0 to see the pixelating effect directly, without the circles.
    vec3 bg  = vec3(0.0, 0.0, 0.0);
		//vec3 gr = vec3(0.0,texColor.y,0.0);
    vec3 col = mix(vec3(1.0), bg, (d)); //1.-d for rect
		vec3 mask = vec3(d2,d2,d2);
    vec3 red = vec3(0.0,0.0,col.z);

		//float redmask = col.x * step(mask.x,0.99) + 0.0 * step(0.99,mask.x);
	vec3 redmask = mix(red,bg,mask.x);
	//vec3 texColor2 = texture2D(tex0, vTexCoord).rgb; //need logic to flip uv on Desktop (not need for mobile)


    // Set the final fragment color.
	  gl_FragColor = vec4(red, 1.0);
	// gl_FragColor = vec4(mobiletest,mobiletest,mobiletest, 1.0); //debug
}
