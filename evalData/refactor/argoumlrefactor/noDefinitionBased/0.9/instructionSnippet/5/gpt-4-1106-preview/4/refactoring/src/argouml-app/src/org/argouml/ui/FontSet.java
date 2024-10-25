package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontSet {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontSet(String controlFontName, String systemFontName, int regularSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, regularSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, regularSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, regularSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, regularSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
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
