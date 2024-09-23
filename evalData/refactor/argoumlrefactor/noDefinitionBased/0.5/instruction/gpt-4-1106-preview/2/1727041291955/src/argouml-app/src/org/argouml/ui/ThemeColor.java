package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColor(int primary, int secondary, int tertiary) {
        primary1 = new ColorUIResource(primary, primary, primary + 51);
        primary2 = new ColorUIResource(secondary, secondary, secondary + 51);
        primary3 = new ColorUIResource(tertiary, tertiary, tertiary + 51);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}