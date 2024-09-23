package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFont(Font control, Font system, Font windowTitle, int smallFontSize) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(system);
        windowTitleFont = new FontUIResource(windowTitle);
        userFont = new FontUIResource(control);
        smallFont = new FontUIResource(system.getName(), system.getStyle(), smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}