package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int primaryRed, int primaryGreen, int primaryBlue,
                      int secondaryRed, int secondaryGreen, int secondaryBlue) {
        this.primary1 = new ColorUIResource(primaryRed, primaryGreen, primaryBlue);
        this.primary2 = new ColorUIResource(primaryRed + 50, primaryGreen + 50, primaryBlue + 50);
        this.primary3 = new ColorUIResource(primaryRed + 100, primaryGreen + 100, primaryBlue + 100);
        this.secondary1 = new ColorUIResource(secondaryRed, secondaryGreen, secondaryBlue);
        this.secondary2 = new ColorUIResource(secondaryRed + 50, secondaryGreen + 50, secondaryBlue + 50);
        this.secondary3 = new ColorUIResource(secondaryRed + 100, secondaryGreen + 100, secondaryBlue + 100);
    }
}