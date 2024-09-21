package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int shade, int midShade, int lightShade) {
        primary1 = new ColorUIResource(shade, shade, shade + 51);
        primary2 = new ColorUIResource(midShade, midShade, shade + 102);
        primary3 = new ColorUIResource(lightShade, lightShade, shade + 153);

        secondary1 = new ColorUIResource(shade, shade, shade);
        secondary2 = new ColorUIResource(midShade, midShade, midShade);
        secondary3 = new ColorUIResource(lightShade, lightShade, lightShade);
    }

    // Getters and other methods...
}