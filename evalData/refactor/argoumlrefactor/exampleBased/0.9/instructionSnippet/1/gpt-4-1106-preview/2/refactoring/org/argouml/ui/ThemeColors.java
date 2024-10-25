package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int value1, int value2, int value3) {
        this.color1 = new ColorUIResource(value1, value1, value3);
        this.color2 = new ColorUIResource(value2, value2, value2);
        this.color3 = new ColorUIResource(value3, value3, value3);
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
