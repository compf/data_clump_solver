package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryBase, int secondaryBase, int tertiaryBase) {
        this.primary1 = new ColorUIResource(primaryBase, primaryBase, tertiaryBase);
        this.primary2 = new ColorUIResource(secondaryBase, secondaryBase, tertiaryBase + 51);
        this.primary3 = new ColorUIResource(tertiaryBase, tertiaryBase, 255);
        this.secondary1 = new ColorUIResource(primaryBase, primaryBase, primaryBase);
        this.secondary2 = new ColorUIResource(secondaryBase, secondaryBase, secondaryBase);
        this.secondary3 = new ColorUIResource(tertiaryBase, tertiaryBase, tertiaryBase);
    }

    // Getters for all color resources...
}