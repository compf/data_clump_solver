package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    public final ColorUIResource primary1;
    public final ColorUIResource primary2;
    public final ColorUIResource primary3;
    public final ColorUIResource secondary1;
    public final ColorUIResource secondary2;
    public final ColorUIResource secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        primary1 = new ColorUIResource(p1r, p1g, p1b);
        primary2 = new ColorUIResource(p2r, p2g, p2b);
        primary3 = new ColorUIResource(p3r, p3g, p3b);

        secondary1 = new ColorUIResource(p1r, p1g, p1b);
        secondary2 = new ColorUIResource(p2r, p2g, p2b);
        secondary3 = new ColorUIResource(p3r, p3g, p3b);
    }

    // Getters or other methods if necessary
}
