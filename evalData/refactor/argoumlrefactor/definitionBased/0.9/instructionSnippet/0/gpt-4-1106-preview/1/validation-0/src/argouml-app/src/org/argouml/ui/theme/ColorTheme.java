package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ColorTheme {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ColorTheme(int p1, int p2, int p3) {
        this.primary1 = new ColorUIResource(p1, p1, p1);
        this.primary2 = new ColorUIResource(p2, p2, p2);
        this.primary3 = new ColorUIResource(p3, p3, p3);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}
