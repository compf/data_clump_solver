package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryShade, int secondaryShade) {
        this.primary1 = new ColorUIResource(primaryShade, primaryShade, primaryShade);
        this.primary2 = new ColorUIResource(primaryShade + 51, primaryShade + 51, primaryShade + 51);
        this.primary3 = new ColorUIResource(primaryShade + 102, primaryShade + 102, primaryShade + 102);
        this.secondary1 = new ColorUIResource(secondaryShade, secondaryShade, secondaryShade);
        this.secondary2 = new ColorUIResource(secondaryShade + 51, secondaryShade + 51, secondaryShade + 51);
        this.secondary3 = new ColorUIResource(secondaryShade + 102, secondaryShade + 102, secondaryShade + 102);
    }

    // Getters
    // ...
}