 /**
 * MyCylinder
 * @constructor
 */
 function MyCilinderTop(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;
 	this.initBuffers();
 };

 MyCilinderTop.prototype = Object.create(CGFobject.prototype);
 MyCilinderTop.prototype.constructor = MyCilinder;

 MyCilinderTop.prototype.initBuffers = function() {

 	var angle = 2*Math.PI/this.slices;
 	var a = 0;
 	

	this.vertices=[];
 	this.normals=[];
 	this.texCoords=[];
 	this.indices=[];

 	for(j = 0; j < this.slices;j++){
 		this.vertices.push(Math.cos(j*angle),Math.sin(j*angle),1);
 		this.normals.push(0,0,1);
		this.texCoords.push((Math.cos(j*angle)+1)/2,-((Math.sin(j*angle)+1)/2));
 	}


	for(j=0; j < this.slices-2;j++){
		this.indices.push(0,j+1,j+2);
	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 }
