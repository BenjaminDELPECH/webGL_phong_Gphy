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

  //Phong
	//Ambiance
  vec4 Ia = uLightAmbient * uMaterialAmbient;  //Indice d'ambiance

  //Diffusion
  vec4 Id = vec4(0.0,0.0,0.0,1.0);

  //Specularité 
  vec4 Is = vec4(0.0,0.0,0.0,1.0);

	if(light > 0.0) //Seulement si light est positive
    { 
      Id = uLightDiffuse * uMaterialDiffuse * light; //Indice de diffusion
      vec3 E = normalize(vCamera);
      vec3 R = reflect(S, N);
      float specular=((1.0/pi*pow(r,2.0)))*Kd+((brillance+2.0)/2.0*pi*pow(r,2.0))*Ks*pow( max(dot(R, E), 0.0), brillance);
      Is = uLightSpecular * uMaterialSpecular * specular; //Indice de specularite
     }

  vec4 finalColor = Ia + Id + Is;
  gl_FragColor.a = 1.0;
  gl_FragColor.r =  finalColor.r*vColor.r;
  gl_FragColor.g =  finalColor.g*vColor.g;
  gl_FragColor.b =  finalColor.b*vColor.b;
}


