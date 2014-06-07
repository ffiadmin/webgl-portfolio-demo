function Camera(glContext, shaderMgr) {
	this.gl = glContext;
	this.shader = shaderMgr;
	
//Listen for keyboard input
	var camClass = this;
	
	document.addEventListener('keydown', function(e) {
		camClass.update(e.keyCode);
	});
}

Camera.inputCodes = {
	MOVE_BACKWARD : 83, // S
	MOVE_FORWARD  : 87, // W
	MOVE_LEFT     : 65, // A
	MOVE_RIGHT    : 68, // D
	
	PITCH_DOWN    : 40, // Down arrow
	PITCH_UP      : 38, // Up arrow
	
	YAW_LEFT      : 37, // Left arrow
	YAW_RIGHT     : 39  // Right arrow
};

Camera.speed = 5.0;

Camera.prototype.moveBF = 0.0;
Camera.prototype.moveLR = 0.0;
Camera.prototype.pitch = 0.0;
Camera.prototype.pitchRate = 0.0;
Camera.prototype.rotation = new Matrix4();
Camera.prototype.speed = 10.0;
Camera.prototype.yaw = 0.0;
Camera.prototype.yawRate = 0.0;

Camera.prototype.xPos = 0.0;
Camera.prototype.zPos = 0.0;

Camera.prototype.placeCamera = function(x, y, z) {
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(90, 1000 / 800, 0.1, 500);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	viewMatrix.setLookAt(5.0, 5.0, 5.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};

//Thank you: learningwebgl.com/lessons/lesson10/index.html
Camera.prototype.update = function(keyCode) {
	var u_ProjMatrix = this.shader.getUniform('u_ProjMatrix');
	var u_ViewMatrix = this.shader.getUniform('u_ViewMatrix');
	
//Camera movement input, forward and backward
	var moveBF = 0.0;
	
	if (keyCode == Camera.inputCodes.MOVE_FORWARD) {
		moveBF = -Camera.speed;
	} else if (keyCode == Camera.inputCodes.MOVE_BACKWARD) {
		moveBF = Camera.speed;
	}
	
//Camera movement input, left and right
	var moveLR = 0.0;
	
	if (keyCode == Camera.inputCodes.MOVE_LEFT) {
		moveLR = -Camera.speed;
	} else if (keyCode == Camera.inputCodes.MOVE_RIGHT) {
		moveLR = Camera.speed;
	}
	
//Camera pitch
	var pitchDelta = 0.0;
	
	if (keyCode == Camera.inputCodes.PITCH_UP) {
		pitchDelta = -Camera.speed;
	} else if (keyCode == Camera.inputCodes.PITCH_DOWN) {
		pitchDelta = Camera.speed;
	}
	
//Set the pitch and yaw (and constrain the pitch)
	if (Math.abs(this.pitch + pitchDelta) < 20) this.pitch += pitchDelta;
    this.yaw += moveLR;
	
//Set the X and Z position of the camera based on the forward/backward and yaw
	this.xPos -= Math.cos((this.yaw + 90) * (Math.PI / 180.0)) * moveBF;
    this.zPos -= Math.sin((this.yaw + 90) * (Math.PI / 180.0)) * moveBF;
	
//Create the projection matrix (for the frustrum clipping volume)
	var projectionMatrix = new Matrix4();
	projectionMatrix.setPerspective(45, 1000 / 800, 0.1, 500);
	
//Create the view matrix (for setting camera position)
	var viewMatrix = new Matrix4();
	viewMatrix.rotate(this.pitch, 1, 0, 0);
	viewMatrix.rotate(this.yaw, 0, 1, 0);
	viewMatrix.translate(this.xPos, -7, this.zPos);
	
//Give the view matrix to the shader
	this.gl.uniformMatrix4fv(u_ProjMatrix, false, projectionMatrix.elements);
	this.gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements);
};