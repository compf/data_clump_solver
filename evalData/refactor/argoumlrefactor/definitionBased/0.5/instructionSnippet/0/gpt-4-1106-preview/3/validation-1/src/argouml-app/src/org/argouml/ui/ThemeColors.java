package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private ColorUIResource primary1;
    private ColorUIResource primary2;
    private ColorUIResource primary3;
    private ColorUIResource secondary1;
    private ColorUIResource secondary2;
    private ColorUIResource secondary3;

    public ThemeColors(ColorUIResource primary1, ColorUIResource primary2, ColorUIResource primary3, ColorUIResource secondary1, ColorUIResource secondary2, ColorUIResource secondary3) {
        this.primary1 = primary1;
        this.primary2 = primary2;
        this.primary3 = primary3;
        this.secondary1 = secondary1;
        this.secondary2 = secondary2;
        this.secondary3 = secondary3;
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

    public ColorUIResource getSecondary1() {
        return secondary1;
    }

    public ColorUIResource getSecondary2() {
        return secondary2;
    }

    public ColorUIResource getSecondary3() {
        return secondary3;
    }

}