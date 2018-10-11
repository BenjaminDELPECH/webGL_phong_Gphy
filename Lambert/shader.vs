attribute vec3 aVertexPosition;
attribute vec3 aVertexLumiere;
attribute vec4 aVertexColor;
attribute vec3 a_normal;

varying vec4 vLumiere;
varying vec4 vColor;
varying vec3 v_normal;
varying vec3 vCamera;





uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 u_matrix;




void main(void) {

	gl_Position = uPMatrix *uMVMatrix* vec4(aVertexPosition, 1.0);
	vLumiere = vec4(2.0,2.0,-4.0, 0.0);


	//VECTEUR camera
    vCamera = gl_Position.xyz;
	
	vColor=aVertexColor;
    v_normal = a_normal;
    	


}
