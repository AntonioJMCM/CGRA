/**
 * MyHook
 * @constructor
 */
function MyHook(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

    this.height=1;

    this.cable=new MyCilinder(scene,this.slices,this.stacks);
    
    this.gancho=new MyHalfCylinder(scene,this.slices,this.stacks);

 };

 MyHook.prototype = Object.create(CGFobject.prototype);
 MyHook.prototype.constructor = MyHook;

 MyHook.prototype.display = function() {

    
    this.scene.pushMatrix();
    this.scene.translate(0,0,0);
    this.scene.scale(0.1, this.height, 0.1);
	this.scene.rotate(90*degToRad, 1, 0, 0);
	this.cable.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
 	this.scene.translate(0,-13*this.height,0);
 	this.scene.scale(0.3, 0.3, 0.3);
 	this.gancho.display();
 	this.scene.popMatrix();
    

 }
