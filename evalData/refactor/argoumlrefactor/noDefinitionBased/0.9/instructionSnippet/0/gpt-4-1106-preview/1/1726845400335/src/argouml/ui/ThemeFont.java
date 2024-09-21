package org.argouml.ui;

import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFont(String controlFontName, int controlFontSize, String systemFontName, int systemFontSize, String windowTitleFontName, int windowTitleFontSize, String userFontName, int userFontSize, String smallFontName, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, systemFontSize);
        windowTitleFont = new FontUIResource(windowTitleFontName, Font.BOLD, windowTitleFontSize);
        userFont = new FontUIResource(userFontName, Font.PLAIN, userFontSize);
        smallFont = new FontUIResource(smallFontName, Font.PLAIN, smallFontSize);
    }

    // Additional methods to work with fonts could be added here
}