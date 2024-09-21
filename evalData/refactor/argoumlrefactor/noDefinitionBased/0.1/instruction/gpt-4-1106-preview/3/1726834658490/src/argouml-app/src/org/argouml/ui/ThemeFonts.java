package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int plainStyle, int boldStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontName, plainStyle, largeSize);
        systemFont = new FontUIResource(systemFontName, plainStyle, largeSize);
        windowTitleFont = new FontUIResource(controlFontName, boldStyle, largeSize);
        userFont = new FontUIResource(controlFontName, plainStyle, largeSize);
        smallFont = new FontUIResource(systemFontName, plainStyle, smallSize);
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
