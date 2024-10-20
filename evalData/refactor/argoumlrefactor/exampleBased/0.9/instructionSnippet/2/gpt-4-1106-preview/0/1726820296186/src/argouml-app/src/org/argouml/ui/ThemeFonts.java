package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int mainFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, mainFontSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, mainFontSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, mainFontSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}