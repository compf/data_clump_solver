package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3, int alpha) {
        this.color1 = new ColorUIResource(colorValue1, colorValue1, alpha);
        this.color2 = new ColorUIResource(colorValue2, colorValue2, alpha);
        this.color3 = new ColorUIResource(colorValue3, colorValue3, alpha);
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