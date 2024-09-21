package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(int r1, int g1, int b1) {
        primary1 = new ColorUIResource(r1, g1, b1);
        primary2 = new ColorUIResource(r1 + 51, g1 + 51, b1 + 51);
        primary3 = new ColorUIResource(r1 + 102, g1 + 102, b1 + 102);
    }

    public ColorUIResource getPrimary1() { return primary1; }

    public ColorUIResource getPrimary2() { return primary2; }

    public ColorUIResource getPrimary3() { return primary3; }
}
