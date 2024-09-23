package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ColorScheme {

    private ColorUIResource primary1, primary2, primary3;
    private ColorUIResource secondary1, secondary2, secondary3;

    public ColorScheme(int r1, int g1, int b1,
                      int r2, int g2, int b2,
                      int r3, int g3, int b3) {
        primary1 = new ColorUIResource(r1, g1, b1);
        primary2 = new ColorUIResource(r2, g2, b2);
        primary3 = new ColorUIResource(r3, g3, b3);
    }

    public ColorScheme withSecondary(int r1, int g1, int b1,
                                    int r2, int g2, int b2,
                                    int r3, int g3, int b3) {
        secondary1 = new ColorUIResource(r1, g1, b1);
        secondary2 = new ColorUIResource(r2, g2, b2);
        secondary3 = new ColorUIResource(r3, g3, b3);
        return this;
    }

    // Getter methods for primary and secondary colors

}
