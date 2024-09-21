package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(String controlFontFamily, String systemFontFamily, int fontSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize - 2);
    }

    public FontUIResource getControlTextFont() { return controlFont; }

    public FontUIResource getSystemTextFont() { return systemFont; }

    public FontUIResource getWindowTitleFont() { return windowTitleFont; }

    public FontUIResource getUserTextFont() { return userFont; }

    public FontUIResource getSubTextFont() { return smallFont; }
}