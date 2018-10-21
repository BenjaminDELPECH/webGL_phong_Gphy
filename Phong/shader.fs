precision mediump float;

varying vec4 vLumiere;
varying vec4 vColor;
varying vec3 vNormal;
varying vec3 vCamera;

uniform float pi;
uniform float r;

uniform vec3 DirectionLumiere;  //light direction

uniform float uShininess;        //shininess

uniform vec4 uLightAmbient;      //light ambient property
uniform vec4 uLightDiffuse;      //light diffuse property 
uniform vec4 uLightSpecular;     //light specular property
 
uniform vec4 uMaterialAmbient;  //object ambient property
uniform vec4 uMaterialDiffuse;   //object diffuse property
uniform vec4 uMaterialSpecular;  //object specular property








void main(void){
	
  
  vec3 S= normalize(vLumiere.xyz);
  vec3 N =normalize(vNormal);

  	

  	
  //dot permet de faire le produit entre mes normales et la //source lumineuse. Retourne un float entre 0 et 1 correspondant à l'angle entre ma normale et la source lumineuse
	float light = 28.0*(0.10/pi) * dot(-N, S);

	
	//Ambiance
  vec4 Ia = uLightAmbient * uMaterialAmbient;  //Indice d'ambiance

  //Diffusion
  vec4 Id = vec4(0.0,0.0,0.0,1.0);

  //Specularité Term
  vec4 Is = vec4(0.0,0.0,0.0,1.0);

	if(light > 0.0) //Seulement si la lumiere est positive
    { 

      Id = uLightDiffuse * uMaterialDiffuse * light; //Indice de diffusion
      vec3 E = normalize(vCamera);
      vec3 R = reflect(S, N);
     
  
      float specular=((1.0/pi*pow(r,2.0)))*0.10+((uShininess+2.0)/2.0*pi*pow(r,2.0))*0.10*pow( max(dot(R, E), 0.0), uShininess);
      Is = uLightSpecular * uMaterialSpecular * specular; //Indice de specularite
     }

      
  //Final color
  vec4 finalColor = Ia + Id + Is;
  
  finalColor.a = 1.0;
  
  gl_FragColor = finalColor;
  gl_FragColor.r =  finalColor.r*vColor.r;
   gl_FragColor.g =  finalColor.g*vColor.g;
    gl_FragColor.b =  finalColor.b*vColor.b;
}


