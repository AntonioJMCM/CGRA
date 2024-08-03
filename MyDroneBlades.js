/**
 * MyDroneBlades
 * @constructor
 */
 function MyDroneBlades(scene,ang) {
	
	 CGFobject.call(this, scene);
     this.scene = scene;
     this.stacks = 2;
     this.slices = 12;
     this.angle = ang;

     this.blade = new MyCilinder(this.scene,12,2);
     this.sphere = new MyHalfSphere(this.scene,30,30,2);

 };

MyDroneBlades.prototype = Object.create(CGFobject.prototype);
MyDroneBlades.prototype.constructor = MyDroneBlades;

MyDroneBlades.prototype.incAngle = function(angle){
    
    this.angle += angle;


};

MyDroneBlades.prototype.display = function(){
    
    this.scene.pushMatrix();
	this.scene.translate(0,0.55,-this.stacks/2);
	this.scene.scale(0.1,0,1);
	this.blade.display();
	this.scene.popMatrix();

	this.scene.pushMatrix();
	this.scene.translate(0,0.55,0);
	this.scene.scale(0.1,0.1,0.1);
	this.sphere.display();
	this.scene.popMatrix();


};