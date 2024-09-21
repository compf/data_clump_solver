package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme() {
        this.controlFont = new FontUIResource("SansSerif", Font.BOLD, 16);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, 16);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 16);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, 16);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, 14);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}
