package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontSet {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontSet(String controlFontName, String systemFontName, int controlFontSize, int systemFontSize, int windowTitleFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, systemFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, windowTitleFontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, controlFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
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
