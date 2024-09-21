package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int r, int g, int b) {
        color1 = new ColorUIResource(r, r, b);
        color2 = new ColorUIResource(g, g, b);
        color3 = new ColorUIResource(b, b, b);
    }

    // Additional methods to manipulate colors can be added here
}