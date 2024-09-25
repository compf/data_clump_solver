package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primary, int secondary, int tertiary) {
        this.primary1 = new ColorUIResource(primary, primary, tertiary);
        this.primary2 = new ColorUIResource(secondary, secondary, tertiary + 51);
        this.primary3 = new ColorUIResource(tertiary, tertiary, tertiary + 102);
        this.secondary1 = new ColorUIResource(primary, primary, primary);
        this.secondary2 = new ColorUIResource(secondary, secondary, secondary);
        this.secondary3 = new ColorUIResource(tertiary, tertiary, tertiary);
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