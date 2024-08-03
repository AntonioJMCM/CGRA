/**
 * MyHalfCylinder
 * @constructor
 */

function MyHalfCylinder(scene, slices, stacks) 
 {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyHalfCylinder.prototype = Object.create(CGFobject.prototype);
 MyHalfCylinder.prototype.constructor = MyHalfCylinder;

 MyHalfCylinder.prototype.initBuffers = function() 
 {
 	
 	this.vertices =[];
 	this.indices =[];
 	this.normals =[];
	

	var angle = 2*Math.PI/this.slices/2;
	
	for (var i=0; i <= this.stacks;i++)
	{
		for ( var j=0; j < this.slices;j++)
		{
			this.vertices.push(Math.cos(angle*j),Math.sin(angle*j),i/this.stacks);
			this.normals.push(Math.cos(angle*j),Math.sin(angle*j),0);
		}
	}
	

	for (var i=0; i < this.stacks;i++)
	{
		var n = this.slices*i;
		
		for ( var j=0; j < this.slices-1;j++)
		{ 
			if(j == this.slices -1)
			{
				this.indices.push(n+j, n+this.slices+j+1-this.slices,n+this.slices+j);
				this.indices.push(n+j, n+j+1-this.slices, n+this.slices+j+1-this.slices);
				
				this.indices.push(n+j, n+this.slices+j,  n+this.slices+j+1-this.slices);
				this.indices.push(n+j, n+this.slices+j+1-this.slices, n+j+1-this.slices);
			}
			else
			{
				this.indices.push(n+j, n+this.slices+j+1,n+this.slices+j);
				this.indices.push(n+j,n+j+1, n+this.slices+j+1);
				
				this.indices.push(n+j, n+this.slices+j, n+this.slices+j+1);
				this.indices.push(n+j, n+this.slices+j+1, n+j+1);
			}
		}
		
	}
			
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };