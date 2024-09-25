package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        primary1 = new ColorUIResource(shade1, shade1, shade3);
        primary2 = new ColorUIResource(shade2, shade2, shade3);
        primary3 = new ColorUIResource(shade3, shade3, shade3);
        secondary1 = new ColorUIResource(shade1, shade1, shade1);
        secondary2 = new ColorUIResource(shade2, shade2, shade2);
        secondary3 = new ColorUIResource(shade3, shade3, shade3);
    }

    // Getters for the color resources can be added here
}