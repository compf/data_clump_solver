package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColorResources {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColorResources(int primaryColorIntensity, int secondaryColorIntensity) {
        this.primary1 = new ColorUIResource(primaryColorIntensity, primaryColorIntensity, 153);
        this.primary2 = new ColorUIResource(secondaryColorIntensity, secondaryColorIntensity, 204);
        this.primary3 = new ColorUIResource(204, 204, 255);
        this.secondary1 = new ColorUIResource(primaryColorIntensity, primaryColorIntensity, primaryColorIntensity);
        this.secondary2 = new ColorUIResource(secondaryColorIntensity, secondaryColorIntensity, secondaryColorIntensity);
        this.secondary3 = new ColorUIResource(204, 204, 204);
    }

    // Add getters for color resources

}