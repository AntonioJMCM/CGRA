/**
 * MyTable
 * @constructor
 */
function MyTable(scene, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	this.minS = minS;
    this.maxS = maxS;
    this.minT = minT;
    this.maxT = maxT;
    
	this.cube=new MyUnitCubeQuad(this.scene, this.minS, this.maxS, this.minT, this.maxT);
	
    this.tableAppearance= new CGFappearance(this.scene);
	this.tableAppearance.setAmbient(0,0,0,1);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(50);
	this.tableAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.tableAppearance.loadTexture("../resources/images/table.png");

}

MyTable.prototype = Object.create(CGFobject.prototype);
MyTable.prototype.constructor=MyTable;


MyTable.prototype.display=function()
{
    this.scene.pushMatrix();
    this.scene.translate(2,1.75,1);
    this.scene.scale(0.3,3.5,0.3);    
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(2,1.75,-1);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2,1.75,1);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(-2,1.75,-1);
    this.scene.scale(0.3,3.5,0.3);
    this.cube.display();
    this.scene.popMatrix();

    //Tampo
    this.scene.pushMatrix();
    this.scene.translate(0,3.5,0);
    this.scene.scale(5,0.3,3);
    this.tableAppearance.apply();
    this.cube.display();
    this.scene.popMatrix();

}