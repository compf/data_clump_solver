package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

/**
 * A class to hold theme font settings.
 */
public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;

    public ThemeFonts(String controlFontName, String systemFontName, int size) {
        this(controlFontName, systemFontName, size, Font.PLAIN);
    }

    public ThemeFonts(String controlFontName, String systemFontName, int size, int style) {
        controlFont = new FontUIResource(controlFontName, style, size);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, size);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, size);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, size);
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

    public FontUIResource createFontForSize(int size) {
        return new FontUIResource(systemFont.getName(), Font.PLAIN, size);
    }
}
