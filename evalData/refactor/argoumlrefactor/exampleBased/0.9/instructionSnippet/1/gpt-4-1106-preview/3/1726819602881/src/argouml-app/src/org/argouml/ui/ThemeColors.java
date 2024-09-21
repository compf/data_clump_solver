package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int r, int g, int b, boolean primary) {
        int factor = primary ? 51 : 102;
        color1 = new ColorUIResource(r, g, b);
        color2 = new ColorUIResource(r + factor, g + factor, b + factor);
        color3 = new ColorUIResource(r + 2 * factor, g + 2 * factor, b + 2 * factor);
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
