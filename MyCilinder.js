/**
 * MyCylinder
 * @constructor
 */
 function MyCilinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices=slices;
	this.stacks=stacks;

 	this.initBuffers();
 };

 MyCilinder.prototype = Object.create(CGFobject.prototype);
 MyCilinder.prototype.constructor = MyCilinder;

 MyCilinder.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];

	this.texCoords = [
 	];

	var angle = 2 * Math.PI / (this.slices);

	for (var stack = 0; stack < this.stacks + 1; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
		this.vertices.push(Math.cos(slice * angle), Math.sin(slice * angle), stack); // this.stacks);
		this.normals.push(Math.cos(slice * angle), Math.sin(slice * angle),stack);
		}
	}

	for (var stack = 0; stack < this.stacks ; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			if (slice == this.slices - 1)
			{
				this.indices.push((stack * this.slices + slice),  (stack * this.slices + slice) + 1 - this.slices, (((stack + 1) * this.slices + slice) + 1) - this.slices);
				this.indices.push((stack * this.slices + slice), (((stack + 1) * this.slices + slice) + 1) - this.slices, ((stack + 1) * this.slices + slice));
			}
			else
			{
				this.indices.push((stack * this.slices + slice), (stack * this.slices + slice) + 1, ((stack + 1) * this.slices + slice) + 1);
				this.indices.push((stack * this.slices + slice), ((stack + 1) * this.slices + slice) + 1, ((stack + 1) * this.slices + slice));
			}
		}
	}
	
	var s = 0;
	var t = 0;
	var sinc = 1/this.slices;
	var tinc = 1/this.stacks;
	for (var a = 0; a <= this.stacks; a++) {
		for (var b = 0; b < this.slices; b++) {
			this.texCoords.push(s);
			this.texCoords.push(t);
			s += sinc;
		}
		s = 0;
		t += tinc;
	}


 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };