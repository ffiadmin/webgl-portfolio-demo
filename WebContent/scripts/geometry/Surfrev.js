function Surfrev(glContext, shaderMgr) {
	Geometry.call(this, glContext, shaderMgr);
}

Surfrev.prototype.addPolyline = function(polyline, slices) {
//There should be at least 3 slices
	if (slices < 3) {
		throw new Fatal("There must be at least three slices in a surface revolution", "Surfrev.js");
	}
	
	var degrees = 360.0 / slices;
	var points = polyline.length;
	var rotNow, rotNext, rotNNext, rotNNNext;
	
	for(var i = 0; i <= slices; ++i) {
		for(var j = 0; j < points - 1; ++j) {
		//If any the vertices touch the Y-axis, only build a triangle
			if (polyline[j][1] == 0 || polyline[j + 1][1] == 0) {
				rotNow = this.rotateY(polyline[j], degrees * i);
				rotNext = this.rotateY(polyline[j + 1], degrees * (i + 1));
				rotNNext = this.rotateY(polyline[j + 1], degrees * i);
				
				this.addVertex(rotNow[0], rotNow[1], rotNow[2], Geometry.colors.RED);
				this.addVertex(rotNext[0], rotNext[1], rotNext[2], Geometry.colors.GREEN);
				this.addVertex(rotNNext[0], rotNNext[1], rotNNext[2], Geometry.colors.BLUE);
		//If no vertices touch the Y-axis, draw a quad
			} else {
				rotNow = this.rotateY(polyline[j], degrees * i);
				rotNext = this.rotateY(polyline[j], degrees * (i + 1));
				rotNNext = this.rotateY(polyline[j + 1], degrees * i);
				rotNNNext = this.rotateY(polyline[j + 1], degrees * (i + 1));
				
			//Triangle one
				this.addVertex(rotNow[0], rotNow[1], rotNow[2], Geometry.colors.RED);
				this.addVertex(rotNext[0], rotNext[1], rotNext[2], Geometry.colors.GREEN);
				this.addVertex(rotNNext[0], rotNNext[1], rotNNext[2], Geometry.colors.BLUE);
				
			//Triangle two
				this.addVertex(rotNNext[0], rotNNext[1], rotNNext[2], Geometry.colors.RED);
				this.addVertex(rotNext[0], rotNext[1], rotNext[2], Geometry.colors.GREEN);
				this.addVertex(rotNNNext[0], rotNNNext[1], rotNNNext[2], Geometry.colors.BLUE);
			}
		}
	}
	
	
	
//Add the vertices to the buffer
	this.commit('a_Triangle', 'a_Color');
};

Surfrev.prototype.rotateY = function(point, degrees) {
//The vector must be have three components
	if (point.length != 3) {
		throw new Fatal("The point must have an x, y, and z component", "Surfrev.js");
	}
	
//Calculate the new rotated point
	var radians = degrees * (180.0 / Math.PI);
	
	return [ point[0] * Math.cos(radians) + point[2] * Math.sin(radians),
	         point[1],
	         -point[0] * Math.sin(radians) + point[2] * Math.cos(radians) ];
};

extend(Geometry, Surfrev);