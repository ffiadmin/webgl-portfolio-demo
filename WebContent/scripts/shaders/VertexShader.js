function VertexShader() {
	Shader.call(this);
	
	this.code = 
	'attribute float a_Size;' + 
	'\n' +  
	'void main() {\n' +  
	'	gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' +
	'	gl_PointSize = a_Size;\n' + 
	'}';
}

VertexShader.prototype = new Shader();
VertexShader.prototype.constructor = Shader;