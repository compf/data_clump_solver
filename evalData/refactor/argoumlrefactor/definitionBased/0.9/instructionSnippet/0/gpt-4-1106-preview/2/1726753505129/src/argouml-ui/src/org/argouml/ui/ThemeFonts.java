package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(Font control, Font windowTitle, Font small) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(control);
        windowTitleFont = new FontUIResource(windowTitle);
        userFont = new FontUIResource(control);
        smallFont = new FontUIResource(small);
    }

    // Getter methods for fonts
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }

    // Additional functionality if required
}
