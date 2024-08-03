/**
 * MyClock
 * @constructor
 */
 function MyClock(scene, slices, stacks) {
 	CGFobject.call(this,scene);
 	 this.time = 0;
	
	this.slices=slices;
	this.stacks=stacks;
	this.clock=new MyCilinder(this.scene,this.slices,this.stacks);
	this.clockTop= new MyCilinderTop(this.scene,this.slices);

	this.clockAppearance= new CGFappearance(this.scene);
	this.clockAppearance.setAmbient(0,0,0,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setShininess(150);
	this.clockAppearance.setDiffuse(0.7,0.7,0.7,1);
	this.clockAppearance.loadTexture("../resources/images/clock.png");

	this.material = new CGFappearance(this.scene);
	this.material.setAmbient(0.5, 0.5, 0.5, 1);
	this.material.setDiffuse(0.5, 0.5, 0.5, 1);
	this.material.setSpecular(0.5, 0.5, 0.5, 1);
	this.material.setShininess(40);

	this.horas = new MyClockHand(this.scene);
	this.segundos = new MyClockHand(this.scene);
	this.minutos = new MyClockHand(this.scene);
	

	this.minutos.setAngle(180);
	this.horas.setAngle(90);
	this.segundos.setAngle(270);
 };

 MyClock.prototype = Object.create(CGFobject.prototype);
 MyClock.prototype.constructor = MyClock;

 MyClock.prototype.display = function() {

	this.scene.pushMatrix();
    this.clock.display();
    this.scene.popMatrix();

	this.scene.pushMatrix();
    this.clockAppearance.apply();
    this.clockTop.display();
    this.scene.popMatrix();

    /* Horas */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.horas.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.4,1)
    this.material.apply();
    this.horas.display();
	this.scene.popMatrix();

	/* Minutos */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.minutos.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.7,1);
    this.material.apply();
    this.minutos.display();
	this.scene.popMatrix();

	/* Segundos */

	this.scene.pushMatrix();
	this.scene.rotate(-Math.PI * this.segundos.angle / 180,0,0,1);
    this.scene.translate(0,0,1);
    this.scene.scale(1,0.8,1);
    this.material.apply();
    this.segundos.display();
	this.scene.popMatrix();
 }


MyClock.prototype.update = function(currTime) {
	
	 this.time++;
    if(this.time%20 == 0) {
        this.segundos.setAngle(this.segundos.angle + 6);
        this.minutos.setAngle(this.minutos.angle + 6/60);
        this.horas.setAngle(this.horas.angle + 6/60/60);
    }
};
            



