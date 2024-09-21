package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(int primaryIntensity, int secondaryIntensity, int tertiaryIntensity) {
        this.primary1 = new ColorUIResource(primaryIntensity, primaryIntensity, secondaryIntensity);
        this.primary2 = new ColorUIResource(secondaryIntensity, secondaryIntensity, tertiaryIntensity);
        this.primary3 = new ColorUIResource(tertiaryIntensity, tertiaryIntensity, tertiaryIntensity);
    }

    public ColorUIResource getPrimary1() {
        return primary1;
    }

    public ColorUIResource getPrimary2() {
        return primary2;
    }

    public ColorUIResource getPrimary3() {
        return primary3;
    }
}