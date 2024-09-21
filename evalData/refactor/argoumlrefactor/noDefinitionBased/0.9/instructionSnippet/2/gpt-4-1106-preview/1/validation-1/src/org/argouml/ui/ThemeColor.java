package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private final ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int shade1, int shade2, int shade3) {
        this.primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        this.primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        this.primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
    }

    public ColorUIResource getPrimary(int number) {
        switch (number) {
            case 1: return primary1;
            case 2: return primary2;
            case 3: return primary3;
            default: throw new IllegalArgumentException("Invalid primary number: " + number);
        }
    }
}
