package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }
    // Getters and possibly other methods...
}