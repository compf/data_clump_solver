package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary;
    private final ColorUIResource secondary;
    private final ColorUIResource tertiary;

    public ThemeColors(int r, int g, int b) {
        primary = new ColorUIResource(r, g, b);
        secondary = new ColorUIResource(r + 50, g + 50, b + 50);
        tertiary = new ColorUIResource(r + 100, g + 100, b + 100);
    }

    // Add getters and potentially other methods here.

}
