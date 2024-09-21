package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlAndUserFontFamily, int controlAndUserFontSize, String systemAndSmallFontFamily, int smallFontSize) {
        this.controlFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.systemFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.windowTitleFont = new FontUIResource(controlAndUserFontFamily, Font.BOLD, controlAndUserFontSize);
        this.userFont = new FontUIResource(controlAndUserFontFamily, Font.PLAIN, controlAndUserFontSize);
        this.smallFont = new FontUIResource(systemAndSmallFontFamily, Font.PLAIN, smallFontSize);
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
