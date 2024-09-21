package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontType, String systemFontType, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontType, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontType, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontType, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontType, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontType, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}