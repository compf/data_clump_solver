package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryBase, int secondaryBase, int tertiaryBase) {
        primary1 = new ColorUIResource(primaryBase, primaryBase, tertiaryBase);
        primary2 = new ColorUIResource(secondaryBase, secondaryBase, tertiaryBase);
        primary3 = new ColorUIResource(tertiaryBase, tertiaryBase, tertiaryBase);
        secondary1 = new ColorUIResource(primaryBase, primaryBase, primaryBase);
        secondary2 = new ColorUIResource(secondaryBase, secondaryBase, secondaryBase);
        secondary3 = new ColorUIResource(tertiaryBase, tertiaryBase, tertiaryBase);
    }

    // Getters for each color resource...
}