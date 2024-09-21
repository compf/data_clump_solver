package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int start, int middle, int end) {
        primary1 = new ColorUIResource(start, start, start + 51);
        primary2 = new ColorUIResource(middle, middle, middle + 51);
        primary3 = new ColorUIResource(end, end, end + 51);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}