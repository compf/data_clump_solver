package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColor(ColorUIResource p1, ColorUIResource p2, ColorUIResource p3) {
        this.primary1 = p1;
        this.primary2 = p2;
        this.primary3 = p3;
    }

    public ColorUIResource getPrimary1() { return primary1; }

    public ColorUIResource getPrimary2() { return primary2; }

    public ColorUIResource getPrimary3() { return primary3; }
}