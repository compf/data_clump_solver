package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String primaryFontName, String secondaryFontName, int fontSizeLarge, int fontSizeSmall) {
        controlFont = new FontUIResource(primaryFontName, Font.BOLD, fontSizeLarge);
        systemFont = new FontUIResource(secondaryFontName, Font.PLAIN, fontSizeLarge);
        windowTitleFont = new FontUIResource(primaryFontName, Font.BOLD, fontSizeLarge);
        userFont = new FontUIResource(primaryFontName, Font.PLAIN, fontSizeLarge);
        smallFont = new FontUIResource(secondaryFontName, Font.PLAIN, fontSizeSmall);
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