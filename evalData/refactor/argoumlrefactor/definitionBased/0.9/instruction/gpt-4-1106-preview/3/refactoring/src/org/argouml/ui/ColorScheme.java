package org.argouml.ui;

import javax.swing.plaf.ColorUIResource;

public class ColorScheme {

    private final ColorUIResource primaryLight;
    private final ColorUIResource primaryMedium;
    private final ColorUIResource primaryDark;

    public ColorScheme(int primaryLightShade, int primaryMediumShade, int primaryDarkShade) {
        primaryLight = new ColorUIResource(primaryLightShade, primaryLightShade, primaryDarkShade);
        primaryMedium = new ColorUIResource(primaryMediumShade, primaryMediumShade, primaryDarkShade);
        primaryDark = new ColorUIResource(primaryDarkShade, primaryDarkShade, primaryDarkShade);
    }

    public ColorUIResource getPrimaryLight() {
        return primaryLight;
    }

    public ColorUIResource getPrimaryMedium() {
        return primaryMedium;
    }

    public ColorUIResource getPrimaryDark() {
        return primaryDark;
    }
}
