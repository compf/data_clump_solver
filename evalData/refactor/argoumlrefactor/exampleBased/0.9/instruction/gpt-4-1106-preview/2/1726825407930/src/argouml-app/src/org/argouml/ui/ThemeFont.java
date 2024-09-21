package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(String mainFontName, String altFontName, int mainFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(mainFontName, Font.PLAIN, mainFontSize);
        this.systemFont = new FontUIResource(altFontName, Font.PLAIN, mainFontSize);
        this.windowTitleFont = new FontUIResource(mainFontName, Font.BOLD, mainFontSize);
        this.userFont = new FontUIResource(mainFontName, Font.PLAIN, mainFontSize);
        this.smallFont = new FontUIResource(altFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }

    public FontUIResource getSystemFont() { return systemFont; }

    public FontUIResource getUserFont() { return userFont; }

    public FontUIResource getSmallFont() { return smallFont; }

    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}