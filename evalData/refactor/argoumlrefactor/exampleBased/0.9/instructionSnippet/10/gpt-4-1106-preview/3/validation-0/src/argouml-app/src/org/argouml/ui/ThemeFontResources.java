package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFontResources(String controlName, String systemName, int controlStyle, int controlSize, int titleStyle, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, controlStyle, controlSize);
        windowTitleFont = new FontUIResource(controlName, titleStyle, controlSize);
        userFont = new FontUIResource(controlName, controlStyle, controlSize);
        smallFont = new FontUIResource(systemName, controlStyle, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}