package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primaryColor1;
    private final ColorUIResource primaryColor2;
    private final ColorUIResource primaryColor3;
    private final ColorUIResource secondaryColor1;
    private final ColorUIResource secondaryColor2;
    private final ColorUIResource secondaryColor3;

    public ThemeColors(int primaryShade, int secondaryShade, int tertiaryShade) {
        primaryColor1 = new ColorUIResource(primaryShade, primaryShade, tertiaryShade);
        primaryColor2 = new ColorUIResource(secondaryShade, secondaryShade, tertiaryShade);
        primaryColor3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);
        secondaryColor1 = new ColorUIResource(primaryShade, primaryShade, primaryShade);
        secondaryColor2 = new ColorUIResource(secondaryShade, secondaryShade, secondaryShade);
        secondaryColor3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);
    }

    public ColorUIResource getPrimaryColor1() {
        return primaryColor1;
    }

    public ColorUIResource getPrimaryColor2() {
        return primaryColor2;
    }

    public ColorUIResource getPrimaryColor3() {
        return primaryColor3;
    }

    public ColorUIResource getSecondaryColor1() {
        return secondaryColor1;
    }

    public ColorUIResource getSecondaryColor2() {
        return secondaryColor2;
    }

    public ColorUIResource getSecondaryColor3() {
        return secondaryColor3;
    }
}