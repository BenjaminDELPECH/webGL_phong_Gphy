precision mediump float;

varying vec3 vLumiere;
varying vec4 vColor;
varying vec3 v_normal;
varying vec3 vEyeVec;
uniform int test;

uniform vec3 SourceLumineuse;
uniform vec4 u_color;

uniform float uShininess;        //shininess

uniform vec4 uLightAmbient;      //light ambient property
uniform vec4 uLightDiffuse;      //light diffuse property 
uniform vec4 uLightSpecular;     //light specular property
 
uniform vec4 uMaterialAmbient;  //object ambient property
uniform vec4 uMaterialDiffuse;   //object diffuse property
uniform vec4 uMaterialSpecular;  //object specular property








void main(void){
	
  	vec3 S= normalize(vLumiere);
  	vec3 N =normalize(v_normal);

  	

  	
  	//dot permet de faire le produit entre mes normales et la //source lumineuse. Retourne un float entre 0 et 1 correspondant à l'angle entre ma normale et la source lumineuse
	float light = dot(N, -S);

	
	//Ambience
     vec4 Ia = uLightAmbient * uMaterialAmbient;

     //Diffusion
     vec4 Id = vec4(0.0,0.0,0.0,1.0);

     //Specularité Term
     vec4 Is = vec4(0.0,0.0,0.0,1.0);

	 if(light > 0.0) //only if light is positive
     { 
          Id = uLightDiffuse * uMaterialDiffuse * light; //add diffuse term
          
          vec3 E = normalize(vEyeVec);
          vec3 R = reflect(S, -N);
          float specular = pow( max(dot(R, E), 0.0), uShininess);
          
          Is = uLightSpecular * uMaterialSpecular * specular; //add specular term 
     }






	//Final color
     vec4 finalColor = Ia + Id + Is;
     finalColor.a = 1.0;
    
    
     
     gl_FragColor = finalColor;

}


