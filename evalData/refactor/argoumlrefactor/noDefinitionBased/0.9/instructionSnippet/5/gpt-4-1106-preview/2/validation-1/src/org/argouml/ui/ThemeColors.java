package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(int p1r, int p1g, int p1b, int p2r, int p2g, int p2b) {
        this.primary1 = new ColorUIResource(p1r, p1g, p1b);
        this.primary2 = new ColorUIResource(p2r, p2g, p2b);
        this.primary3 = new ColorUIResource(255, 255, 255); // White as a default primary3 color
        this.secondary1 = new ColorUIResource(p1r, p1g, p1b); // Same as primary1
        this.secondary2 = new ColorUIResource(p2r, p2g, p2b); // Same as primary2
        this.secondary3 = new ColorUIResource(204, 204, 204); // Default secondary3 color
    }
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}