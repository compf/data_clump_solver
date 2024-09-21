package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3) {
        this.primary1 = new ColorUIResource(colorValue1, colorValue1, colorValue3);
        this.primary2 = new ColorUIResource(colorValue2, colorValue2, colorValue3);
        this.primary3 = new ColorUIResource(colorValue3, colorValue3, colorValue3);
    }

    // Getters for the color resources
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}