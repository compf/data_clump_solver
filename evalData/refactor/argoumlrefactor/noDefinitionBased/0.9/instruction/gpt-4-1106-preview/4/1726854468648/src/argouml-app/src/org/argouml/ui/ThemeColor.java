package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColor(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        primary1 = new ColorUIResource(p1r, p1g, p1b);
        primary2 = new ColorUIResource(p2r, p2g, p2b);
        primary3 = new ColorUIResource(p3r, p3g, p3b);
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
        return new ColorUIResource(primary1.getRGB());
    }

    public ColorUIResource getSecondary2() {
        return new ColorUIResource(primary2.getRGB());
    }

    public ColorUIResource getSecondary3() {
        return new ColorUIResource(primary3.getRGB());
    }
}
