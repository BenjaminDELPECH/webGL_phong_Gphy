attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 a_normal;

varying vec3 vLumiere;
varying vec4 vColor;
varying vec3 v_normal;
varying vec3 vCamera;




uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 u_matrix;
uniform mat4 objMatrix;




void main(void) {

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

	vec4 vertex =  uMVMatrix * vec4(aVertexPosition, 1.0);
	
	//VECTEUR camera
    vCamera = -vec3(vertex.xyz);

	
	vColor=aVertexColor;
    v_normal = a_normal;
    	


}
