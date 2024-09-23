package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontSet {

    private final FontUIResource controlFont, systemFont, userFont, smallFont, windowTitleFont;

    public ThemeFontSet(String controlName, String systemName, int controlStyle, int systemStyle, int controlSize, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, systemStyle, controlSize);
        userFont = new FontUIResource(controlName, controlStyle, controlSize);
        smallFont = new FontUIResource(systemName, systemStyle, smallSize);
        windowTitleFont = new FontUIResource(controlName, Font.BOLD, controlSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
