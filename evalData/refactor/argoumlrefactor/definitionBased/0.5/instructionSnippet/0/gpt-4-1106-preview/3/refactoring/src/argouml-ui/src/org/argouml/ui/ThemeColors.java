package org.argouml.ui;

import java.awt.Color;
import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(Color primary1, Color primary2, Color primary3, Color secondary1, Color secondary2, Color secondary3) {
        this.primary1 = new ColorUIResource(primary1);
        this.primary2 = new ColorUIResource(primary2);
        this.primary3 = new ColorUIResource(primary3);
        this.secondary1 = new ColorUIResource(secondary1);
        this.secondary2 = new ColorUIResource(secondary2);
        this.secondary3 = new ColorUIResource(secondary3);
    }

    // Getters for each color
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}