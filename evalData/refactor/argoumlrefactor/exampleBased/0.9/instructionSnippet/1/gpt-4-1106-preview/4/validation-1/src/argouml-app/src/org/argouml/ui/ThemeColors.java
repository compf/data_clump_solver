package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1, primary2, primary3;
    private ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int primaryRed, int primaryGreen, int primaryBlue, int secondaryRed, int secondaryGreen, int secondaryBlue) {
        primary1 = new ColorUIResource(primaryRed, primaryGreen, primaryBlue);
        primary2 = new ColorUIResource(primaryRed + 51, primaryGreen + 51, primaryBlue + 51);
        primary3 = new ColorUIResource(primaryRed + 102, primaryGreen + 102, primaryBlue + 102);
        secondary1 = new ColorUIResource(secondaryRed, secondaryGreen, secondaryBlue);
        secondary2 = new ColorUIResource(secondaryRed + 51, secondaryGreen + 51, secondaryBlue + 51);
        secondary3 = new ColorUIResource(secondaryRed + 102, secondaryGreen + 102, secondaryBlue + 102);
    }

    // Getters for the color resources
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}