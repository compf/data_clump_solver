package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    final ColorUIResource primary1;
    final ColorUIResource primary2;
    final ColorUIResource primary3;
    final ColorUIResource secondary1;
    final ColorUIResource secondary2;
    final ColorUIResource secondary3;

    public ThemeColors(int primaryComponent, int secondaryComponent, int tertiaryComponent) {
        this.primary1 = new ColorUIResource(primaryComponent, primaryComponent, tertiaryComponent);
        this.primary2 = new ColorUIResource(secondaryComponent, secondaryComponent, tertiaryComponent + 51);
        this.primary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent + 102);
        this.secondary1 = new ColorUIResource(primaryComponent, primaryComponent, primaryComponent);
        this.secondary2 = new ColorUIResource(secondaryComponent, secondaryComponent, secondaryComponent);
        this.secondary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent);
    }
}