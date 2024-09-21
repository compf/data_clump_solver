package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1, primary2, primary3;
    private ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int s1r, int s1g, int s1b) {
        primary1 = new ColorUIResource(p1r, p1g, p1b);
        primary2 = new ColorUIResource(p1r + 51, p1g + 51, p1b + 51);
        primary3 = new ColorUIResource(p1r + 102, p1g + 102, p1b + 102);

        secondary1 = new ColorUIResource(s1r, s1g, s1b);
        secondary2 = new ColorUIResource(s1r + 51, s1g + 51, s1b + 51);
        secondary3 = new ColorUIResource(s1r + 102, s1g + 102, s1b + 102);
    }

    // Getters and other methods for accessing colors
}