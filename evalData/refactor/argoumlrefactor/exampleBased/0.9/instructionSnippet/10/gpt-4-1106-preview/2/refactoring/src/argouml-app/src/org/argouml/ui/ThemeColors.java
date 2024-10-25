package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
        this.color1 = new ColorUIResource(r1, g1, b1);
        this.color2 = new ColorUIResource(r2, g2, b2);
        this.color3 = new ColorUIResource(r3, g3, b3);
    }

    // getters and other methods
}