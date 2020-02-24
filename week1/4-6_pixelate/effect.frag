precision mediump float;

const float PI = 3.1415926535897932384626433832795;


// lets grab texcoords just for fun
varying vec2 vTexCoord;

// our texture coming from p5
uniform vec2 resolution;
uniform sampler2D tex0;

vec2 movingTiles(vec2 _st, float _zoom, float _speed){
    _st *= _zoom;
    float time = 1.;//u_time*_speed;
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






void main() {

  vec2 uv = vTexCoord;

  float aspect = resolution.x / resolution.y;


  // the texture is loaded upside down and backwards by default so lets flip it
  uv = 1.0 - uv;

  // to pixelate an image we need to alter our uvs so that instead of being a smooth gradient it steps from one color to the next
  // in order to do this we will use the floor function
  // floor will round a float down to the nearest int, so 4.98 would become 4.0, and -37.2 would become -37.0
  // first the uv's are multipled times a tiles variable

//  uv -= 0.5;

  uv.x *= aspect;


  float tiles = 10.0;
  uv = uv * tiles;

  // second the uvs are rounded down to the nearest int
  uv = floor(uv);

  // lastly we divide by tiles again so that uvs is between 0.0 - 1.0
  uv = uv / tiles;

  // often times in glsl you will see programmers combining many operation onto one line.
  // the previous three steps could have also been written as uv = floor( uv * tiles ) / tiles

  // get the webcam as a vec4 using texture2D and plug in our distored uv's
  vec4 tex = texture2D(tex0, uv);

  // output the texture
// gl_FragColor = tex;

  // if you'd like a debug view of what the uv's look like try running this line
   gl_FragColor = vec4(tex.x, 0., 0.0, 1.0);
}
