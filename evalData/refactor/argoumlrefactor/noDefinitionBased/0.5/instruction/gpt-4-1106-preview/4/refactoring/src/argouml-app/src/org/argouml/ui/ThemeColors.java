package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary;
    private final ColorUIResource secondary;
    private final ColorUIResource tertiary;

    public ThemeColors(int primaryIntensity, int secondaryIntensity, int tertiaryIntensity) {
        this.primary = new ColorUIResource(primaryIntensity, primaryIntensity, primaryIntensity + 51);
        this.secondary = new ColorUIResource(secondaryIntensity, secondaryIntensity, secondaryIntensity + 51);
        this.tertiary = new ColorUIResource(tertiaryIntensity, tertiaryIntensity, tertiaryIntensity + 51);
    }

    public ColorUIResource getPrimary() {
        return primary;
    }

    public ColorUIResource getSecondary() {
        return secondary;
    }

    public ColorUIResource getTertiary() {
        return tertiary;
    }
}
