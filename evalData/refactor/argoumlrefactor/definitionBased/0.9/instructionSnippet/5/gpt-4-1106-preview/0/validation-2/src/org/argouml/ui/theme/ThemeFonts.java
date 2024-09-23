package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(int fontStyle, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        this.systemFont = new FontUIResource("Dialog", fontStyle, largeSize);
        this.userFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        this.smallFont = new FontUIResource("Dialog", fontStyle, smallSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, largeSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}