/**
 * MyDrone
 * @constructor
 */
var degToRad = Math.PI / 180.0;

 function MyDrone(scene) {
	CGFobject.call(this,scene);

	this.KeyW = false;
	this.KeyA = false;
	this.KeyS = false;
	this.KeyD = false;
	this.KeyI = false;
	this.KeyJ = false;
	this.keyP=false;
	this.keyL=false;
	
	this.hookinc = 0.02;

	//drone control
	this.x=10;
	this.y=5;
	this.z=5;
	
	this.tilt = 0;
	this.incTilt = 0.03;
	this.yRot=200*degToRad;
	



	//blades

	/*this.bladeAngle1 = 0;
	this.bladeAngle2 = 0;
	this.bladeAngle3 = 0;
	this.bladeAngle4 = 0;*/ //blade.setangle



	this.speedN = Math.PI*2/100;
	this.speedR = Math.PI*2/20;
	this.speedL = Math.PI*2/1000;


	this.bladeRot1 = 1; //direccao de rotacao de cada uma das helices
	this.bladeRot2 = 1;
	this.bladeRot3 = -1;
	this.bladeRot4 = -1;

	this.bladeSpeed1 = this.speedN;
	this.bladeSpeed2 = this.speedN;
	this.bladeSpeed3 = this.speedN;
	this.bladeSpeed4 = this.speedN;

	this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1;
	this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2;
	this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3;
	this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4;


	


	//objects
	this.slices = 12;
	this.stacks = 3;
	this.cilinder1 = new MyCilinder(this.scene,this.slices, this.stacks);
	this.cilinder2 = new MyCilinder(this.scene,12, 1);
	this.cilinder2Top = new MyCilinderTop(this.scene,12,1);
	this.sphere = new MyHalfSphere(this.scene,30,30,2);
	this.halfc = new MyHalfCylinder(this.scene, 100, 100);
	this.cube = new MyUnitCubeQuad(this.scene);
	this.hook = new MyHook(this.scene,10,13);


	this.blade1 = new MyDroneBlades(this.scene,0);
	this.blade2 = new MyDroneBlades(this.scene,0);
	this.blade3 = new MyDroneBlades(this.scene,0);
	this.blade4 = new MyDroneBlades(this.scene,0);

	this.hookx = this.x;
	this.hooky = this.y+ this.hook.height;
	this.hookz = this.z;


	this.initBuffers();
};


MyDrone.prototype.getHookPos = function()
{
	this.coords = {};
	//x
	this.coords[0] = this.x;
	//y
	this.coords[1] = this.y - this.hook.height - 0.25;
	//z
	this.coords[2] = this.z;
	
	return this.coords;
}

MyDrone.prototype = Object.create(CGFobject.prototype);
MyDrone.prototype.constructor=MyDrone;

MyDrone.prototype.display = function() {

	this.scene.pushMatrix();
	this.scene.scale(0.5,0.5,0.5);
	this.hook.display();
	this.scene.popMatrix();
	
	this.scene.droneAppearances[this.scene.currDroneAppearance].apply();
	this.scene.rotate(this.tilt,1,0,0);
	
	//braço 1
	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,1);
	this.scene.translate(0,0,-this.stacks/2);
    this.cilinder1.display();
    this.scene.popMatrix();
	
	//base helices
	
	//base helice tras
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,-this.stacks/2);
	this.scene.scale(0.25,0.75,0.25);
	this.scene.rotate(90*degToRad,1,0,0);
	this.cilinder2.display();
	this.cilinder2Top.display();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,-1)
	this.cilinder2Top.display();
    this.scene.popMatrix();

    //base helice frente
	this.scene.pushMatrix();
	this.scene.translate(0,0.5,this.stacks/2);
	this.scene.scale(0.25,0.75,0.25);
	this.scene.rotate(90*degToRad,1,0,0);
	this.cilinder2.display();
	this.cilinder2Top.display();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,-1)
	this.cilinder2Top.display();
    this.scene.popMatrix();

    //base helice lado direito
    this.scene.pushMatrix();
	this.scene.translate(-this.stacks/2,0.5,0);
	this.scene.scale(0.25,0.75,0.25);
	this.scene.rotate(90*degToRad,1,0,0);
	this.cilinder2.display();
	this.cilinder2Top.display();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,-1)
	this.cilinder2Top.display();
    this.scene.popMatrix();

    //base helice lado esquerdo
    this.scene.pushMatrix();
	this.scene.translate(this.stacks/2,0.5,0);
	this.scene.scale(0.25,0.75,0.25);
	this.scene.rotate(90*degToRad,1,0,0);
	this.cilinder2.display();
	this.cilinder2Top.display();
	this.scene.rotate(180*degToRad,0,1,0);
	this.scene.translate(0,0,-1)
	this.cilinder2Top.display();
    this.scene.popMatrix();


	//braço 2
	this.scene.pushMatrix();
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.scale(0.25,0.25,1);
	this.scene.translate(0,0,-this.stacks/2);
    this.cilinder1.display();
    this.scene.popMatrix();




    //meia esfera
	this.scene.pushMatrix();
	this.scene.scale(0.25,0.25,0.25)
	this.sphere.display();
	this.scene.popMatrix();

	//pernas
	this.scene.pushMatrix();
	this.scene.translate(0, -0.8, 0.4);
	this.scene.scale(0.7,0.7,0.15);
	this.halfc.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(0, -0.8, -0.4-0.15);
	this.scene.scale(0.7,0.7,0.15);
	this.halfc.display();
	this.scene.popMatrix();
	
	//pés
	this.scene.pushMatrix();
	this.scene.translate(0.7, -0.8, 0);
	this.scene.scale(0.2,0.1,1.5);
	this.cube.display();
	this.scene.popMatrix();
	
	this.scene.pushMatrix();
	this.scene.translate(-0.7, -0.8, 0);
	this.scene.scale(0.2,0.1,1.5);
	this.cube.display();
	this.scene.popMatrix();

	//helices

	//frente

	
	//this.helixAppearance.apply();
    this.scene.pushMatrix();
    this.scene.translate(0, 0, this.stacks/2);
   	this.scene.rotate(this.blade1.angle, 0, 1, 0);
    this.blade1.display();
    this.scene.popMatrix();
	


	//tras
	
	this.scene.pushMatrix();
    this.scene.translate(0, 0, -this.stacks/2);
   	this.scene.rotate(this.blade2.angle, 0, 1, 0);
    this.blade2.display();
    this.scene.popMatrix();
	

	//lado esquerdo
	this.scene.pushMatrix();
    this.scene.translate(this.stacks/2, 0, 0);
   	this.scene.rotate(this.blade3.angle, 0, 1, 0);
    this.blade3.display();
    this.scene.popMatrix();
	

	//lado direito
	this.scene.pushMatrix();
    this.scene.translate(-this.stacks/2, 0, 0);
   	this.scene.rotate(this.blade4.angle, 0, 1, 0);
    this.blade4.display();
    this.scene.popMatrix();

	

	/*this.scene.pushMatrix();
	this.scene.translate(3,0,0);
	this.curve.display();
	this.scene.popMatrix();*/




	
    
	/*this.vertices = [
            0.5, 0.3, 0,
            -0.5, 0.3, 0,
            0, 0.3, 2
			];

	this.indices = [
            0, 1, 2
        ];
		
	this.normals = [
	0,1,0,
	0,1,0,
	0,1,0              
];
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();*/
};


MyDrone.prototype.update = function(currTime)
{

	//rodar as helices
	this.blade1.incAngle(this.bladeIncrement1);
	this.blade2.incAngle(this.bladeIncrement2);
	this.blade3.incAngle(this.bladeIncrement3);
	this.blade4.incAngle(this.bladeIncrement4);

	//verificar teclas premidas
		//repor inclinacao do drone depois de andar para frente ou tras
	if(this.keyW == false && this.keyS == false)
	{
		if(this.tilt < 0)
		{
			this.tilt += this.incTilt;
		}
		else if(this.tilt > 0)
		{
			this.tilt -= this.incTilt;
		}
		else
		 this.tilt = 0;
	}
		//repor velocidade das helices
	if(!this.keyA && !this.keyD)
	{
		this.bladeSpeed1 = this.speedN;
		this.bladeSpeed2 = this.speedN;
		this.bladeSpeed3 = this.speedN;
		this.bladeSpeed4 = this.speedN;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;
	}

	
	

	if(this.keyW == true)
	{


		this.x+=Math.sin(this.yRot)*0.1;
		this.z+=Math.cos(this.yRot)*0.1;

		if(this.tilt <= 25*degToRad)
		{
			this.tilt += this.incTilt;
		}
		
		//velocidade das helices quando o drone anda para a frente
		this.bladeSpeed1 = this.speedL;
		this.bladeSpeed2 = this.speedR;
		this.bladeSpeed3 = this.speedN;
		this.bladeSpeed4 = this.speedN;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;
	}


	if(this.keyS)
	{
		
		this.x-=Math.sin(this.yRot)*0.1;
		this.z-=Math.cos(this.yRot)*0.1;

		if(this.tilt > -25*degToRad)
		{
			this.tilt -= this.incTilt;
		}
		//velocidade das helices quando o drone anda para tras
		this.bladeSpeed1 = this.speedR;
		this.bladeSpeed2 = this.speedL;
		this.bladeSpeed3 = this.speedN;
		this.bladeSpeed4 = this.speedN;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;
	}




	if(this.keyA)
	{
		this.yRot+=this.scene.speed*degToRad;

		this.bladeSpeed1 = this.speedL;
		this.bladeSpeed2 = this.speedL;
		this.bladeSpeed3 = this.speedR;
		this.bladeSpeed4 = this.speedR;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;

	}






	if(this.keyD)
	{
		this.yRot-=this.scene.speed*degToRad;

		this.bladeSpeed1 = this.speedL;
		this.bladeSpeed2 = this.speedL;
		this.bladeSpeed3 = this.speedR;
		this.bladeSpeed4 = this.speedR;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;
	}
	
	
	//subir

	if(this.keyI)
	{
		this.y+=0.1;
		
		this.bladeSpeed1 = this.speedR;
		this.bladeSpeed2 = this.speedR;
		this.bladeSpeed3 = this.speedR;
		this.bladeSpeed4 = this.speedR;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;

	}

	//descer
	if(this.keyJ)
	{
		this.y-=this.scene.speed/14;

		this.bladeSpeed1 = this.speedL;
		this.bladeSpeed2 = this.speedL;
		this.bladeSpeed3 = this.speedL;
		this.bladeSpeed4 = this.speedL;

		this.bladeIncrement1 = this.bladeSpeed1*this.bladeRot1*this.scene.scale_rotors;
		this.bladeIncrement2 = this.bladeSpeed2*this.bladeRot2*this.scene.scale_rotors;
		this.bladeIncrement3 = this.bladeSpeed3*this.bladeRot3*this.scene.scale_rotors;
		this.bladeIncrement4 = this.bladeSpeed4*this.bladeRot4*this.scene.scale_rotors;
	}
	
		if(this.keyP)
	{
		this.TranslateHook(-this.hookinc);

	}

		if(this.keyL)
	{
		this.TranslateHook(this.hookinc);
	}

    this.hookx = this.x;
	this.hooky = this.y-6*this.hook.height;
	this.hookz = this.z;
};

MyDrone.prototype.TranslateHook = function(inc)
{		
	this.hook.height += inc;

	if(this.hook.height < 1)
		this.hook.height = 1;
	
};

MyDrone.prototype.keyWr = function(){

	this.keyW = false;

}

