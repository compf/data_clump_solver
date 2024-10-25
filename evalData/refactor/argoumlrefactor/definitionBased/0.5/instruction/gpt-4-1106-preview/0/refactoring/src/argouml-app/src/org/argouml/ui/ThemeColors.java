package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int colorBase1, int colorBase2, int colorBase3) {
        color1 = new ColorUIResource(colorBase1, colorBase1, colorBase1 + 51);
        color2 = new ColorUIResource(colorBase2, colorBase2, colorBase2 + 51);
        color3 = new ColorUIResource(colorBase3, colorBase3, colorBase3 + 51);
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