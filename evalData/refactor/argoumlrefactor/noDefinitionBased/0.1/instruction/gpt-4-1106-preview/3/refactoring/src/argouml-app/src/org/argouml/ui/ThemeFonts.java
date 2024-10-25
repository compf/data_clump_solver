package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int plainStyle, int boldStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, plainStyle, largeSize);
        systemFont = new FontUIResource(systemFamily, plainStyle, largeSize);
        windowTitleFont = new FontUIResource(controlFamily, boldStyle, largeSize);
        userFont = new FontUIResource(controlFamily, plainStyle, largeSize);
        smallFont = new FontUIResource(systemFamily, plainStyle, smallSize);
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

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}
