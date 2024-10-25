package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int intensity, int base) {
        this.primary1 = new ColorUIResource(base, base, intensity);
        this.primary2 = new ColorUIResource(base + 51, base + 51, intensity + 51);
        this.primary3 = new ColorUIResource(base + 102, base + 102, intensity + 102);
    }

    // Getters
}