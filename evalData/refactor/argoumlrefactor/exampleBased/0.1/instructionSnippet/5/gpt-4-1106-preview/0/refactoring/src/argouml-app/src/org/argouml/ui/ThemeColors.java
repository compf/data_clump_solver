package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int color1, int color2, int color3) {
        this.primary1 = new ColorUIResource(color1, color1, color1 + 51);
        this.primary2 = new ColorUIResource(color2, color2, color2 + 51);
        this.primary3 = new ColorUIResource(color3, color3, color3 + 51);
    }

    // Getters for the colors
}
