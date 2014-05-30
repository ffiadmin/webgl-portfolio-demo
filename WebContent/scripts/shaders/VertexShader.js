function VertexShader() {
	Shader.call(this);
	
	this.code = 
	'void main() {\n' +  
	'	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
	'	gl_PointSize = 10.0;\n' + 
	'}';
}

VertexShader.prototype = new Shader();
VertexShader.prototype.constructor = Shader;