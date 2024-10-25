package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        this.controlFont = new FontUIResource(control);
        this.systemFont = new FontUIResource(system);
        this.windowTitleFont = new FontUIResource(windowTitle);
        this.userFont = new FontUIResource(user);
        this.smallFont = new FontUIResource(small);
    }

    // Getters for each font
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}