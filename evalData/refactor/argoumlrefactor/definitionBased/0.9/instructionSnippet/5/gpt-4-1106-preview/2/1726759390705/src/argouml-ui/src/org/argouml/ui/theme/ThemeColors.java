package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(int p1, int p2, int p3) {
        primary1 = new ColorUIResource(p1, p1, p3);
        primary2 = new ColorUIResource(p2, p2, p3);
        primary3 = new ColorUIResource(p3, p3, p3);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}