package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;
    private FontUIResource windowTitleFont;

    public ThemeFontResources(String controlFamily, String systemFamily, int normalSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, normalSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, normalSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, normalSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, normalSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
