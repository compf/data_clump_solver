package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
    }

    // Getters for the colors
}