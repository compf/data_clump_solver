package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int tone, int medium, int light) {
        primary1 = new ColorUIResource(tone, tone, tone);
        primary2 = new ColorUIResource(medium, medium, medium);
        primary3 = new ColorUIResource(light, light, light);

        secondary1 = new ColorUIResource(tone, tone, tone);
        secondary2 = new ColorUIResource(medium, medium, medium);
        secondary3 = new ColorUIResource(light, light, light);
    }

    // Getters and logic related to colors could be added here
}
