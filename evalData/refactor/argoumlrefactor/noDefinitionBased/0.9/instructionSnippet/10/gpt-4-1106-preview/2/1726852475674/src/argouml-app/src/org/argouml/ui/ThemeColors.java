package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primaryColor1;
    private final ColorUIResource primaryColor2;
    private final ColorUIResource primaryColor3;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
        this.primaryColor1 = new ColorUIResource(r1, g1, b1);
        this.primaryColor2 = new ColorUIResource(r2, g2, b2);
        this.primaryColor3 = new ColorUIResource(r3, g3, b3);
    }

    public ColorUIResource getPrimary1() {
        return primaryColor1;
    }

    public ColorUIResource getPrimary2() {
        return primaryColor2;
    }

    public ColorUIResource getPrimary3() {
        return primaryColor3;
    }
}