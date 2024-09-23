package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class SecondaryColorScheme {
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public SecondaryColorScheme(int darkShade, int midShade, int lightShade) {
        secondary1 = new ColorUIResource(darkShade, darkShade, darkShade);
        secondary2 = new ColorUIResource(midShade, midShade, midShade);
        secondary3 = new ColorUIResource(lightShade, lightShade, lightShade);
    }

    public ColorUIResource getSecondary1() {
        return secondary1;
    }

    public ColorUIResource getSecondary2() {
        return secondary2;
    }

    public ColorUIResource getSecondary3() {
        return secondary3;
    }
}
