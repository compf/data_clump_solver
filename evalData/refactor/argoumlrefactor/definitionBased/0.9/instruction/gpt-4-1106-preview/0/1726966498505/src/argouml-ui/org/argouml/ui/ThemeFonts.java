package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font regularFont, Font smallFont) {
        this.controlFont = new FontUIResource(regularFont.getFamily(), Font.PLAIN, regularFont.getSize());
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, regularFont.getSize());
        this.windowTitleFont = new FontUIResource(regularFont.getFamily(), Font.BOLD, regularFont.getSize());
        this.userFont = new FontUIResource(regularFont.getFamily(), Font.PLAIN, regularFont.getSize());
        this.smallFont = new FontUIResource(smallFont.getFamily(), Font.PLAIN, smallFont.getSize());
    }

    public FontUIResource getControlTextFont() {
        return controlFont;
    }

    public FontUIResource getSystemTextFont() {
        return systemFont;
    }

    public FontUIResource getUserTextFont() {
        return userFont;
    }

    public FontUIResource getMenuTextFont() {
        return controlFont;
    }

    public FontUIResource getSubTextFont() {
        return this.smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
