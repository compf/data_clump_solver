package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int p1, int p2, int p3) {
        primary1 = new ColorUIResource(p1, p1, p1);
        primary2 = new ColorUIResource(p2, p2, p2);
        primary3 = new ColorUIResource(p3, p3, p3);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return new ColorUIResource(primary1.getRGB()); }
    public ColorUIResource getSecondary2() { return new ColorUIResource(primary2.getRGB()); }
    public ColorUIResource getSecondary3() { return new ColorUIResource(primary3.getRGB()); }
}