package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;
    private FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontName, int controlFontStyle, int controlFontSize, String systemFontName, int systemFontStyle, int systemFontSize, String smallFontName, int smallFontStyle, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        smallFont = new FontUIResource(smallFontName, smallFontStyle, smallFontSize);
        // Add initialization for userFont and windowTitleFont
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
