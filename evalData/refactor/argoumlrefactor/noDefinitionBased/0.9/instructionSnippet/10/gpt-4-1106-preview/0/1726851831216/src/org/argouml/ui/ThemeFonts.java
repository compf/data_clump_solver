package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int regularFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, regularFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, regularFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, regularFontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, regularFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // Accessor methods for all fonts...
}