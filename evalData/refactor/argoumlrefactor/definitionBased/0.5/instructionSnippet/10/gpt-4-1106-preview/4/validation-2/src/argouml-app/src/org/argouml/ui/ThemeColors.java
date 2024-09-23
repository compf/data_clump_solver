package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primaryColor1;
    private final ColorUIResource primaryColor2;
    private final ColorUIResource primaryColor3;
    private final ColorUIResource secondaryColor1;
    private final ColorUIResource secondaryColor2;
    private final ColorUIResource secondaryColor3;

    public ThemeColors(int colorValue1, int colorValue2, int colorValue3) {
        this.primaryColor1 = new ColorUIResource(colorValue1, colorValue1, colorValue3);
        this.primaryColor2 = new ColorUIResource(colorValue2, colorValue2, colorValue3);
        this.primaryColor3 = new ColorUIResource(colorValue3, colorValue3, colorValue3);
        this.secondaryColor1 = new ColorUIResource(colorValue1, colorValue1, colorValue1);
        this.secondaryColor2 = new ColorUIResource(colorValue2, colorValue2, colorValue2);
        this.secondaryColor3 = new ColorUIResource(colorValue3, colorValue3, colorValue3);
    }

    public ColorUIResource getPrimaryColor1() { return primaryColor1; }
    public ColorUIResource getPrimaryColor2() { return primaryColor2; }
    public ColorUIResource getPrimaryColor3() { return primaryColor3; }
    public ColorUIResource getSecondaryColor1() { return secondaryColor1; }
    public ColorUIResource getSecondaryColor2() { return secondaryColor2; }
    public ColorUIResource getSecondaryColor3() { return secondaryColor3; }
}
