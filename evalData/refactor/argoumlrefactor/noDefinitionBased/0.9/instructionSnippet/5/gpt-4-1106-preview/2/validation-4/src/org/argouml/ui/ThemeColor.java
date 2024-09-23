package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private final ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int r, int g, int b) {
        this.primary1 = new ColorUIResource(r, g, b);
        this.primary2 = new ColorUIResource(r, g, b);
        this.primary3 = new ColorUIResource(r, g, b);
    }
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return new ColorUIResource(102, 102, 102); }
    public ColorUIResource getSecondary2() { return new ColorUIResource(153, 153, 153); }
    public ColorUIResource getSecondary3() { return new ColorUIResource(204, 204, 204); }
}