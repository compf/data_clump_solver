package org.argouml.sequence2.diagram;

import java.awt.Rectangle;

public class ActivationDimensions {
	private final Object owner;
	private final int x, y, width, height;

	public ActivationDimensions(Object owner, int x, int y, int width, int height) {
		this.owner = owner;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public Rectangle toRectangle() {
		return new Rectangle(x, y, width, height);
	}

	public Object getOwner() {
		return owner;
	}
	
	// possibly other methods here
}
