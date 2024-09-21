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
        primary1 = new ColorUIResource(primary, primary, tertiary);
        primary2 = new ColorUIResource(primary + 51, primary + 51, tertiary + 51);
        primary3 = new ColorUIResource(primary + 102, primary + 102, tertiary + 102);
        secondary1 = new ColorUIResource(secondary, secondary, secondary);
        secondary2 = new ColorUIResource(secondary + 51, secondary + 51, secondary + 51);
        secondary3 = new ColorUIResource(secondary + 102, secondary + 102, secondary + 102);
    }

    // Getters for primary and secondary colors
    // ...
}
