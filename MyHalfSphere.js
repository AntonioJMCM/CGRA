/**
 * MyHalfSphere
 * @constructor
 */
 function MyHalfSphere(scene,latb,lonb,rad) {
	
	this.latitudeBands = latb;
	this.longitudeBands = lonb;
	this.radius = rad;
 	CGFobject.call(this,scene);
	
	
	
 	this.initBuffers();
 };

 MyHalfSphere.prototype = Object.create(CGFobject.prototype);
 MyHalfSphere.prototype.constructor = MyHalfSphere;

 MyHalfSphere.prototype.initBuffers = function() {

	this.indices = [
 	];
 	this.vertices = [
 	];
 	this.normals = [
 	];
	this.texCoords = [
	];

    var latitudeBands = 30;
    var longitudeBands = 30; //testes
    var radius = 2;

   
    for (var latNumber = 0; latNumber <= this.latitudeBands/2; latNumber++) {

      var theta = latNumber * Math.PI / this.latitudeBands;
      var sinTheta = Math.sin(theta);
      var cosTheta = Math.cos(theta);

      for (var longNumber = 0; longNumber <= this.longitudeBands; longNumber++) {
        var phi = longNumber * 2 * Math.PI / this.longitudeBands;
        var sinPhi = Math.sin(phi);
        var cosPhi = Math.cos(phi);

        var x = sinPhi * sinTheta;
        var y = cosTheta;
        var z = cosPhi * sinTheta;
       	var u = 1 - (longNumber / this.longitudeBands);
        var v = 1 - (latNumber / this.latitudeBands);

        this.normals.push(x);
        this.normals.push(y);
        this.normals.push(z);
       	this.texCoords.push(u);
        this.texCoords.push(v);
        this.vertices.push(this.radius * x);
        this.vertices.push(this.radius * y);
        this.vertices.push(this.radius * z);


        }

    }



    for (var latNumber = 0; latNumber < this.latitudeBands/2; latNumber++) {
      for (var longNumber = 0; longNumber < this.longitudeBands; longNumber++) {
        var first = (latNumber * (this.longitudeBands + 1)) + longNumber;
        var second = first + this.longitudeBands + 1;
        this.indices.push(first);
        this.indices.push(second);
        this.indices.push(first + 1);

        this.indices.push(second);
        this.indices.push(second + 1);
        this.indices.push(first + 1);
      }
    }


    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();




 }