precision mediump float;
const float PI = 3.1415926535897932384626433832795;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5

//uniform sampler2D tex[6];
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform sampler2D tex2;
uniform sampler2D tex3;
uniform sampler2D tex4;
uniform sampler2D tex5;
// uniform sampler2D tex6;
// uniform sampler2D tex7;
// uniform sampler2D tex8;
// uniform sampler2D tex9;
// uniform sampler2D tex10;
// uniform sampler2D tex11;



uniform vec2 resolution;
uniform float u_time;

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

			return vec3( smoothstep(0.0,1.0,fract(DF)) );
}

vec3 gradient (vec2 uv){
  return vec3(uv.x,uv.x,uv.x);
}




vec3 brightnessContrast(vec3 value, float brightness, float contrast)
{
    return (value - 0.5) * contrast + 0.5 + brightness;
}


void main() {


vec2 uv = gl_FragCoord.xy/resolution.xy;
uv = 1.0 - uv;

vec3 noise = noiser(uv,8.0);//1.0 - gradient(uv);//noiser(uv,10.0);
vec3 bg = vec3(0.);


const int numly = 6;

float brightness[numly];
float minthreshold[numly];
float maxthreshold[numly];
vec3 texture[numly];
float mask[numly];
vec3 maskimg[numly];
vec3 finalout;


texture[0] = texture2D(tex0, uv,-32.0).rgb;
texture[1] = texture2D(tex1, uv,-32.0).rgb;
texture[2] = texture2D(tex2, uv,-32.0).rgb;
texture[3] = texture2D(tex3, uv,-32.0).rgb;
texture[4] = texture2D(tex4, uv,-32.0).rgb;
texture[5] = texture2D(tex5, uv,-32.0).rgb;
// texture[6] = texture2D(tex6, uv,-32.0).rgb;
// texture[7] = texture2D(tex7, uv,-32.0).rgb;
// texture[8] = texture2D(tex8, uv,-32.0).rgb;
// texture[9] = texture2D(tex9, uv,-32.0).rgb;
// texture[10] = texture2D(tex10, uv,-32.0).rgb;
// texture[11] = texture2D(tex11, uv,-32.0).rgb;


float range = 255.0/float(numly);

for (int i = 0; i < numly; i++) {

 minthreshold[i] = (float(i) * range) / 255.;
 maxthreshold[i] = (range + (range * float(i))) / 255.;

 mask[i] = step(minthreshold[i],noise.x) - step(maxthreshold[i],noise.x);
 maskimg[i] = mix(bg,texture[i],mask[i]);
 finalout += maskimg[i]; //vec3 finalout = maskimg[0] + maskimg[1]+ maskimg[2]+maskimg[3]+maskimg[4]+maskimg[5];
}



  // render the output
  gl_FragColor = vec4(finalout,1.0);
}
