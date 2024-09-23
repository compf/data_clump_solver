package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryShade, int secondaryShade, int tertiaryShade) {
        primary1 = new ColorUIResource(primaryShade, primaryShade, tertiaryShade);
        primary2 = new ColorUIResource(secondaryShade, secondaryShade, tertiaryShade);
        primary3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);

        secondary1 = new ColorUIResource(primaryShade, primaryShade, primaryShade);
        secondary2 = new ColorUIResource(secondaryShade, secondaryShade, secondaryShade);
        secondary3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);
    }

    // Getters for the colors
    // ...
}