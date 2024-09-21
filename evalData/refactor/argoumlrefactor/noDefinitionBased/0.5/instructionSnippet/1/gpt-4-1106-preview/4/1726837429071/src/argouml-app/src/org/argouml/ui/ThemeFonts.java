package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlName, String systemName, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlName, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemName, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlName, Font.BOLD, regularSize);
        userFont = new FontUIResource(controlName, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemName, Font.PLAIN, smallSize);
    }

    // Getters for fonts
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}