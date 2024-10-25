package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int controlSize, int systemSize, int titleSize, int userSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, controlSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, systemSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, titleSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, userSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}