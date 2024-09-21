package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3) {
        this.primary1 = new ColorUIResource(colorValue1, colorValue1, colorValue1 + 51);
        this.primary2 = new ColorUIResource(colorValue2, colorValue2, colorValue2 + 51);
        this.primary3 = new ColorUIResource(colorValue3, colorValue3, colorValue3 + 51);
    }

    // Accessor methods for primary1, primary2, and primary3
    // ...
}