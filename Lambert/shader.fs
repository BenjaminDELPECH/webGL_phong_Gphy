precision mediump float;

varying vec4 vLumiere;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vCamera;

uniform float pi;
uniform float r;
uniform float brillance;  
uniform float Kd ;  
uniform float Ks ;          

uniform vec4 uLightAmbient;      //light ambient property
uniform vec4 uLightDiffuse;      //light diffuse property 
uniform vec4 uLightSpecular;     //light specular property
 
uniform vec4 uMaterialAmbient;  //object ambient property
uniform vec4 uMaterialDiffuse;   //object diffuse property
uniform vec4 uMaterialSpecular;  //object specular property

void main(void)
{
	vec3 S= normalize(vLumiere.xyz);
  vec3 N =normalize(vNormal);

  //Lambert
  //dot permet de faire le produit scalaire entre mes normales et la source lumineuse. Retourne un float entre 0 et 1 
	float light = 28.0*(Kd/pi) * dot(-N, S);

  vec4 finalColor = vec4(1.0,1.0,1.0,1.0)*light;
  gl_FragColor.a = 1.0;
  gl_FragColor.r =  finalColor.r*vColor.r;
  gl_FragColor.g =  finalColor.g*vColor.g;
  gl_FragColor.b =  finalColor.b*vColor.b;

  
}


