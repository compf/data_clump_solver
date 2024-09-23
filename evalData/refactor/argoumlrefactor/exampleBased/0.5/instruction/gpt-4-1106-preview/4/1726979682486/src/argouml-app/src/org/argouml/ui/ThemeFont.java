package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(String controlFontName, String systemFontName, int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, mainFontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, mainFontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}
