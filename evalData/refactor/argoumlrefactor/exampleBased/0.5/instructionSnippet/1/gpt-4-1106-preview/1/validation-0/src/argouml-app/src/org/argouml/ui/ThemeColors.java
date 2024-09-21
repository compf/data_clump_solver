package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int p1, int p2, int p3, int s1, int s2, int s3) {
        this.primary1 = new ColorUIResource(p1, p1, p3);
        this.primary2 = new ColorUIResource(p2, p2, p3);
        this.primary3 = new ColorUIResource(p3, p3, p3);
        this.secondary1 = new ColorUIResource(s1, s1, s1);
        this.secondary2 = new ColorUIResource(s2, s2, s2);
        this.secondary3 = new ColorUIResource(s3, s3, s3);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}
