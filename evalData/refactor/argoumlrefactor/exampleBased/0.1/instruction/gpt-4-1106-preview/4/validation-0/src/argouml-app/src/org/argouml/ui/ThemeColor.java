package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

class ThemeColor {
    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;
    private ColorUIResource secondary1;
    private ColorUIResource secondary2;
    private ColorUIResource secondary3;

    ThemeColor(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        this.primary1 = new ColorUIResource(p1r, p1g, p1b);
        this.primary2 = new ColorUIResource(p2r, p2g, p2b);
        this.primary3 = new ColorUIResource(p3r, p3g, p3b);
        this.secondary1 = new ColorUIResource(p1r, p1g, p1b);
        this.secondary2 = new ColorUIResource(p2r, p2g, p2b);
        this.secondary3 = new ColorUIResource(p3r, p3g, p3b);
    }

    ColorUIResource getPrimary1() { return primary1; }
    ColorUIResource getPrimary2() { return primary2; }
    ColorUIResource getPrimary3() { return primary3; }
    ColorUIResource getSecondary1() { return secondary1; }
    ColorUIResource getSecondary2() { return secondary2; }
    ColorUIResource getSecondary3() { return secondary3; }
}