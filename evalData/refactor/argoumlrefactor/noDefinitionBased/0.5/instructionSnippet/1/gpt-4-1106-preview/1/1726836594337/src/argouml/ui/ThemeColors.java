package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        color1 = new ColorUIResource(shade1, shade1, shade1 + 50);
        color2 = new ColorUIResource(shade2, shade2, shade2 + 50);
        color3 = new ColorUIResource(shade3, shade3, shade3 + 50);
    }

    // Additional functionality such as getters or methods for color manipulation can be added here
}