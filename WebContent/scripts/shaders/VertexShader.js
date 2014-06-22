function VertexShader() {
	Shader.call(this);
	
	this.code = 
	'attribute vec4 a_Color;\n' + 
	'attribute vec3 a_Light;\n' +
	'attribute vec3 a_Normal;\n' + 
	'attribute vec4 a_Triangle;\n' +
	'uniform   vec3 u_LightPos;\n' + 
	'uniform   mat4 u_ModelMatrix;\n' + 
	'uniform   mat4 u_ProjMatrix;\n' + 
	'uniform   mat4 u_Transform;\n' + 
	'uniform   mat4 u_ViewMatrix;\n' + 
	'varying   vec4 v_Color;\n' + 
	'varying   vec4 v_Light;\n' + 
	'varying   vec4 v_Normal;\n' + 
	'\n' +  
	'void main() {\n' + 
	'	v_Color = a_Color;\n' + 
	//'	v_Normal = normalize((u_ModelMatrix * a_Normal).xyz);\n' + 
	//'	v_Light = normalize((u_LightPos - u_ModelMatrix).xyz);\n' + 
	'\n' +  
	'	gl_Position = u_ProjMatrix * u_ViewMatrix * u_ModelMatrix * a_Triangle;\n' +
	'	gl_PointSize = 1.0;\n' + 
	'}';
}

VertexShader.prototype = new Shader();
VertexShader.prototype.constructor = Shader;