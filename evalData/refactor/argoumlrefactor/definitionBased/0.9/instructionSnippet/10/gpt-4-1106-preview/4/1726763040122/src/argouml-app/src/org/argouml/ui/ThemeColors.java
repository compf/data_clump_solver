package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1, color2, color3;

    public ThemeColors(int colorBaseValue, int colorIncrement1, int colorIncrement2) {
        color1 = new ColorUIResource(colorBaseValue, colorBaseValue, colorBaseValue + colorIncrement2);
        color2 = new ColorUIResource(colorBaseValue + colorIncrement1, colorBaseValue + colorIncrement1, colorBaseValue + colorIncrement2 * 2);
        color3 = new ColorUIResource(colorBaseValue + colorIncrement2, colorBaseValue + colorIncrement2, colorBaseValue + colorIncrement2 * 3);
    }

    // getters and possibly some utility methods follow
}
