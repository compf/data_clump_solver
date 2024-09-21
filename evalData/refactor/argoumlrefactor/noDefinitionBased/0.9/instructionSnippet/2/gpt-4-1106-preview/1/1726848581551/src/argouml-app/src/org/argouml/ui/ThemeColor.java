package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColor {

    private final ColorUIResource primary1, primary2, primary3;

    public ThemeColor(int shade1, int shade2, int shade3) {
        this.primary1 = new ColorUIResource(shade1, shade1, shade1 + 51);
        this.primary2 = new ColorUIResource(shade2, shade2, shade2 + 51);
        this.primary3 = new ColorUIResource(shade3, shade3, shade3 + 51);
    }

    // Additional functionality or getters can be added here
}
