package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primaryColor;
    private final ColorUIResource secondaryColor;
    private final ColorUIResource tertiaryColor;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
        this.primaryColor = new ColorUIResource(r1, g1, b1);
        this.secondaryColor = new ColorUIResource(r2, g2, b2);
        this.tertiaryColor = new ColorUIResource(r3, g3, b3);
    }

    public ColorUIResource getPrimaryColor() {
        return primaryColor;
    }

    public ColorUIResource getSecondaryColor() {
        return secondaryColor;
    }

    public ColorUIResource getTertiaryColor() {
        return tertiaryColor;
    }
}