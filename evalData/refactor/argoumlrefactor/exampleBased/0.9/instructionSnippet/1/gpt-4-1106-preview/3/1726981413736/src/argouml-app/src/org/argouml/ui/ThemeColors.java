package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3) {
        this.color1 = new ColorUIResource(colorValue1, colorValue1, colorValue1);
        this.color2 = new ColorUIResource(colorValue2, colorValue2, colorValue2);
        this.color3 = new ColorUIResource(colorValue3, colorValue3, colorValue3);
    }

    // getters and other methods
}