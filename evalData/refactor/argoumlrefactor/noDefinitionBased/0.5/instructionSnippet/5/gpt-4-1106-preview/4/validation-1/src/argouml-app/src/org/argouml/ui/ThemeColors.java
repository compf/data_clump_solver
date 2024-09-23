package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    public final ColorUIResource primary1;
    public final ColorUIResource primary2;
    public final ColorUIResource primary3;
    public final ColorUIResource secondary1;
    public final ColorUIResource secondary2;
    public final ColorUIResource secondary3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
        secondary1 = new ColorUIResource(shade1, shade1, shade1);
        secondary2 = new ColorUIResource(shade2, shade2, shade2);
        secondary3 = new ColorUIResource(shade3, shade3, shade3);
    }

    // Additional functionality and getters can be added here
}