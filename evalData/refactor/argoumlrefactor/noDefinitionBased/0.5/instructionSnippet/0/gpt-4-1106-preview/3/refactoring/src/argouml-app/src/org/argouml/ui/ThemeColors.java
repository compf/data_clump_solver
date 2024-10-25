package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
        this.color1 = new ColorUIResource(r1, g1, b1);
        this.color2 = new ColorUIResource(r2, g2, b2);
        this.color3 = new ColorUIResource(r3, g3, b3);
    }

    // Getters for color resources
    public ColorUIResource getColor1() {
        return color1;
    }

    public ColorUIResource getColor2() {
        return color2;
    }

    public ColorUIResource getColor3() {
        return color3;
    }
}