package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFont(FontUIResource cf, FontUIResource sf, FontUIResource wtf, FontUIResource uf, FontUIResource smf) {
        this.controlFont = cf;
        this.systemFont = sf;
        this.windowTitleFont = wtf;
        this.userFont = uf;
        this.smallFont = smf;
    }

    public FontUIResource getControlFont() { return controlFont; }

    public FontUIResource getSystemFont() { return systemFont; }

    public FontUIResource getWindowTitleFont() { return windowTitleFont; }

    public FontUIResource getUserFont() { return userFont; }

    public FontUIResource getSmallFont() { return smallFont; }
}