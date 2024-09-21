package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(Font control, Font system, Font user, Font small, Font windowTitle) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(system);
        userFont = new FontUIResource(user);
        smallFont = new FontUIResource(small);
        windowTitleFont = new FontUIResource(windowTitle);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getMenuTextFont() { return controlFont; }
    public FontUIResource getSubTextFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
