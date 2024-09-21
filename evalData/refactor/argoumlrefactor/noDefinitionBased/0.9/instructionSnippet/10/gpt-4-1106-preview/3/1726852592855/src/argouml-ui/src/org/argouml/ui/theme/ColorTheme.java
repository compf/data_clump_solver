package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ColorTheme {

    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ColorTheme(int primaryFactor, int secondaryFactor, int tertiaryFactor) {
        primary1 = new ColorUIResource(primaryFactor, primaryFactor, tertiaryFactor);
        primary2 = new ColorUIResource(secondaryFactor, secondaryFactor, tertiaryFactor);
        primary3 = new ColorUIResource(tertiaryFactor, tertiaryFactor, tertiaryFactor);

        secondary1 = new ColorUIResource(primaryFactor, primaryFactor, primaryFactor);
        secondary2 = new ColorUIResource(secondaryFactor, secondaryFactor, secondaryFactor);
        secondary3 = new ColorUIResource(tertiaryFactor, tertiaryFactor, tertiaryFactor);
    }

    // Getters and potentially other methods can be added here
}
