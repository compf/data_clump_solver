package org.argouml.activity2.diagram;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFont(String controlFontName, int controlFontStyle, int controlFontSize,
                     String systemFontName, int systemFontStyle, int systemFontSize,
                     String windowTitleFontName, int windowTitleFontStyle, int windowTitleFontSize) {
        this.controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        this.windowTitleFont = new FontUIResource(windowTitleFontName, windowTitleFontStyle, windowTitleFontSize);
        this.userFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        this.smallFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize - 2);
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
