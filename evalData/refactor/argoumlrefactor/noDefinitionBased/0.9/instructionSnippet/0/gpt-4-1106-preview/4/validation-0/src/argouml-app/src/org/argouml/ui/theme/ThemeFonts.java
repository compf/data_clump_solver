package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlName, int controlStyle, int controlSize, String systemName, int systemStyle, int systemSize, String windowName, int windowStyle, int windowSize, String userName, int userStyle, int userSize, String smallName, int smallStyle, int smallSize) {
        controlFont = new FontUIResource(controlName, controlStyle, controlSize);
        systemFont = new FontUIResource(systemName, systemStyle, systemSize);
        userFont = new FontUIResource(userName, userStyle, userSize);
        smallFont = new FontUIResource(smallName, smallStyle, smallSize);
        windowTitleFont = new FontUIResource(windowName, windowStyle, windowSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
