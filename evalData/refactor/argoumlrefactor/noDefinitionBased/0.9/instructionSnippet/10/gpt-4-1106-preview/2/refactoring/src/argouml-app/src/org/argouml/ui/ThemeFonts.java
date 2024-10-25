package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font controlAndUserFont, Font smallFontStyle, int baseFontSize) {
        controlFont = new FontUIResource(controlAndUserFont.deriveFont(Font.PLAIN, baseFontSize));
        systemFont = new FontUIResource("Dialog", Font.PLAIN, baseFontSize);
        windowTitleFont = new FontUIResource(controlAndUserFont.deriveFont(Font.BOLD, baseFontSize));
        userFont = new FontUIResource(controlAndUserFont.deriveFont(Font.PLAIN, baseFontSize));
        smallFont = new FontUIResource(smallFontStyle.deriveFont(Font.PLAIN, baseFontSize - 2));
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
}