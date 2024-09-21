package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int size, String controlFontName, String systemFontName) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, size);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, size);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, size);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, size);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, size - 2);
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
