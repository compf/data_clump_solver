package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primaryColor;
    private ColorUIResource secondaryColor;
    private ColorUIResource tertiaryColor;

    public ThemeColors(int primaryRed, int primaryGreen, int primaryBlue) {
        primaryColor = new ColorUIResource(primaryRed, primaryGreen, primaryBlue);
        secondaryColor = new ColorUIResource(primaryRed + 51, primaryGreen + 51, primaryBlue + 51);
        tertiaryColor = new ColorUIResource(primaryRed + 102, primaryGreen + 102, primaryBlue + 102);
    }

    public ColorUIResource getPrimary() {
        return primaryColor;
    }

    public ColorUIResource getSecondary() {
        return secondaryColor;
    }

    public ColorUIResource getTertiary() {
        return tertiaryColor;
    }
}
