package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int primary, int secondary, int tertiary) {
        primary1 = new ColorUIResource(primary, primary, tertiary);
        primary2 = new ColorUIResource(secondary, secondary, tertiary + 51);
        primary3 = new ColorUIResource(tertiary, tertiary, 255);
        secondary1 = new ColorUIResource(primary, primary, primary);
        secondary2 = new ColorUIResource(secondary, secondary, secondary);
        secondary3 = new ColorUIResource(tertiary, tertiary, tertiary);
    }

    // Getters for the color resources can be added here
}
