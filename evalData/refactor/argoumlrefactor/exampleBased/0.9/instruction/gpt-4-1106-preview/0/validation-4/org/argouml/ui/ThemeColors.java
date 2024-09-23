package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    ThemeColors(int colorValue) {
        color1 = new ColorUIResource(colorValue, colorValue, colorValue + 51);
        color2 = new ColorUIResource(colorValue + 51, colorValue + 51, colorValue + 102);
        color3 = new ColorUIResource(colorValue + 102, colorValue + 102, colorValue + 153);
    }

    ColorUIResource getColor1() {
        return color1;
    }

    ColorUIResource getColor2() {
        return color2;
    }

    ColorUIResource getColor3() {
        return color3;
    }
}