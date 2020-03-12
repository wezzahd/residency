const fs = `
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform vec2 u_circlePos[${numCircles}];
uniform float u_circleRadius[${numCircles}];
uniform float u_circleEmit[${numCircles}];
uniform vec3 u_circleCol[${numCircles}];

varying vec2 vPos;

vec3 radiate(float radius, float dist, vec3 col, vec3 pointCol, float emit) {
		// pointCol = normalize(pointCol);
		// draw soft radiosity light
		//col += pow(smoothstep(radius+1., radius, dist), 12.)*pointCol.rgb*${numCircles}.*2.9*pow(emit, 5.);
		// draw hard radiosity light
		//col += pow(smoothstep(radius+0.02, radius, dist), 2.)*pointCol.rgb*${numCircles}.*pow(emit, 4.)*4.8;
		// draw circle
		float circleVal = smoothstep(radius+0.005, radius, dist);
		col += circleVal*pointCol.rgb*${numCircles}.*pow(emit, 4.)*1.2;
		return col;
}

void main() {
  vec2 st = vPos / u_resolution;

	vec3 col = vec3(0.);

	//noprotect
	for (int i = 0; i < ${numCircles}; i++) {
		vec2 pos = u_circlePos[i] * 2. - 1.;
		float dist = length(st - pos);
		col = radiate(u_circleRadius[i], dist, col, u_circleCol[i], u_circleEmit[i]);
	}

	col /= ${numCircles}.;

  gl_FragColor = vec4(col, 1.);
}
`;

const vs = `
attribute vec3 aPosition;
varying vec2 vPos;

void main() {
  vPos = vec2(aPosition.x,aPosition.y);
	gl_Position = vec4(aPosition,1.0);
}
`;
