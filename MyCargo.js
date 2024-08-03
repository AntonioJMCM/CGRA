/**
 * MyCargo
 * @constructor
 */
 function MyCargo(scene)
 {
 	CGFobject.call(this,scene);
 	this.cargo = new MyUnitCubeQuad(this.scene, 0,1,0,1);

 	
 };

 MyCargo.prototype = Object.create(CGFobject.prototype);
 MyCargo.prototype.constructor = MyCargo;

 MyCargo.prototype.display = function() 
 {
 	this.scene.pushMatrix();
 		this.cargo.display();
	this.scene.popMatrix();
 };