function Cube(glContext, shaderMgr) {
	Geometry.call(this, glContext, shaderMgr);
	
//Build the vertices
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin back side
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.BLUE);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.GREEN);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.BLUE);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.WHITE);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.GREEN); //End back side
	
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin left side
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.YELLOW);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.BLUE);
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.CYAN);
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.YELLOW); //End left side
	
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.YELLOW); //Begin front side
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.CYAN);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.MAGENTA);
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.YELLOW);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.MAGENTA);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.BLACK); //End front side
	
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.BLACK); //Begin right side
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.MAGENTA);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.GREEN);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.BLACK);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.GREEN);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.WHITE); //End right side
	
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED); //Begin bottom side
	this.addVertex(-0.5, -0.5,  0.5, Geometry.colors.CYAN);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.MAGENTA);
	this.addVertex(-0.5, -0.5, -0.5, Geometry.colors.RED);
	this.addVertex( 0.5, -0.5,  0.5, Geometry.colors.MAGENTA);
	this.addVertex( 0.5, -0.5, -0.5, Geometry.colors.GREEN); //End bottom side
	
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.BLUE); //Begin top side
	this.addVertex(-0.5,  0.5,  0.5, Geometry.colors.YELLOW);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.BLACK);
	this.addVertex(-0.5,  0.5, -0.5, Geometry.colors.BLUE);
	this.addVertex( 0.5,  0.5,  0.5, Geometry.colors.BLACK);
	this.addVertex( 0.5,  0.5, -0.5, Geometry.colors.WHITE); //End top side
	
//Add the vertices to the buffer
	this.commit('a_Triangle', 'a_Color');
}

extend(Geometry, Cube);