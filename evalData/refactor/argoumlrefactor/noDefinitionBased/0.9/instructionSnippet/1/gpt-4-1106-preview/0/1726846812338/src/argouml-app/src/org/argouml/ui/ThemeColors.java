package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int colorDark, int colorMid, int colorLight) {
        primary1 = new ColorUIResource(colorDark, colorDark, colorMid);
        primary2 = new ColorUIResource(colorMid, colorMid, colorMid);
        primary3 = new ColorUIResource(colorLight, colorLight, colorLight);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}