package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFont(String controlFontName, String systemFontName, int fontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize - 2);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}