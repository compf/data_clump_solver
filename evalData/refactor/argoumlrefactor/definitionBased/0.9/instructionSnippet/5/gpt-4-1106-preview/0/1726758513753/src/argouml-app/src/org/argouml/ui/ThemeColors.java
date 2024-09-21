package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary;
    private final ColorUIResource secondary;
    private final ColorUIResource tertiary;

    public ThemeColors(int p, int s, int t) {
        primary = new ColorUIResource(p, p, s);
        secondary = new ColorUIResource(s, s, t);
        tertiary = new ColorUIResource(t, t, t);
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