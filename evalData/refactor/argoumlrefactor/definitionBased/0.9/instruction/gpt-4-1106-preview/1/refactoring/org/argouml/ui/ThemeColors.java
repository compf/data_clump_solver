package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    public final ColorUIResource color1;
    public final ColorUIResource color2;
    public final ColorUIResource color3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3) {
        color1 = new ColorUIResource(colorValue1, colorValue1, colorValue3);
        color2 = new ColorUIResource(colorValue2, colorValue2, colorValue3);
        color3 = new ColorUIResource(colorValue3, colorValue3, colorValue3);
    }
}