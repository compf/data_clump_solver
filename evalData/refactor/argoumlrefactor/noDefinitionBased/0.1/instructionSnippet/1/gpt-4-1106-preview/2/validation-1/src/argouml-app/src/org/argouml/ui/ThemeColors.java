package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primaryColor1;
    private final ColorUIResource primaryColor2;
    private final ColorUIResource primaryColor3;
    private final ColorUIResource secondaryColor1;
    private final ColorUIResource secondaryColor2;
    private final ColorUIResource secondaryColor3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        primaryColor1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        primaryColor2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        primaryColor3 = new ColorUIResource(shade3, shade3, shade3 + 51);
        secondaryColor1 = new ColorUIResource(shade1, shade1, shade1);
        secondaryColor2 = new ColorUIResource(shade2, shade2, shade2);
        secondaryColor3 = new ColorUIResource(shade3, shade3, shade3);
    }

    public ColorUIResource getPrimaryColor1() { return primaryColor1; }
    public ColorUIResource getPrimaryColor2() { return primaryColor2; }
    public ColorUIResource getPrimaryColor3() { return primaryColor3; }
    public ColorUIResource getSecondaryColor1() { return secondaryColor1; }
    public ColorUIResource getSecondaryColor2() { return secondaryColor2; }
    public ColorUIResource getSecondaryColor3() { return secondaryColor3; }
}
