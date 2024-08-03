var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.enableTextures(true);
	
	this.initLights();

	this.transporting = 0;
	
	this.light0=true;
	this.light1=true;
	this.light2=true;
	this.light3=true;
	this.light4=true;
 	this.speed=3;
 	this.scale_rotors = 1;

 	this.clockEnable=true;
	

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	this.droneAppearances = [];
	this.droneAppearancesList= {};
	this.currDroneAppearance=0;

	this.droneAppearancesList["Metal"]=0;
	this.droneAppearancesList["Rusty"]=1;

	// Scene elements
	this.table = new MyTable(this,0,1,0,1);
	this.wall = new MyQuad(this,0, 1, 0, 1);
	this.left_wall= new MyQuad(this,-0.5, 1.5, -0.5, 1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.clock= new MyClock(this,12,1);	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS, -0.25, 1.25,0, 1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS, 0, 1, 0, 1);
	this.drone= new MyDrone(this);
	this.carga = new MyCargo(this);
	this.destino=new MyDestination(this);

	this.cargax = 4.5;
	this.cargay = 4;
	this.cargaz = 9;
	this.cargaang = 0;

	
	this.destx = 12;
	this.desty = 3.8;
	this.destz = 8;

	// Materials
	this.materialDefault = new CGFappearance(this);	

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.floorAppearance.setShininess(10);
	this.floorAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setTextureWrap('REPEAT', 'REPEAT');

	this.window = new CGFappearance(this);
	this.window.loadTexture("../resources/images/window.png");
	this.window.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setSpecular(0.2, 0.2, 0.2, 1);
	this.slidesAppearance.setShininess(10);
	this.slidesAppearance.setDiffuse(0.8, 0.8, 0.8, 1);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.setSpecular(0.5, 0.5, 0.5, 1);
	this.boardAppearance.setShininess(100);
	this.boardAppearance.setDiffuse(0.3, 0.3, 0.3, 1);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');


	this.blue = new CGFappearance(this);
	this.blue.setAmbient(0,0,0.3,1);
	this.blue.setDiffuse(0.2,0.2,0.6,1);
	this.blue.setSpecular(0.2,0.2,0.8,1);	
	this.blue.setShininess(120);

	this.yellow = new CGFappearance(this);
	this.yellow.setAmbient(0,0,0,1);
	this.yellow.setDiffuse(0.8,0.8,0.2,1);
	this.yellow.setSpecular(0.8,0.8,0.2,1);	
	this.yellow.setShininess(120);

	this.red = new CGFappearance(this);
	this.red.setAmbient(0,0,0,1);
	this.red.setDiffuse(0.8,0,0.2,1);
	this.red.setSpecular(0.8,0,0.2,1);	
	this.red.setShininess(120);

	//drone texture
	this.firstTexture = new CGFappearance(this);
	this.firstTexture.loadTexture("../resources/images/metal.png");

	this.droneAppearances.push(this.firstTexture);


	this.secondTexture = new CGFappearance(this);
	this.secondTexture.loadTexture("../resources/images/rusty.png");

	this.droneAppearances.push(this.secondTexture);

	this.setUpdatePeriod(10);
		
};

LightingScene.prototype.CheckCargoClose = function()
{
	if(Math.sqrt((this.drone.hookx-this.cargax)*(this.drone.hookx-this.cargax)+(this.drone.hooky-this.cargay)*(this.drone.hooky-this.cargay)+(this.drone.hookz-this.cargaz)*(this.drone.hookz-this.cargaz)) < 0.4 )
	{
		this.transporting = 1;
	}
};

LightingScene.prototype.CheckCargoDest = function()
{
	if(Math.sqrt((this.destx-this.cargax)*(this.destx-this.cargax)+(this.desty-this.cargay)*(this.desty-this.cargay)+(this.destz-this.cargaz)*(this.destz-this.cargaz)) < 0.4 )
	{
		this.transporting = 2;
	}
};

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0,0,0,1.0);

	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true);

	this.lights[3].setPosition(4, 6, 5, 1);
	this.lights[3].setVisible(true);	

	//this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)
	//this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	//this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1,1,0,1);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1,1,1,1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1,1,0,1);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].enable();

	this.lights[4].setPosition(8, 8, 8, 1);
	this.lights[4].setVisible(true); // show marker on light position (different from enabled)
	this.lights[4].setAmbient(0.6, 0.6, 0.6, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1,1,1,1);
	this.lights[4].enable();

	
};

LightingScene.prototype.updateLights = function() {
	
	if(this.light0)
		this.lights[0].enable();	
	else
		this.lights[0].disable();
	
	if(this.light1)
		this.lights[1].enable();	
	else
		this.lights[1].disable();
	
	if(this.light2)
		this.lights[2].enable();	
	else
		this.lights[2].disable();

	if(this.light3)
		this.lights[3].enable();	
	else
		this.lights[3].disable();

	if(this.light4)
		this.lights[4].enable();	
	else
		this.lights[4].disable();
				

	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
		
};

LightingScene.prototype.update = function(currTime) {


	this.drone.update(currTime);
	this.CheckCargoClose();
	this.CheckCargoDest();

	if(this.transporting == 1)
	{
		this.cargax = this.drone.hookx;
		this.cargay = this.drone.hooky-0.25;
		this.cargaz = this.drone.hookz;

		if(this.drone.keyA)
			this.cargaang += (this.speed * degToRad);

		if(this.drone.keyD)
			this.cargaang -= (this.speed *degToRad);
	}
	
	if(this.clockEnable)
	{
		this.clock.update(currTime);
	}
	
};

LightingScene.prototype.doSomething = function ()
{ 
	console.log("Doing something..."); 
};


LightingScene.prototype.display = function() {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();


	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		this.floorAppearance.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		this.window.apply();
		this.left_wall.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialDefault.apply();
		this.wall.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.materialDefault.apply();
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.materialDefault.apply();
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		//this.materialA.apply();
		this.slidesAppearance.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
	this.translate(10.5, 4.5, 0.2);
	this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
	//this.materialB.apply();
	this.boardAppearance.apply();
	this.boardB.display();
	this.popMatrix();

	//Clock
	this.pushMatrix();
	this.translate(7.25,7.5,0.2);
	this.clock.display();
	this.popMatrix();

	//Drone
	this.pushMatrix();
	this.translate(this.drone.x,this.drone.y,this.drone.z);
	this.rotate(this.drone.yRot,0,1,0);
	this.drone.display();
	this.popMatrix();

	//Carga
	this.pushMatrix();
	this.translate(this.cargax,this.cargay,this.cargaz);
	this.rotate(this.cargaang, 0,1,0);
	this.scale(1,0.5,0.7);
	if(this.transporting == 0)
		this.yellow.apply();
	else if(this.transporting == 1)
		this.red.apply();
	else if(this.transporting == 2)
		this.blue.apply();
	this.carga.display();
	this.popMatrix();

	//Destino
	this.pushMatrix();
	this.translate(this.destx,this.desty,this.destz);
	this.red.apply();
	this.destino.display();
	this.popMatrix();


	// ---- END Primitive drawing section
};

