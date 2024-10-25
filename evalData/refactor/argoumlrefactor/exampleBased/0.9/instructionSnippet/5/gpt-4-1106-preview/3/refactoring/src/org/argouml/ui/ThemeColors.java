package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1, primary2, primary3;
    private ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(ColorUIResource p1, ColorUIResource p2, ColorUIResource p3, ColorUIResource s1, ColorUIResource s2, ColorUIResource s3) {
        this.primary1 = p1;
        this.primary2 = p2;
        this.primary3 = p3;
        this.secondary1 = s1;
        this.secondary2 = s2;
        this.secondary3 = s3;
    }
    // getters
}