package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int plainStyle, int boldStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontName, plainStyle, largeSize);
        systemFont = new FontUIResource(systemFontName, plainStyle, largeSize);
        windowTitleFont = new FontUIResource(controlFontName, boldStyle, largeSize);
        userFont = new FontUIResource(controlFontName, plainStyle, largeSize);
        smallFont = new FontUIResource(systemFontName, plainStyle, smallSize);
    }

    // Getters for each font resource
}
