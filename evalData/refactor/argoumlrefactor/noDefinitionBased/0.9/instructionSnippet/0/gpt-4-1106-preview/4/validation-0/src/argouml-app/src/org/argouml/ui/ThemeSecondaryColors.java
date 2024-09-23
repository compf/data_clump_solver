package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeSecondaryColors {
	private final ColorUIResource secondary1;
	private final ColorUIResource secondary2;
	private final ColorUIResource secondary3;

	public ThemeSecondaryColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
		secondary1 = new ColorUIResource(r1, g1, b1);
		secondary2 = new ColorUIResource(r2, g2, b2);
		secondary3 = new ColorUIResource(r3, g3, b3);
	}

	// Constructor and methods similar to ThemePrimaryColors
}