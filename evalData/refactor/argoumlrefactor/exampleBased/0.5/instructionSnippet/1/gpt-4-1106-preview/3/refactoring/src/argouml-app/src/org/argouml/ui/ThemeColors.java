package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryDark, int primaryMedium, int primaryLight) {
        primary1 = new ColorUIResource(primaryDark, primaryDark, primaryDark);
        primary2 = new ColorUIResource(primaryMedium, primaryMedium, primaryMedium);
        primary3 = new ColorUIResource(primaryLight, primaryLight, primaryLight);
        secondary1 = new ColorUIResource(primaryDark / 2, primaryDark / 2, primaryDark / 2);
        secondary2 = new ColorUIResource(primaryMedium / 2, primaryMedium / 2, primaryMedium / 2);
        secondary3 = new ColorUIResource(primaryLight / 2, primaryLight / 2, primaryLight / 2);
    }

    // Getters not shown for brevity
}