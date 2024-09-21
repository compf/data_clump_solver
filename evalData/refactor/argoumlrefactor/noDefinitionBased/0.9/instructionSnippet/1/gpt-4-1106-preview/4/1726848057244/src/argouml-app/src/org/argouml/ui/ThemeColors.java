package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int r, int g, int b) {
        this.color1 = new ColorUIResource(r, r, b);
        this.color2 = new ColorUIResource(r + 51, g + 51, b + 51);
        this.color3 = new ColorUIResource(r + 102, g + 102, b + 102);
    }

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
