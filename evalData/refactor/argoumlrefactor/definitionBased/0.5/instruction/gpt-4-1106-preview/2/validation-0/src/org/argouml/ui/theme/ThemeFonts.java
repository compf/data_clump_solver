package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int plainStyle, int boldStyle) {
        controlFont = new FontUIResource(controlFontFamily, plainStyle, fontSize);
        systemFont = new FontUIResource(systemFontFamily, plainStyle, fontSize);
        userFont = new FontUIResource(controlFontFamily, plainStyle, fontSize);
        smallFont = new FontUIResource(systemFontFamily, plainStyle, fontSize - 2);
        windowTitleFont = new FontUIResource(controlFontFamily, boldStyle, fontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}