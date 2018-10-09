attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 a_normal;

varying vec3 vLumiere;
varying vec4 vColor;
varying vec3 v_normal;
varying vec3 vEyeVec;

float test;


uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 u_matrix;

void main(void) {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	vec4 vertex = uMVMatrix * vec4(aVertexPosition, 1.0);
	//Vector Eye
    vEyeVec = -vec3(vertex.xyz);

	vec3 SourceLumiere=vec3(2.0,2.0,2.0);
	vLumiere=vec3(aVertexPosition.x-SourceLumiere.x,aVertexPosition.y-SourceLumiere.y,aVertexPosition.z-SourceLumiere.z);

	 	
	 	vColor=aVertexColor;
    	v_normal = a_normal;
    	test=1.0;

    	gl_PointSize= 5.0;
}
