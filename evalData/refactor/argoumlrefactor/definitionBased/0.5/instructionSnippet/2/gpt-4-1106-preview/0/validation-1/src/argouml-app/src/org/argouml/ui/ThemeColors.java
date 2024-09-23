package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryShade, int secondaryShade, int tertiaryShade) {
        primary1 = new ColorUIResource(primaryShade, primaryShade, tertiaryShade);
        primary2 = new ColorUIResource(secondaryShade, secondaryShade, tertiaryShade);
        primary3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);

        secondary1 = new ColorUIResource(primaryShade, primaryShade, primaryShade);
        secondary2 = new ColorUIResource(secondaryShade, secondaryShade, secondaryShade);
        secondary3 = new ColorUIResource(tertiaryShade, tertiaryShade, tertiaryShade);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}
