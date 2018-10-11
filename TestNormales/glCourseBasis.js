// =====================================================
var gl;
var shadersLoaded = 0;
var vertShaderTxt;
var fragShaderTxt;
var shaderProgram = null;
var vertexBuffer;
var colorBuffer;
var normalBuffer;
var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var objMatrix = mat4.create();
var worldmatrix=mat4.create();
var SourceLumineuseMatrix=vec3.create();

var vecAB=vec3.create();
var vecAC=vec3.create();


mat4.identity(objMatrix);

var r= 0.23;





// =====================================================


function webGLStart() {

	var canvas = document.getElementById("WebGL-test");
	canvas.onmousedown = handleMouseDown;
	document.onmouseup = handleMouseUp;
	document.onmousemove = handleMouseMove;

	initGL(canvas);
	initBuffers();
	loadShaders('shader');

	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.enable(gl.DEPTH_TEST);

//	drawScene();
tick();
}

// =====================================================
function initGL(canvas)
{
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
		gl.viewport(0, 0, canvas.width, canvas.height);
	} catch (e) {}
	if (!gl) {
		console.log("Could not initialise WebGL");
	}
}
// =====================================================
function generate_contraste(vertices){
	for(i=0;i<vertices.length;i++){
	test=Math.random();
	if(test<0.05){
		vertices[i]+=0.35;

		}
	}
	
}

// =====================================================
function generate_sphere(sphere_center,nbTh){
	couleur1=1.0;
	
	//definition des coordonnées du centre de la sphere à partir du parametre sphere_center
	xSph_cent=sphere_center.x;
	ySph_cent=sphere_center.y;
	zSph_cent=sphere_center.z;
	
	//nombre de Theta, définit le nombre de triangle verticaux
	nbTh=nbTh;

	//nombre de Phi, définit le nombre de triangle latéraux.
	nbPh=nbTh*2;

	//permet de faire un tour de cercle
	deltaTh=Math.PI/nbTh;
	deltaPh=(2*Math.PI)/nbPh;
	
	//Parcours vertical de notre sphere 
	for(i=0;i<nbTh;i++){
		Th1=i*deltaTh;
		Th2=(i+1)*deltaTh;
		
		//Parcours latéral de notre sphere
		for(j=0;j<nbPh;j++){
			Ph1=j*deltaPh;
			Ph2=(j+1)*deltaPh;

			//definition de nos 4 points formant 2 triangles.
			//1er triangle->P1,P3,P4
			//2eme triangle->P1,P4,P2
			x1=Math.sin(Th1)*Math.cos(Ph1)+xSph_cent;
			y1=Math.cos(Th1)+ySph_cent;
			z1=Math.sin(Th1)*Math.sin(Ph1)+zSph_cent;

			x2=Math.sin(Th1)*Math.cos(Ph2)+xSph_cent;
			y2=Math.cos(Th1)+ySph_cent;
			z2=Math.sin(Th1)*Math.sin(Ph2)+zSph_cent;

			x3=Math.sin(Th2)*Math.cos(Ph1)+xSph_cent;
			y3=Math.cos(Th2)+ySph_cent;
			z3=Math.sin(Th2)*Math.sin(Ph1)+zSph_cent;

			x4=Math.sin(Th2)*Math.cos(Ph2)+xSph_cent;
			y4=Math.cos(Th2)+ySph_cent;
			z4=Math.sin(Th2)*Math.sin(Ph2)+zSph_cent;

			
			if(i < nbTh-1) {
				vertices.push(x1,y1,z1);
				vertices.push(x3,y3,z3);
				vertices.push(x4,y4,z4);
				
				
				//Point sur la surface de la spere-centre de la sphere
				vertexNormales.push(x1-xSph_cent,y1-ySph_cent,z1-zSph_cent);
				vertexNormales.push(x3-xSph_cent,y3-ySph_cent,z3-zSph_cent);
				vertexNormales.push(x4-xSph_cent,y4-ySph_cent,z4-zSph_cent);

				
				//couleurs
				colors.push(couleur1,couleur1,couleur1,1.0);
				colors.push(couleur1,couleur1,couleur1,1.0);
				colors.push(couleur1,couleur1,couleur1,1.0);


				//calcul du point du centre du triangle
				xc=(x1+x3+x4)/3;
				yc=(y1+y3+y4)/3;
				zc=(z1+z3+z4)/3;

				
				//calcul de vecteur AB
				xab=x4-x3;
				yab=y4-y3;
				zab=z4-z3;

				//calcul de vecteur ac
				xac=x1-x3;
				yac=y1-y3;
				zac=z1-z3;


				vecAB=(xab,yab,zab);
				vecAC=(xac,yac,zac);
				//produit vectoriel
	        	var normal=vec3.cross(vecAB,vecAC)
	        	//nomalisation de la normale du triangle
	        	vec3.normalize(normal,normal);
	        	
	        	//envoit du milieu du triangle
				petitesNormales.push(xc,yc,zc);
				//envoit du milieu du trangle translatee
	       		petitesNormales.push(xc+xc*normal,yc+yc*normal,zc+zc*normal);

				
				
			}

			if(i != 0) {
				vertices.push(x1,y1,z1);
				vertices.push(x4,y4,z4);
				vertices.push(x2,y2,z2);

				vertexNormales.push(x1-xSph_cent,y1-ySph_cent,z1-zSph_cent);
				vertexNormales.push(x4-xSph_cent,y4-ySph_cent,z4-zSph_cent);
				vertexNormales.push(x2-xSph_cent,y2-ySph_cent,z2-zSph_cent);

				colors.push(couleur1,couleur1,couleur1,1.0);
				colors.push(couleur1,couleur1,couleur1,1.0);
				colors.push(couleur1,couleur1,couleur1,1.0);

				//calcul du point du centre du triangle
				xc=(x1+x4+x2)/3;
				yc=(y1+y4+y2)/3;
				zc=(z1+z4+z2)/3;

				
				//calcul de vecteur AB
				xab=x4-x1;
				yab=y4-y1;
				zab=z4-z1;

				//calcul de vecteur ac
				xac=x2-x1;
				yac=y2-y1;
				zac=z2-z1;


				vecAB=(xab,yab,zab);
				vecAC=(xac,yac,zac);
				//produit vectoriel
	        	var normal=vec3.cross(vecAB,vecAC)
	        	//normalisation de la normale du triangle
	        	vec3.normalize(normal,normal);
	        	
	        	
	        	//envoit du milieu du triangle
				petitesNormales.push(xc,yc,zc);
				//envoit du milieu du trangle translatee
	       		petitesNormales.push(xc+xc*normal,yc+yc*normal,zc+zc*normal);

            	
				
				


			}

		}
	}


}

// =====================================================
function initBuffers() {
	//declaration des tableaux
	vertices = [];
	colors=[];
	vertexNormales=[];
	petitesNormales=[];
	
	//coordonnées du centre de la sphère
	sphere_center1={x:0.0,y:0.0,z:0.0};
	
	//fonction pour generer une sphere à partir d'un centre et
	//d'un nombre de theta
	generate_sphere(sphere_center1,30);
	
	
	//creation des buffers et envoit des tableaux dans les buffers
	//+definition de la taille et du nombre d'item contenu dans les tableaux.
	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexBuffer.itemSize = 3;
	vertexBuffer.numItems = vertices.length/3;

	//envoit des normales au buffer
	normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormales), gl.STATIC_DRAW);
	normalBuffer.itemSize = 3;
	normalBuffer.numItems = vertexNormales.length/3;

	//envoit des petites normales au buffer qu'on pourra voir s'afficher
	vertexBuffer2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(petitesNormales), gl.STATIC_DRAW);
	vertexBuffer2.itemSize = 3;
	vertexBuffer2.numItems = petitesNormales.length/3;

	//envoit des couleurs au buffer
	colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	colorBuffer.itemSize = 4;
	colorBuffer.numItems = colors.length/4;


	
}


// =====================================================
function loadShaders(shader) {
	loadShaderText(shader,'.vs');
	loadShaderText(shader,'.fs');
}

// =====================================================
function loadShaderText(filename,ext) {   // technique car lecture asynchrone...
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			if(ext=='.vs') { vertShaderTxt = xhttp.responseText; shadersLoaded ++; }
			if(ext=='.fs') { fragShaderTxt = xhttp.responseText; shadersLoaded ++; }
			if(shadersLoaded==2) {
				initShaders(vertShaderTxt,fragShaderTxt);
				shadersLoaded=0;
			}
		}
	}
	xhttp.open("GET", filename+ext, true);
	xhttp.send();
}

// =====================================================
function initShaders(vShaderTxt,fShaderTxt) {

	vshader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(vshader, vShaderTxt);
	gl.compileShader(vshader);
	if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(vshader));
		return null;
	}

	fshader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fshader, fShaderTxt);
	gl.compileShader(fshader);
	if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
		console.log(gl.getShaderInfoLog(fshader));
		return null;
	}

	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vshader);
	gl.attachShader(shaderProgram, fshader);

	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log("Could not initialise shaders");
	}

	gl.useProgram(shaderProgram);


	//liaison faites avec le shader
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	shaderProgram.vertexNormaleAttribute = gl.getAttribLocation(shaderProgram, "a_normal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormaleAttribute);
	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	shaderProgram.objMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	shaderProgram.DirectionLumiere   = gl.getUniformLocation(shaderProgram, "DirectionLumiere"); 
	
	shaderProgram.uMaterialAmbient   = gl.getUniformLocation(shaderProgram, "uMaterialAmbient"); 
    shaderProgram.uMaterialDiffuse   = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
    shaderProgram.uMaterialSpecular  = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
   	shaderProgram.uLightAmbient      = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    shaderProgram.uLightDiffuse      = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    shaderProgram.uLightSpecular     = gl.getUniformLocation(shaderProgram, "uLightSpecular");
	shaderProgram.uShininess         = gl.getUniformLocation(shaderProgram, "uShininess");
    
}


// =====================================================
function setMatrixUniforms() {
	
	if(shaderProgram != null) {
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
		gl.uniformMatrix4fv(shaderProgram.objMatrix, false, objMatrix);
		
		gl.uniform3f(shaderProgram.DirectionLumiere,   2.0, 2.0, 2.0);
		
		gl.uniform4fv(shaderProgram.uLightAmbient, [0.015,0.015,0.015,1.0]);
    	gl.uniform4fv(shaderProgram.uLightDiffuse,  [1.0,1.0,1.0,1.0]); 
    	gl.uniform4fv(shaderProgram.uLightSpecular,  [1.0,1.0,1.0,1.0]);
    	gl.uniform4fv(shaderProgram.uMaterialAmbient, [1.0,1.0,1.0,1.0]); 
    	gl.uniform4fv(shaderProgram.uMaterialDiffuse, [1.0,1.0,1.0,1.0]);
    	gl.uniform4fv(shaderProgram.uMaterialSpecular,[1.0,1.0,1.0,1.0]);
    	gl.uniform1f(shaderProgram.uShininess, 75.0);
		
	}
}

// =====================================================
function drawScene() {
	var z_camera=-4.0;
	gl.clear(gl.COLOR_BUFFER_BIT);

	if(shaderProgram != null) {
		//Envoit des triangle au shader
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.vertexAttribPointer(
		shaderProgram.vertexPositionAttribute,
		vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//envoit des couleurs au shader
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.vertexAttribPointer(
		shaderProgram.vertexColorAttribute,
		colorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		//Envoit des normales au shader, important pour les jeux de lumières
		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
		gl.vertexAttribPointer(
   		shaderProgram.vertexNormaleAttribute, 3, gl.FLOAT, false, 0, 0);

		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [0.0, 0.0, z_camera]);
		mat4.multiply(mvMatrix, objMatrix);
		worldmatrix=mat4.multiply(mvMatrix, objMatrix);

		setMatrixUniforms();

		//dessine en prenant compte des triangles de la sphere
		// gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);





		//Envoit des petites normales à la spheres, au shader 
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
		gl.vertexAttribPointer(
		shaderProgram.vertexPositionAttribute,
		vertexBuffer2.itemSize, gl.FLOAT, false, 0, 0);

		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [0.0, 0.0, z_camera]);
		mat4.multiply(mvMatrix, objMatrix);
		worldmatrix=mat4.multiply(mvMatrix, objMatrix);

		setMatrixUniforms();

		//dessine les petites normales
		gl.drawArrays(gl.LINES, 0, vertexBuffer2.numItems);






	
	


	}
}


