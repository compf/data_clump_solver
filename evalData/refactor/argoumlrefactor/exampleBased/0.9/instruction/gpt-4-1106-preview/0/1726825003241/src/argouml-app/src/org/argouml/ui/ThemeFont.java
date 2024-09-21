package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource windowTitleFont;
    private FontUIResource smallFont;

    public ThemeFont(String controlFontName, int controlFontStyle, int controlFontSize,
                     String systemFontName, int systemFontStyle, int systemFontSize,
                     String windowTitleFontName, int windowTitleFontStyle, int windowTitleFontSize,
                     String userFontName, int userFontStyle, int userFontSize,
                     String smallFontName, int smallFontStyle, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        userFont = new FontUIResource(userFontName, userFontStyle, userFontSize);
        windowTitleFont = new FontUIResource(windowTitleFontName, windowTitleFontStyle, windowTitleFontSize);
        smallFont = new FontUIResource(smallFontName, smallFontStyle, smallFontSize);
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

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}