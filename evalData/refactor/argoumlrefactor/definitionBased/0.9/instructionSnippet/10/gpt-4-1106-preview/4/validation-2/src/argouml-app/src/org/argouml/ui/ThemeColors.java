package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1, color2, color3;

    public ThemeColors(int red, int green, int blue) {
        color1 = new ColorUIResource(red, green, blue);
        color2 = new ColorUIResource(red + 51, green + 51, blue + 51);
        color3 = new ColorUIResource(red + 102, green + 102, blue + 102);
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
