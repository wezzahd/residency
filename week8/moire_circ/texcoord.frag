precision mediump float;

#define ACCEL 0.05

uniform vec2 u_Resolution;
uniform float u_time;
uniform sampler2D tex0;



void main()
{
    float ar = u_Resolution.x / u_Resolution.y;

	   vec2 uv = gl_FragCoord.xy / u_Resolution.xy - vec2( 0.5 , 0.5);
    uv.x = ar * uv.x;


    vec2 uv1 = gl_FragCoord.xy / u_Resolution.xy - vec2( 0.16 , 0.5);
    uv1.x = ar * uv1.x;

    vec2 uv2 = gl_FragCoord.xy / u_Resolution.xy   - vec2( 1.0-0.16 , 0.5);

    uv2.x = ar * uv2.x;

    float red = sin (100. * (u_time * ACCEL) * dot( uv1, uv1));
    float green = sin (100. * (u_time * ACCEL) * dot( uv, uv));
    float blue = sin (100. * (u_time * ACCEL) * dot( uv2, uv2));

  //  vec4 color = texture2D(tex0, vec2(gl_FragCoord.xy / u_Resolution.xy),8.0);



    gl_FragColor = vec4( red ,
                      green ,
                      blue ,
                      1.);
//gl_FragColor = vec4(color.rgb, 1.0);

}
