package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlTextFont;
    private final FontUIResource systemTextFont;
    private final FontUIResource userTextFont;
    private final FontUIResource smallTextFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        controlTextFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemTextFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userTextFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallTextFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlTextFont() {
        return controlTextFont;
    }

    public FontUIResource getSystemTextFont() {
        return systemTextFont;
    }

    public FontUIResource getUserTextFont() {
        return userTextFont;
    }

    public FontUIResource getSmallTextFont() {
        return smallTextFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}