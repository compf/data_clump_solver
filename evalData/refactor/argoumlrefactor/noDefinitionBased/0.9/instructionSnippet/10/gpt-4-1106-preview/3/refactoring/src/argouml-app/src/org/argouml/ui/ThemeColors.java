package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColors(int primaryR, int primaryG, int primaryB) {
        this.primary1 = new ColorUIResource(primaryR, primaryR, primaryB);
        this.primary2 = new ColorUIResource(primaryG, primaryG, primaryB);
        this.primary3 = new ColorUIResource(primaryB, primaryB, primaryB);
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