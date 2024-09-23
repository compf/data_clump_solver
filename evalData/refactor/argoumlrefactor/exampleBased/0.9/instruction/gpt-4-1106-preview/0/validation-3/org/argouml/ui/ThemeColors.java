package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    ThemeColors(int baseColorValue) {
        color1 = new ColorUIResource(baseColorValue, baseColorValue, baseColorValue + 51);
        color2 = new ColorUIResource(baseColorValue + 51, baseColorValue + 51, baseColorValue + 102);
        color3 = new ColorUIResource(baseColorValue + 102, baseColorValue + 102, baseColorValue + 153);
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