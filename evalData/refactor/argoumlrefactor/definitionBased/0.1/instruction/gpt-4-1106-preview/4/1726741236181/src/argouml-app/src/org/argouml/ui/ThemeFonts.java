package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int plainStyle, int boldStyle) {
        controlFont = new FontUIResource(controlFontName, plainStyle, fontSize);
        systemFont = new FontUIResource(systemFontName, plainStyle, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, boldStyle, fontSize);
        userFont = new FontUIResource(controlFontName, plainStyle, fontSize);
        smallFont = new FontUIResource(systemFontName, plainStyle, fontSize - 2);
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
