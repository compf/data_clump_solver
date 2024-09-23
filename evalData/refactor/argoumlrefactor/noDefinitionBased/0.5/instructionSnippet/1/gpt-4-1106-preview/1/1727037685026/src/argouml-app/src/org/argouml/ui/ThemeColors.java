package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryBase, int primaryMid, int primaryLight, int secondaryBase) {
        this.primary1 = new ColorUIResource(primaryBase, primaryBase, primaryMid);
        this.primary2 = new ColorUIResource(primaryMid, primaryMid, primaryLight);
        this.primary3 = new ColorUIResource(primaryLight, primaryLight, 255);
        this.secondary1 = new ColorUIResource(secondaryBase, secondaryBase, secondaryBase);
        this.secondary2 = new ColorUIResource(secondaryBase + 51, secondaryBase + 51, secondaryBase + 51);
        this.secondary3 = new ColorUIResource(secondaryBase + 102, secondaryBase + 102, secondaryBase + 102);
    }

    // Getters and potentially other methods can be added here
}
