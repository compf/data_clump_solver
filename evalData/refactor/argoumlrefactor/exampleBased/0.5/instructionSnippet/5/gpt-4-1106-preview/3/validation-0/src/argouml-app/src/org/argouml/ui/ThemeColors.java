package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int primaryComponent, int secondaryComponent, int tertiaryComponent) {
        primary1 = new ColorUIResource(primaryComponent, primaryComponent, tertiaryComponent);
        primary2 = new ColorUIResource(secondaryComponent, secondaryComponent, tertiaryComponent);
        primary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent);

        secondary1 = new ColorUIResource(primaryComponent, primaryComponent, primaryComponent);
        secondary2 = new ColorUIResource(secondaryComponent, secondaryComponent, secondaryComponent);
        secondary3 = new ColorUIResource(tertiaryComponent, tertiaryComponent, tertiaryComponent);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}
