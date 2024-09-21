package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private FontUIResource controlFont, systemFont, windowTitleFont, userFont, smallFont;

    public ThemeFont(int mainSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, mainSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, mainSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}