package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String windowFontName, String systemFontName, int controlFontSize, int windowFontSize, int systemFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        this.windowTitleFont = new FontUIResource(windowFontName, Font.BOLD, windowFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, systemFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // getters and other methods
}