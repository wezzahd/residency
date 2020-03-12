precision mediump float;
const float PI = 3.1415926535897932384626433832795;

// grab texcoords from vert shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform vec2 resolution;
uniform float u_time;

float amt = 0.1; // the amount of displacement, higher is more
float squares = 10.0; // the number of squares to render vertically


float random(vec2 p)
{
    p  = fract( p*0.3183099+.1 );
    p *= 17.0;
    return fract( p.x*p.y*(p.x+p.y) );
}

float circle(vec2 st, float radius){
      vec2 pos = vec2(0.5)-st;
      radius *= 0.75;
      return 1.-smoothstep(radius-(radius*0.05),radius+(radius*0.05),dot(pos,pos)*PI);

}





void main() {
  float aspect = resolution.x / resolution.y;
  float offset = amt * 0.5;

  vec2 uv = vTexCoord;
  //uv *= 0.25;

  // the texture is loaded upside down and backwards by default so lets flip it
//  uv.y = 1.0 - uv.y;


  vec2 scaledUV = uv * squares;
  vec2 flooredUV = floor(scaledUV);
  vec2 gridUV = fract(scaledUV);
   float dist = length(gridUV);
  float pwidth = abs(dist);
  float edge = random(flooredUV) -  0.1 * ((sin(flooredUV.x)*(sin(flooredUV.y))* cos(u_time)));
  float circles = circle(gridUV,edge);






  // copy of the texture coords
  //vec2 tc = uv;

  // move into a range of -0.5 - 0.5
 //uv.x -= 0.25;

  // correct for window aspect to make squares
  //uv.x *= aspect;

  // tile will be used to offset the texture coordinates
  // taking the fract will give us repeating patterns
  //vec2 tile = fract(uv * squares + 0.) * amt;

//  uv = floor( uv * tile ) / tile

  // sample the texture using our computed tile
  // offset will remove some texcoord edge artifacting
  //vec4 tex = texture2D(tex0, uv);

  // render the output
  gl_FragColor = vec4(circles,0., 0., 1.0);
}
