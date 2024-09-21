package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String control, String system, int controlSize, int smallSize) {
        controlFont = new FontUIResource(control, Font.PLAIN, controlSize);
        systemFont = new FontUIResource(system, Font.PLAIN, controlSize);
        userFont = new FontUIResource(control, Font.PLAIN, controlSize);
        smallFont = new FontUIResource(system, Font.PLAIN, smallSize);
        windowTitleFont = new FontUIResource(control, Font.BOLD, controlSize);
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

    public FontUIResource getSmallFont() {
        return smallFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }
}
