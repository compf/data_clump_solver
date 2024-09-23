package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColorSet {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColorSet(int shade) {
        primary1 = new ColorUIResource(shade, shade, shade + 51);
        primary2 = new ColorUIResource(shade + 51, shade + 51, shade + 102);
        primary3 = new ColorUIResource(shade + 102, shade + 102, shade + 153);
        secondary1 = new ColorUIResource(shade, shade, shade);
        secondary2 = new ColorUIResource(shade + 51, shade + 51, shade + 51);
        secondary3 = new ColorUIResource(shade + 102, shade + 102, shade + 102);
    }

    // Additional functionality can be added here, such as methods to adjust colors, etc.
}