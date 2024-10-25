package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        this.primary1 = new ColorUIResource(shade1, shade1, shade1);
        this.primary2 = new ColorUIResource(shade2, shade2, shade2);
        this.primary3 = new ColorUIResource(shade3, shade3, shade3);
    }

    // getters and other functionality
}
