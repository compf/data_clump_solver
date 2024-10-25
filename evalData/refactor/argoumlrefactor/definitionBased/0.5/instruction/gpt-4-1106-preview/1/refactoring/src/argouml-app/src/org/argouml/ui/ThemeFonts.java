package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, String windowTitleFontFamily, String userFontFamily, int controlFontSize, int systemFontSize, int windowTitleFontSize, int userFontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, controlFontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, systemFontSize);
        this.windowTitleFont = new FontUIResource(windowTitleFontFamily, Font.BOLD, windowTitleFontSize);
        this.userFont = new FontUIResource(userFontFamily, Font.PLAIN, userFontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
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
