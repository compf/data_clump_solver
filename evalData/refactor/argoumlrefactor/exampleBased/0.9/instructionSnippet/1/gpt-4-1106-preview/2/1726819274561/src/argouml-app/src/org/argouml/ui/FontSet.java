package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class FontSet {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public FontSet(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // Getters for fonts
}
