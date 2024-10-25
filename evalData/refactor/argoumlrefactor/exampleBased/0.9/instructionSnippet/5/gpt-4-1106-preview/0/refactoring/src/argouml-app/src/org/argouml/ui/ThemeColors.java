package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;

    public ThemeColors(ColorUIResource primary1, ColorUIResource primary2, ColorUIResource primary3) {
        this.primary1 = primary1;
        this.primary2 = primary2;
        this.primary3 = primary3;
    }

    // Getters for primary colors
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
}