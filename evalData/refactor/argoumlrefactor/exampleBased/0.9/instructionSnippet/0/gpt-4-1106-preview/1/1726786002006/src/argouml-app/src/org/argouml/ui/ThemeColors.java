package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int[] primaryColors, int[] secondaryColors) {
        primary1 = new ColorUIResource(primaryColors[0], primaryColors[1], primaryColors[2]);
        primary2 = new ColorUIResource(primaryColors[3], primaryColors[4], primaryColors[5]);
        primary3 = new ColorUIResource(primaryColors[6], primaryColors[7], primaryColors[8]);
        secondary1 = new ColorUIResource(secondaryColors[0], secondaryColors[1], secondaryColors[2]);
        secondary2 = new ColorUIResource(secondaryColors[3], secondaryColors[4], secondaryColors[5]);
        secondary3 = new ColorUIResource(secondaryColors[6], secondaryColors[7], secondaryColors[8]);
    }

    // Getters for the colors    
}
