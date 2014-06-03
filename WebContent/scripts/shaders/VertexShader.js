function VertexShader() {
	Shader.call(this);
	
	this.code = 
	'attribute vec4 a_Color;\n' + 
	'attribute vec4 a_Triangle;\n' +
	'uniform   mat4 u_Transform;\n' + 
	'uniform   mat4 u_ModelMatrix;\n' + 
	'uniform   mat4 u_ProjMatrix;\n' + 
	'uniform   mat4 u_ViewMatrix;\n' + 
	'varying   vec4 v_Color;\n' + 
	'\n' +  
	'void main() {\n' +  
	'	gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Triangle;\n' +
	'	gl_PointSize = 1.0;\n' + 
	'	v_Color = a_Color;\n' + 
	'}';
}

VertexShader.prototype = new Shader();
VertexShader.prototype.constructor = Shader;