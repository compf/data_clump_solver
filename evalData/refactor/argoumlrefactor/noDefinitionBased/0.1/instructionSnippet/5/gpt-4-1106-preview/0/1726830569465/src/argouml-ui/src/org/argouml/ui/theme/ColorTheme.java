package org.argouml.ui.theme;

import javax.swing.plaf.ColorUIResource;

public class ColorTheme {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public ColorTheme(int primaryStart, int primaryMid, int primaryEnd) {
        this.primary1 = new ColorUIResource(primaryStart, primaryStart, primaryEnd);
        this.primary2 = new ColorUIResource(primaryMid, primaryMid, primaryEnd);
        this.primary3 = new ColorUIResource(primaryEnd, primaryEnd, primaryEnd);
    }

    // Getters and other methods if necessary
}
