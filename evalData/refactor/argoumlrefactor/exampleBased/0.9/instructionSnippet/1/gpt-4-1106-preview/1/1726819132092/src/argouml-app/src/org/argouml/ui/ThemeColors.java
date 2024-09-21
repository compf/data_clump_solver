package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int shade, int mid, int light) {
        this.color1 = new ColorUIResource(shade, shade, mid);
        this.color2 = new ColorUIResource(mid, mid, light);
        this.color3 = new ColorUIResource(light, light, light);
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
