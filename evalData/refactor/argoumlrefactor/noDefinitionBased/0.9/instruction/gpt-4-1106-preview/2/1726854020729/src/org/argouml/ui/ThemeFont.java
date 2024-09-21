package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(int mainSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, mainSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, mainSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    public FontUIResource getControlTextFont() { return controlFont; }
    public FontUIResource getSystemTextFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserTextFont() { return userFont; }
    public FontUIResource getSubTextFont() { return smallFont; }

    // Other utility methods can be added here if needed
}
