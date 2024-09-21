package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primary, int secondary, int tertiary) {
        this.primary1 = new ColorUIResource(primary, primary, tertiary);
        this.primary2 = new ColorUIResource(primary + 51, primary + 51, tertiary + 51);
        this.primary3 = new ColorUIResource(primary + 102, primary + 102, tertiary + 102);
        this.secondary1 = new ColorUIResource(primary, primary, primary);
        this.secondary2 = new ColorUIResource(primary + 51, primary + 51, primary + 51);
        this.secondary3 = new ColorUIResource(primary + 102, primary + 102, primary + 102);
    }

    // Getters for all colors
}