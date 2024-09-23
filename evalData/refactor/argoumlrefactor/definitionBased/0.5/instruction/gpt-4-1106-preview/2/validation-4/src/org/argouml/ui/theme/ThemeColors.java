package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int p1, int p2, int p3, int s1, int s2, int s3, int s4, int s5, int s6) {
        primary1 = new ColorUIResource(p1, p2, p3);
        primary2 = new ColorUIResource(s1, s2, s3);
        primary3 = new ColorUIResource(s4, s5, s6);
        secondary1 = new ColorUIResource(p1, p2, p2);
        secondary2 = new ColorUIResource(s1, s2, s2);
        secondary3 = new ColorUIResource(s4, s5, s5);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}