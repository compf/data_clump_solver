package org.argouml.ui;

import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;
    private FontUIResource windowTitleFont;

    public ThemeFonts(Font control, Font system, Font user, Font windowTitle, Font small) {
        this.controlFont = new FontUIResource(control);
        this.systemFont = new FontUIResource(system);
        this.userFont = new FontUIResource(user);
        this.windowTitleFont = new FontUIResource(windowTitle);
        this.smallFont = new FontUIResource(small);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
