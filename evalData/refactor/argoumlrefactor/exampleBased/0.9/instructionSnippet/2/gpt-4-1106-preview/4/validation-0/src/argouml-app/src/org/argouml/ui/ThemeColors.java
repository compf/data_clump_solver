package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private ColorUIResource primary1, primary2, primary3, secondary1, secondary2, secondary3;

    public ThemeColors(ColorUIResource pri1, ColorUIResource pri2, ColorUIResource pri3, ColorUIResource sec1, ColorUIResource sec2, ColorUIResource sec3) {
        this.primary1 = pri1;
        this.primary2 = pri2;
        this.primary3 = pri3;
        this.secondary1 = sec1;
        this.secondary2 = sec2;
        this.secondary3 = sec3;
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

    // Getters and utility methods, if needed
}