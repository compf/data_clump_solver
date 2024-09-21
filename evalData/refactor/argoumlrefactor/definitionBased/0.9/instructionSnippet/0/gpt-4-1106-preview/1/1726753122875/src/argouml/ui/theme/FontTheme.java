package org.argouml.ui.theme;

import javax.swing.plaf.FontUIResource;

public class FontTheme {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme() {
        /* Initialize fonts as per the original theme specifics... */
        controlFont = ...
        systemFont = ...
        windowTitleFont = ...
        userFont = ...
        smallFont = ...
    }

    /* Additional functionality to manage fonts could be added here */

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}
