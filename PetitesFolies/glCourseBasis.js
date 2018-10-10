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
function generate_sphere(sphere_center,couleur,nbTh){
	couleur2=0.0;
	xSph_cent=sphere_center.x;
	ySph_cent=sphere_center.y;
	zSph_cent=sphere_center.z;

	nbTh=nbTh;
	nbPh=nbTh*2;

	deltaTh=Math.PI/nbTh;
	deltaPh=(2*Math.PI)/nbPh;
	
	for(i=0;i<nbTh;i++){
		Th1=i*deltaTh;
		Th2=(i+1)*deltaTh;
		
		for(j=0;j<nbPh;j++){

			Ph1=j*deltaPh;
			Ph2=(j+1)*deltaPh;

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

			couleur=1.0;


			if(i < nbTh-1) {
				vertices.push(x1,y1,z1);
				vertices.push(x3,y3,z3);
				vertices.push(x4,y4,z4);
				
			
				xG=(x1+x3+x4)/3;
				yG=(y1+y3+y4)/3;
				zG=(z1+z3+z4)/3;
				//coordonnees milieu triangle
				petitesNormales.push(xG,yG,zG);
				petitesNormales.push((xG-xSph_cent)*1.01,(yG-ySph_cent)*1.01,(zG-zSph_cent)*1.01);



			

				vec_X1=x1-xSph_cent;


				vertexNormales.push(vec_X1,y1-ySph_cent,z1-zSph_cent);
				vertexNormales.push(x3-xSph_cent,y3-ySph_cent,z3-zSph_cent);
				vertexNormales.push(x4-xSph_cent,y4-ySph_cent,z4-zSph_cent);

				couleur_vec_X1=(vec_X1+1)/2;

				colors.push(couleur_vec_X1,couleur2,couleur,1.0);
				colors.push(couleur_vec_X1,couleur2,couleur,1.0);
				colors.push(couleur_vec_X1,couleur2,couleur,1.0);

				
			}

			if(i != 0) {
				vertices.push(x1,y1,z1);
				vertices.push(x4,y4,z4);
				vertices.push(x2,y2,z2);

				xG=(x1+x4+x2)/3;
				yG=(y1+y4+y2)/3;
				zG=(z2+z4+z2)/3;
				//coordonnees milieu triangle
				// petitesNormales.push(xG,yG,zG);
				// petitesNormales.push((xG-xSph_cent)*1.01,(yG-ySph_cent)*1.02,(zG-zSph_cent)*1.02);
				
				
			
				


				

				vec_X1=x1-xSph_cent;

				vertexNormales.push(x1-xSph_cent,y1-ySph_cent,z1-zSph_cent);
				vertexNormales.push(x4-xSph_cent,y4-ySph_cent,z4-zSph_cent);
				vertexNormales.push(x2-xSph_cent,y2-ySph_cent,z2-zSph_cent);

				couleur_vec_X1=(vec_X1+1)/2;

				colors.push(couleur_vec_X1,couleur2,couleur,1.0);
				colors.push(couleur_vec_X1,couleur2,couleur,1.0);
				colors.push(couleur_vec_X1,couleur2,couleur,1.0);


			}

		}
	}


}
// =====================================================
function initBuffers() {
	
	vertices = [];
	vertices_plan=[0,0,0,
	5,5,5];
	colors=[];
	vertexNormales=[];
	petitesNormales=[];
	
	var compteur1=0;
	//coordonnées du centre de la sphère
	
	sphere_center1={x:0.0,y:0.0,z:0.0};
	sphere_center2={x:2.0,y:0.0,z:0.0};
	sphere_center3={x:4.0,y:0.0,z:0.0};
	sphere_center4={x:6.0,y:0.0,z:0.0};
	sphere_center5={x:8.0,y:0.0,z:0.0};

	// sphere_center2={x:-5.0,y:5.0,z:-2.0};
	// sphere_center3={x:-5.0,y:-5.0,z:-2.0};
	// sphere_center4={x:5.0,y:-5.0,z:-2.0};
	

	generate_sphere(sphere_center1,1.0,100);
	generate_sphere(sphere_center2,1.0,100);
	generate_sphere(sphere_center3,1.0,100);
	generate_sphere(sphere_center4,1.0,100);
	generate_sphere(sphere_center5,1.0,100);
	
	generate_contraste(vertices);
	// generate_sphere(sphere_center2,1.0,50);
	// generate_sphere(sphere_center3,1.0,50);
	// generate_sphere(sphere_center4,1.0,50);



	vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	vertexBuffer.itemSize = 3;
	vertexBuffer.numItems = vertices.length/3;

	vertexBuffer2 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(petitesNormales), gl.STATIC_DRAW);
	vertexBuffer2.itemSize = 3;
	vertexBuffer2.numItems = petitesNormales.length/3;



	colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	colorBuffer.itemSize = 4;
	colorBuffer.numItems = colors.length/4;


	normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormales), gl.STATIC_DRAW);
	normalBuffer.itemSize = 3;
	colorBuffer.numItems = vertexNormales.length/3;

	planBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, planBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_plan), gl.STATIC_DRAW);
	planBuffer.itemSize = 3;
	planBuffer.numItems = vertices_plan.length/3;



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


	
	shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	
	shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
	

	shaderProgram.vertexNormaleAttribute = gl.getAttribLocation(shaderProgram, "a_normal");
	gl.enableVertexAttribArray(shaderProgram.vertexNormaleAttribute);


	shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	// shaderProgram.colorLocation = gl.getUniformLocation(shaderProgram, "u_color");
	shaderProgram.reverseLightDirectionLocation =gl.getUniformLocation(shaderProgram, "SourceLumineuse");

	
	
	shaderProgram.uMaterialAmbient   = gl.getUniformLocation(shaderProgram, "uMaterialAmbient"); 
    shaderProgram.uMaterialDiffuse   = gl.getUniformLocation(shaderProgram, "uMaterialDiffuse");
    shaderProgram.uMaterialSpecular  = gl.getUniformLocation(shaderProgram, "uMaterialSpecular");
   
   	shaderProgram.uLightAmbient      = gl.getUniformLocation(shaderProgram, "uLightAmbient");
    shaderProgram.uLightDiffuse      = gl.getUniformLocation(shaderProgram, "uLightDiffuse");
    shaderProgram.uLightSpecular     = gl.getUniformLocation(shaderProgram, "uLightSpecular");

     shaderProgram.uShininess          = gl.getUniformLocation(shaderProgram, "uShininess");
    
}


// =====================================================
function setMatrixUniforms() {
	if(shaderProgram != null) {
		gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);

		// gl.uniform4fv(shaderProgram.colorLocation, [0.2, 1, 0.2, 1]); // green
		gl.uniform3fv(shaderProgram.reverseLightDirectionLocation, [2.0, 2.0, 3.0]);
		
		
    	gl.uniform4fv(shaderProgram.uLightAmbient, [0.015,0.015,0.015,1.0]);
    	gl.uniform4fv(shaderProgram.uLightDiffuse,  [1.0,1.0,1.0,1.0]); 
    	gl.uniform4fv(shaderProgram.uLightSpecular,  [1.0,1.0,1.0,1.0]);
    	
    	gl.uniform4fv(shaderProgram.uMaterialAmbient, [1.0,1.0,1.0,1.0]); 
    	gl.uniform4fv(shaderProgram.uMaterialDiffuse, [1.0,1.0,1.0,1.0]);
    	gl.uniform4fv(shaderProgram.uMaterialSpecular,[1.0,1.0,1.0,1.0]);
    	
    	gl.uniform1f(shaderProgram.uShininess, 20.0);
		
		

	}
}

// =====================================================
function drawScene() {
	gl.clear(gl.COLOR_BUFFER_BIT);

	if(shaderProgram != null) {
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		gl.vertexAttribPointer(
		shaderProgram.vertexPositionAttribute,
		vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);

	
		

		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.vertexAttribPointer(
		shaderProgram.vertexColorAttribute,
		colorBuffer.itemSize, gl.FLOAT, false, 0, 0);


		gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
		gl.vertexAttribPointer(
   		 shaderProgram.vertexNormaleAttribute, 3, gl.FLOAT, false, 0, 0);


		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [0.0, 0.0, -19.0]);
		mat4.multiply(mvMatrix, objMatrix);

		setMatrixUniforms();


		gl.drawArrays(gl.TRIANGLES, 0, vertexBuffer.numItems);




		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2);
		gl.vertexAttribPointer(
		shaderProgram.vertexPositionAttribute,
		vertexBuffer2.itemSize, gl.FLOAT, false, 0, 0);


		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);
		mat4.multiply(mvMatrix, objMatrix);

		setMatrixUniforms();

		// gl.drawArrays(gl.LINES, 0, vertexBuffer2.numItems);






		gl.bindBuffer(gl.ARRAY_BUFFER, planBuffer);
		gl.vertexAttribPointer(
		shaderProgram.vertexPositionAttribute,
		planBuffer.itemSize, gl.FLOAT, false, 0, 0);


		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);
		mat4.translate(mvMatrix, [0.0, 0.0, -5.0]);
		mat4.multiply(mvMatrix, objMatrix);

		setMatrixUniforms();

		gl.drawArrays(gl.LINES, 0, planBuffer.numItems);




	}
}


