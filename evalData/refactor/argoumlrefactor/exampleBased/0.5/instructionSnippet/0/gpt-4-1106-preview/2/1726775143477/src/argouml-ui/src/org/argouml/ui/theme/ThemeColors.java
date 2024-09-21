package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        this.primary1 = new ColorUIResource(p1r, p1g, p1b);
        this.primary2 = new ColorUIResource(p2r, p2g, p2b);
        this.primary3 = new ColorUIResource(p3r, p3g, p3b);
        this.secondary1 = new ColorUIResource(p1r, p1g, p1b);
        this.secondary2 = new ColorUIResource(p2r, p2g, p2b);
        this.secondary3 = new ColorUIResource(p3r, p3g, p3b);
    }

    // Getters for the colors
    // ...
}