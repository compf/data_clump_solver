package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final String themeName;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int plainStyle, int boldStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontFamily, plainStyle, largeSize);
        systemFont = new FontUIResource(systemFontFamily, plainStyle, largeSize);
        windowTitleFont = new FontUIResource(controlFontFamily, boldStyle, largeSize);
        userFont = new FontUIResource(controlFontFamily, plainStyle, largeSize);
        smallFont = new FontUIResource(systemFontFamily, plainStyle, smallSize);
        themeName = largeSize > 14 ? "Very Large Fonts" : "Large Fonts";
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public String getThemeName() {
        return themeName;
    }
}