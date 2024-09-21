package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource color1;
    private final ColorUIResource color2;
    private final ColorUIResource color3;

    public ThemeColors(int shade1, int shade2, int shade3) {
        this.color1 = new ColorUIResource(shade1, shade1, shade1);
        this.color2 = new ColorUIResource(shade2, shade2, shade2);
        this.color3 = new ColorUIResource(shade3, shade3, shade3);
    }

    public ColorUIResource getColor1() { return color1; }
    public ColorUIResource getColor2() { return color2; }
    public ColorUIResource getColor3() { return color3; }
}
