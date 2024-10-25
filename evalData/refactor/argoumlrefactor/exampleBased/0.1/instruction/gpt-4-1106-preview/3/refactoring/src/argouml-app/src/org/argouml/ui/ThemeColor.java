package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColor(int color1, int color2, int color3) {
        this.primary1 = new ColorUIResource(color1, color1, color1 + 51);
        this.primary2 = new ColorUIResource(color2, color2, color2 + 51);
        this.primary3 = new ColorUIResource(color3, color3, color3 + 51);
    }

    public ColorUIResource getPrimary1() {
        return primary1;
    }

    public ColorUIResource getPrimary2() {
        return primary2;
    }

    public ColorUIResource getPrimary3() {
        return primary3;
    }

    public ColorUIResource getSecondary1() {
        return primary1;
    }

    public ColorUIResource getSecondary2() {
        return primary2;
    }

    public ColorUIResource getSecondary3() {
        return primary3;
    }
}