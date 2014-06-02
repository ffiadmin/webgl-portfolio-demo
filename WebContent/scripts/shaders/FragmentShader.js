function FragmentShader() {
	Shader.call(this);
	
	this.code =
	'#ifdef GL_ES\n' + 
	'precision mediump float;\n' + 
	'#endif\n' + 
	'\n' + 
	'varying vec4 v_Color;\n' + 
	'\n' + 
	'void main() {\n' +  
	'	gl_FragColor = v_Color;\n' + 
	'}';
}

FragmentShader.prototype = new Shader();
FragmentShader.prototype.constructor = Shader;