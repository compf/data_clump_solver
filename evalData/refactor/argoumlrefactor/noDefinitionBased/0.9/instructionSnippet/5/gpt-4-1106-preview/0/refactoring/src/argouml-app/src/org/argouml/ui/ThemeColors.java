package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary;
    private ColorUIResource secondary;
    private ColorUIResource tertiary;

    public ThemeColors(int r, int g, int b) {
        this.primary = new ColorUIResource(r, g, b);
        this.secondary = new ColorUIResource(r + 51, g + 51, b + 51);
        this.tertiary = new ColorUIResource(r + 102, g + 102, b + 102);
    }
    // Methods for primary, secondary, tertiary colors
}
