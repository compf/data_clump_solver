package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryShade, int secondaryShade) {
        this.primary1 = new ColorUIResource(primaryShade, primaryShade, primaryShade + 51);
        this.primary2 = new ColorUIResource(primaryShade + 51, primaryShade + 51, primaryShade + 102);
        this.primary3 = new ColorUIResource(primaryShade + 102, primaryShade + 102, primaryShade + 153);
        this.secondary1 = new ColorUIResource(secondaryShade, secondaryShade, secondaryShade);
        this.secondary2 = new ColorUIResource(secondaryShade + 51, secondaryShade + 51, secondaryShade + 51);
        this.secondary3 = new ColorUIResource(secondaryShade + 102, secondaryShade + 102, secondaryShade + 102);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}