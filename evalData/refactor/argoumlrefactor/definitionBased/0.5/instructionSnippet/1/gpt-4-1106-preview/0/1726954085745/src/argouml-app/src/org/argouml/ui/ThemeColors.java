package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryMid, int primaryLight, int primaryLighter) {
        this.primary1 = new ColorUIResource(primaryMid, primaryMid, primaryMid + 51);
        this.primary2 = new ColorUIResource(primaryLight, primaryLight, primaryMid + 102);
        this.primary3 = new ColorUIResource(primaryLighter, primaryLighter, primaryMid + 153);
        this.secondary1 = new ColorUIResource(primaryMid, primaryMid, primaryMid);
        this.secondary2 = new ColorUIResource(primaryLight, primaryLight, primaryLight);
        this.secondary3 = new ColorUIResource(primaryLighter, primaryLighter, primaryLighter);
    }

    // Getters for each color
}
