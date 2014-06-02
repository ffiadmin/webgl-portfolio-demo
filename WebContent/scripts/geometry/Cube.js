function Cube(glContext, shaderMgr) {
	Geometry.call(this, glContext, shaderMgr);
	
//Build the vertices
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin back side
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.RED); //End back side
	
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin left side
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.RED);
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.RED); //End left side
	
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.RED); //Begin front side
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.RED); //End front side
	
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.RED); //Begin right side
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.RED); //End right side
	
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin bottom side
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.RED); //End bottom side
	
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.RED); //Begin top side
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.RED);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.RED); //End top side
	
//Add the vertices to the buffer
	this.commit('a_Triangle', 'a_Color');
}

Cube.prototype = new Geometry();
Cube.prototype.constructor = Geometry;