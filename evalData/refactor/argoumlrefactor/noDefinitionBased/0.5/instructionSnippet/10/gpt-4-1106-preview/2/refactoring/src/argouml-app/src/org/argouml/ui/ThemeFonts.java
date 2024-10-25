package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, largeSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}