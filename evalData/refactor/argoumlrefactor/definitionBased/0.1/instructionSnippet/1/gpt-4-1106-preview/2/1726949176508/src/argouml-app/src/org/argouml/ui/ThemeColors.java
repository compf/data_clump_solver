package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int r, int g, int b) {
        this.primary1 = new ColorUIResource(r, r, b);
        this.primary2 = new ColorUIResource(g, g, b);
        this.primary3 = new ColorUIResource(b, b, b);
    }

    // Getters for the colors
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}