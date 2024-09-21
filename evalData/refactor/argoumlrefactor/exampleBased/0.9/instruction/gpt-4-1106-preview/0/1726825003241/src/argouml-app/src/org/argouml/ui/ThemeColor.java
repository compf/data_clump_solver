package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    public ThemeColor(int c1r, int c1g, int c1b, int c2r, int c2g, int c2b, int c3r, int c3g, int c3b) {
        color1 = new ColorUIResource(c1r, c1g, c1b);
        color2 = new ColorUIResource(c2r, c2g, c2b);
        color3 = new ColorUIResource(c3r, c3g, c3b);
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