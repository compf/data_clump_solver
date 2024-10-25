package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int p1R, int p1G, int p1B, int p2R, int p2G, int p2B, int p3R, int p3G, int p3B) {
        this.primary1 = new ColorUIResource(p1R, p1G, p1B);
        this.primary2 = new ColorUIResource(p2R, p2G, p2B);
        this.primary3 = new ColorUIResource(p3R, p3G, p3B);
        this.secondary1 = new ColorUIResource(p1R, p1G, p1B);
        this.secondary2 = new ColorUIResource(p2R, p2G, p2B);
        this.secondary3 = new ColorUIResource(p3R, p3G, p3B);
    }

    // Add getters for the colors here
}