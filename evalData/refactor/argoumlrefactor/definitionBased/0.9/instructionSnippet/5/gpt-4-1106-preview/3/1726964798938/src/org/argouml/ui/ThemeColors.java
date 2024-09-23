package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int p1, int p2, int p3) {
        primary1 = new ColorUIResource(p1, p1, p1 + 51);
        primary2 = new ColorUIResource(p1 + 51, p1 + 51, p2);
        primary3 = new ColorUIResource(p2, p2, p3);
        secondary1 = new ColorUIResource(p1, p1, p1);
        secondary2 = new ColorUIResource(p1 + 51, p1 + 51, p1 + 51);
        secondary3 = new ColorUIResource(p2, p2, p2);
    }
    // Getters and other methods can go here
}