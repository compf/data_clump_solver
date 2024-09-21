package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private ColorUIResource primary, secondary, tertiary;

    public ThemeColor(int red, int green, int blue) {
        this.primary = new ColorUIResource(red, green, blue);
        this.secondary = new ColorUIResource(red * 2 / 3, green * 2 / 3, blue * 2 / 3);
        this.tertiary = new ColorUIResource(red * 1 / 3, green * 1 / 3, blue * 1 / 3);
    }

    public ColorUIResource getPrimary() {
        return primary;
    }

    public ColorUIResource getSecondary() {
        return secondary;
    }

    public ColorUIResource getTertiary() {
        return tertiary;
    }
}
