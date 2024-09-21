package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        color1 = new ColorUIResource(shade1, shade1, shade3);
        color2 = new ColorUIResource(shade2, shade2, shade3);
        color3 = new ColorUIResource(shade3, shade3, shade3);
    }

    // Accessor methods here
}
