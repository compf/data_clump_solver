package org.argouml.activity2.diagram;

import org.tigris.gef.presentation.Fig;

public class Bounds {
	private final int x, y, width, height;

	public Bounds(int x, int y, int width, int height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	public void applyTo(Fig fig) {
		fig.setBounds(x, y, width, height);
	}
	
	// getters and possibly other methods here
}
