package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, int controlFontStyle, int controlFontSize, String systemFontFamily, int systemFontStyle, int systemFontSize, String windowTitleFontFamily, int windowTitleFontStyle, int windowTitleFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource(systemFontFamily, systemFontStyle, systemFontSize);
        this.windowTitleFont = new FontUIResource(windowTitleFontFamily, windowTitleFontStyle, windowTitleFontSize);
        this.userFont = this.controlFont;
        this.smallFont = this.systemFont;
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getMenuFont() { return controlFont; }
}
