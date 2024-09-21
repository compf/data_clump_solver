package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int prim1Red, int prim1Green, int prim1Blue, int prim2Red, int prim2Green, int prim2Blue, int prim3Red, int prim3Green, int prim3Blue) {
        primary1 = new ColorUIResource(prim1Red, prim1Green, prim1Blue);
        primary2 = new ColorUIResource(prim2Red, prim2Green, prim2Blue);
        primary3 = new ColorUIResource(prim3Red, prim3Green, prim3Blue);
        secondary1 = primary1; // Assume secondary theme colors are the same as primary
        secondary2 = primary2;
        secondary3 = primary3;
    }

    // Getters and potential additional functionality here
}
