package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int largeFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, largeFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeFontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, largeFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, largeFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    // getters
}
