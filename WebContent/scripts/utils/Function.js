// Thank you: http://js-bits.blogspot.com/2010/08/javascript-inheritance-done-right.html
function extend(parent, child) {
	child.prototype.constructor = child;
	child.parent = parent.prototype;
	
	for(var name in parent.prototype) {
		child.prototype[name] = parent.prototype[name];
	}
}