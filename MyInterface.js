/**
 * MyInterface
 * @constructor
 */ 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	this.gui.add(this.scene,'clockEnable');

	//this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)



	
	/*var group=this.gui.addFolder("Options");
	group.open();*/

	
	var group=this.gui.addFolder("Luzes");
	group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	group.add(this.scene, 'light0');
	group.add(this.scene, 'light1');
	group.add(this.scene, 'light2');
	group.add(this.scene, 'light3');
	group.add(this.scene, 'light4');

	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	//this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -5, 5);

	this.gui.add(this.scene, 'scale_rotors', 0.1, 2);

	this.gui.add(this.scene,'currDroneAppearance',this.scene.droneAppearancesList);


	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (119):	//move forward 
			//this.scene.drone.moveForward(this.scene.speed);
			this.scene.drone.keyW = true;
			break;

		case(115): //move backwards
			//this.scene.drone.moveBackward(this.scene.speed);
			this.scene.drone.keyS = true;
			break;

		case(97): //rotate left
			//this.scene.drone.rotateLeft(this.scene.speed);
			this.scene.drone.keyA = true;
			break;

		case(100): //rotate right
			//this.scene.drone.rotateRight(this.scene.speed);
			this.scene.drone.keyD = true;
			break;

		case(105):  //up
			//this.scene.drone.moveUp(this.scene.speed);
			this.scene.drone.keyI = true;
			break;

		case(106):	//down
			//this.scene.drone.moveDown(this.scene.speed);
			this.scene.drone.keyJ = true;
			break;

		case(112)://P
			this.scene.drone.keyP=true;
			break;
			
		case(108)://L
			this.scene.drone.keyL=true;
			break;	
	};	
};


MyInterface.prototype.processKeyUp = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyUp.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case (65):
		case(107):	
			this.scene.drone.keyA = false;
			break;

		case(87):
			this.scene.drone.keyW = false;
			break;
		case(68):
			this.scene.drone.keyD = false;
			break;
		case(83):
			this.scene.drone.keyS = false;
		case(73):
			this.scene.drone.keyI = false;
			break;

		case(74):
			this.scene.drone.keyJ =false;
			break;

		case(80):
			this.scene.drone.keyP=false;
			break;

		case(76):
			this.scene.drone.keyL=false;
			break;	

			
	};
};