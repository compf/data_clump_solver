package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class PrimaryColorScheme {
    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    public PrimaryColorScheme(int shade, int midShade, int lightShade) {
        primary1 = new ColorUIResource(shade, shade, midShade);
        primary2 = new ColorUIResource(midShade, midShade, lightShade);
        primary3 = new ColorUIResource(lightShade, lightShade, 255);
    }

    public ColorUIResource getPrimary1() {
        return primary1;
    }

    public ColorUIResource getPrimary2() {
        return primary2;
    }

    public ColorUIResource getPrimary3() {
        return primary3;
    }
}
