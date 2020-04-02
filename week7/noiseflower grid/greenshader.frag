precision mediump float;

varying vec2 vTexCoord;

// Get the normal from the vertex shader
varying vec3 vNoise;
varying float vU_time;
varying vec2 vMouse;


float lerp(float from, float to, float rel){
  return ((1.0 - rel) * from) + (rel * to);
}

float invLerp(float from, float to, float value){
  return (value - from) / (to - from);
}

float remap(float origFrom, float origTo, float targetFrom, float targetTo, float value){
  float rel = invLerp(origFrom, origTo, value);
  return lerp(targetFrom, targetTo, rel);
}
//uniform float uFrameCount;

void main() {

  vec3 color = vNoise;
  //float sine = (1. + (sin(vU_time * 0.005)))/2.0;
//  vec3 color = vec3(1.0,0.,0.);
float sine = 1. + (sin(vU_time * 0.005)/2.0);
float cose = 1. + (cos(vU_time * 0.005)/2.0);

//float blueoutput = lerp(0.0, color.z * cose, vMouse.x);
//float greenoutput = lerp(color.y, 0.0, vMouse.x);

float greenoutput = color.y * step(vMouse.x,0.75) + (lerp(color.y,0.0,remap(0.75,1.0,0.0,1.0,vMouse.x)) * step(0.75,vMouse.x));
float blueoutput = 0.0 * step(vMouse.x,0.75) + (lerp(0.0,color.z*cose,remap(0.75,1.0,0.0,1.0,vMouse.x)) * step(0.75,vMouse.x));

  // Lets just draw the texcoords to the screen
  gl_FragColor = vec4(vec3(0.0 ,greenoutput ,blueoutput) ,0.5);
}
