package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int p1Red, int p1Green, int p1Blue,
                       int p2Red, int p2Green, int p2Blue,
                       int p3Red, int p3Green, int p3Blue) {
        primary1 = new ColorUIResource(p1Red, p1Green, p1Blue);
        primary2 = new ColorUIResource(p2Red, p2Green, p2Blue);
        primary3 = new ColorUIResource(p3Red, p3Green, p3Blue);
    }

    // Getters and potentially other methods...
}
