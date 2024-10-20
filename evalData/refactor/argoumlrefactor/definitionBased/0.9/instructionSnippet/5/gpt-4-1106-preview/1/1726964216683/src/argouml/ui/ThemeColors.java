package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int p1, int p2, int p3, int s1, int s2, int s3, int s4, int s5, int s6) {
        primary1 = new ColorUIResource(p1, p1, p3);
        primary2 = new ColorUIResource(p2, p2, p3);
        primary3 = new ColorUIResource(p3, p3, p3);
        secondary1 = new ColorUIResource(s1, s1, s3);
        secondary2 = new ColorUIResource(s2, s2, s4);
        secondary3 = new ColorUIResource(s3, s3, s6);
    }

    // Getters and potentially other methods can be added here
}