package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

class ThemeColor {
    private ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b, int p3r, int p3g, int p3b) {
        this.primary1 = new ColorUIResource(p1r, p1g, p1b);
        this.primary2 = new ColorUIResource(p2r, p2g, p2b);
        this.primary3 = new ColorUIResource(p3r, p3g, p3b);
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
}
