package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}