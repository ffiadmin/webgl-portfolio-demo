function FragmentShader() {
	Shader.call(this);
	
	this.code = 
	'void main() {\n' +  
	'	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + 
	'}';
}

FragmentShader.prototype = new Shader();
FragmentShader.prototype.constructor = Shader;