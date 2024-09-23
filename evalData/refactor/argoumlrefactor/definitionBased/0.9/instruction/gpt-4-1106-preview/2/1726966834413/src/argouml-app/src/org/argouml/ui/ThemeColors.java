package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

/**
 * Encapsulates theme colors used in themes for UI.
 */
class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    ThemeColors(
            int primaryDark, int primaryMedium, int primaryLight,
            int secondaryDark, int secondaryMedium, int secondaryLight) {
        this.primary1 = new ColorUIResource(primaryDark, primaryDark, primaryDark + 51);
        this.primary2 = new ColorUIResource(primaryMedium, primaryMedium, primaryDark + 102);
        this.primary3 = new ColorUIResource(primaryLight, primaryLight, primaryLight);

        this.secondary1 = new ColorUIResource(secondaryDark, secondaryDark, secondaryDark);
        this.secondary2 = new ColorUIResource(secondaryMedium, secondaryMedium, secondaryMedium);
        this.secondary3 = new ColorUIResource(secondaryLight, secondaryLight, secondaryLight);
    }

    // Add getters here...
}
