package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font controlFont, Font systemFont) {
        this.controlFont = new FontUIResource(controlFont);
        this.systemFont = new FontUIResource(systemFont);
        this.windowTitleFont = new FontUIResource(controlFont.deriveFont(Font.BOLD));
        this.userFont = new FontUIResource(controlFont);
        this.smallFont = new FontUIResource(systemFont.deriveFont(systemFont.getSize() - 2.0f));
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
