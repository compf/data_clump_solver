package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int primaryComponent, int secondaryComponent, int tertiaryComponent) {
        primary1 = new ColorUIResource(primaryComponent, primaryComponent, tertiaryComponent);
        primary2 = new ColorUIResource(secondaryComponent, secondaryComponent, tertiaryComponent);
        primary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent);

        secondary1 = new ColorUIResource(primaryComponent, primaryComponent, primaryComponent);
        secondary2 = new ColorUIResource(secondaryComponent, secondaryComponent, secondaryComponent);
        secondary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent);
    }

    // Getters and additional functionality can be added here
}
