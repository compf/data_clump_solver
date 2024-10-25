package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int primaryBase, int secondaryBase, int highlight) {
        this.primary1 = new ColorUIResource(primaryBase, primaryBase, highlight);
        this.primary2 = new ColorUIResource(primaryBase + 51, primaryBase + 51, highlight + 51);
        this.primary3 = new ColorUIResource(highlight, highlight, highlight);
        this.secondary1 = new ColorUIResource(secondaryBase, secondaryBase, secondaryBase);
        this.secondary2 = new ColorUIResource(secondaryBase + 51, secondaryBase + 51, secondaryBase + 51);
        this.secondary3 = new ColorUIResource(highlight, highlight, highlight);
    }

    // Getters
    // ...
}
