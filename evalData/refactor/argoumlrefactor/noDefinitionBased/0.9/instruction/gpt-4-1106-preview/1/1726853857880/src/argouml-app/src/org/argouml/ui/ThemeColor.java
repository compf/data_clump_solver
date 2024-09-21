package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColor(int colorBase, int colorMedium, int colorLight) {
        this.color1 = new ColorUIResource(colorBase, colorBase, colorBase + 51);
        this.color2 = new ColorUIResource(colorMedium, colorMedium, colorMedium + 51);
        this.color3 = new ColorUIResource(colorLight, colorLight, colorLight + 51);
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