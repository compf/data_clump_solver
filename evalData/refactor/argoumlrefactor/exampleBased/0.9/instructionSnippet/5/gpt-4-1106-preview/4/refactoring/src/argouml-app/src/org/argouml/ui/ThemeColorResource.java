package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColorResource {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColorResource(int red1, int green1, int blue1, int red2, int green2, int blue2, int red3, int green3, int blue3) {
        this.primary1 = new ColorUIResource(red1, green1, blue1);
        this.primary2 = new ColorUIResource(red2, green2, blue2);
        this.primary3 = new ColorUIResource(red3, green3, blue3);
        this.secondary1 = new ColorUIResource(red1, green1, blue1);
        this.secondary2 = new ColorUIResource(red2, green2, blue2);
        this.secondary3 = new ColorUIResource(red3, green3, blue3);
    }

    // Getters for the color resources...
}