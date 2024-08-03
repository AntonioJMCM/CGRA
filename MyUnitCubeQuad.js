/**
 * MyUnitCubeQuad
 * @constructor
 */
 function MyUnitCubeQuad(scene, minS, maxS, minT, maxT) {
 	CGFobject.call(this, scene);

    this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
 	this.quad = new MyQuad(this.scene, this.minS, this.maxS, this.minT, this.maxT);
 };

 MyUnitCubeQuad.prototype = Object.create(CGFobject.prototype);
 MyUnitCubeQuad.prototype.constructor = MyUnitCubeQuad;

 MyUnitCubeQuad.prototype.display = function() {
 	// front face
 	this.scene.pushMatrix();
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(180 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// top face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// back face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 1, 0, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// right face
 	this.scene.pushMatrix();
 	this.scene.rotate(-90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();

 	// left face
 	this.scene.pushMatrix();
 	this.scene.rotate(90 * degToRad, 0, 1, 0);
 	this.scene.translate(0, 0, 0.5);
 	this.quad.display();
 	this.scene.popMatrix();
 };