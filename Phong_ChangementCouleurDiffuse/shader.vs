attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;
attribute vec3 a_normal;

varying vec4 vLumiere;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vCamera;




uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 u_matrix;


uniform mat4 uMVMatrix2;
uniform mat4 uPMatrix2;



void main(void) {
    
    
	gl_Position = uPMatrix2 * uMVMatrix2 * vec4(aVertexPosition, 1.0);
	vec4 vertex =  uPMatrix  * vec4(0.0,0.0,0.0, 1.0);
	
	//VECTEUR camera
    vCamera = -vec3(vertex.xyz);
    
    vec3 prePosLumiere=vec3(0.0,0.0,0.0);
    vLumiere= uMVMatrix * uPMatrix*vec4(-prePosLumiere,1.0);
	
	vColor=aVertexColor;
    vNormal = a_normal;
    	


}
