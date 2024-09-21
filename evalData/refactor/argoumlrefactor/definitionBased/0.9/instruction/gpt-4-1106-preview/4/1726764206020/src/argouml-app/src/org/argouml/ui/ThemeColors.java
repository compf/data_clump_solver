package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

/**
 * A class to represent theme colors.
 */
public class ThemeColors {

    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int intensity1, int intensity2, int intensity3) {
        color1 = new ColorUIResource(intensity1, intensity1, intensity1 + 51);
        color2 = new ColorUIResource(intensity2, intensity2, intensity2 + 51);
        color3 = new ColorUIResource(intensity3, intensity3, intensity3 + 51);
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
