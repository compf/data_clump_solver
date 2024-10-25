package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int r1, int g1, int b1, int r2, int g2, int b2, int r3, int g3, int b3) {
        primary1 = new ColorUIResource(r1, g1, b1);
        primary2 = new ColorUIResource(r2, g2, b2);
        primary3 = new ColorUIResource(r3, g3, b3);
        secondary1 = new ColorUIResource(r1, g1, b1);
        secondary2 = new ColorUIResource(r2, g2, b2);
        secondary3 = new ColorUIResource(r3, g3, b3);
    }

    // Getters for the colors
}
