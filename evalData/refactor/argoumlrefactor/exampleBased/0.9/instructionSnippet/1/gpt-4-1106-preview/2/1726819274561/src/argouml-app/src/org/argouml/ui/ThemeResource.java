package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeResource {
    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeResource(int primaryMid, int secondaryMid) {
        primary1 = new ColorUIResource(primaryMid - 51, primaryMid - 51, primaryMid);
        primary2 = new ColorUIResource(primaryMid, primaryMid, primaryMid + 51);
        primary3 = new ColorUIResource(primaryMid + 51, primaryMid + 51, primaryMid + 102);

        secondary1 = new ColorUIResource(secondaryMid - 51, secondaryMid - 51, secondaryMid - 51);
        secondary2 = new ColorUIResource(secondaryMid, secondaryMid, secondaryMid);
        secondary3 = new ColorUIResource(secondaryMid + 51, secondaryMid + 51, secondaryMid + 51);
    }

    // Getters for primary and secondary colors
}
