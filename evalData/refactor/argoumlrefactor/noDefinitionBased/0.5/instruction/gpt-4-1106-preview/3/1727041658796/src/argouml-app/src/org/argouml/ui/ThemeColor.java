package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ThemeColor(int primaryBase, int secondaryBase, int tertiaryBase) {
        primary1 = new ColorUIResource(primaryBase, primaryBase, secondaryBase);
        primary2 = new ColorUIResource(secondaryBase, secondaryBase, tertiaryBase);
        primary3 = new ColorUIResource(tertiaryBase, tertiaryBase, 255);
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