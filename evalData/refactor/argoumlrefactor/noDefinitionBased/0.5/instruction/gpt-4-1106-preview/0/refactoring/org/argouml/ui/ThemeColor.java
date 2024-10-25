package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColor(int c1, int c2, int c3) {
        color1 = new ColorUIResource(c1, c1, c1 + 51);
        color2 = new ColorUIResource(c2, c2, c2 + 51);
        color3 = new ColorUIResource(c3, c3, c3 + 51);
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