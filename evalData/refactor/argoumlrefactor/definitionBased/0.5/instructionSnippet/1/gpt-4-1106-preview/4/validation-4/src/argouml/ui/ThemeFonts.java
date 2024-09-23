package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String systemFontName, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlTextFont() { return controlFont; }
    public FontUIResource getSystemTextFont() { return systemFont; }
    public FontUIResource getUserTextFont() { return userFont; }
    public FontUIResource getMenuTextFont() { return controlFont; }
    public FontUIResource getSubTextFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
