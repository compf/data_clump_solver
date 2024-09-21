package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}