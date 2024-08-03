/**
 * MyDestination
 * @constructor
 */
 function MyDestination(scene)
 {
 	CGFobject.call(this,scene);
 	this.cargo = new MyUnitCubeQuad(this.scene, 0,1,0,1);

 	this.cargoang = 0;
 };

 MyDestination.prototype = Object.create(CGFobject.prototype);
 MyDestination.prototype.constructor = MyDestination;

 MyDestination.prototype.display = function() 
 {
 	this.scene.pushMatrix();
 		this.scene.rotate(this.cargoang, 0,1,0);
 		this.scene.scale(1,0.1,1);
 		this.cargo.display();
	this.scene.popMatrix();
 };