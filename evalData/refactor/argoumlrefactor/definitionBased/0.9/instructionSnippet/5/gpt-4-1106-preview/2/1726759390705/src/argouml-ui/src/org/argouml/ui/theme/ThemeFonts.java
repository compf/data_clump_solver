package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, mainFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}