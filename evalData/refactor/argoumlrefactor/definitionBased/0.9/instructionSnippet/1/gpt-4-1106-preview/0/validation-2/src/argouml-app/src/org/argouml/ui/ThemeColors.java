package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b) {
        this.primary1 = new ColorUIResource(p1r, p1g, p1b);
        this.primary2 = new ColorUIResource(p2r, p2g, p2b);
        this.primary3 = new ColorUIResource((p1r + p2r) / 2, (p1g + p2g) / 2, (p1b + p2b) / 2);
        this.secondary1= new ColorUIResource(p1r / 2, p1g / 2, p1b / 2);
        this.secondary2 = new ColorUIResource(p2r / 2, p2g / 2, p2b / 2);
        this.secondary3 = new ColorUIResource((primary1.getRed() + primary2.getRed()) / 2,
                                              (primary1.getGreen() + primary2.getGreen()) / 2,
                                              (primary1.getBlue() + primary2.getBlue()) / 2);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}