package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontSet {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontSet(int controlAndUserFontSize, int smallFontSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, controlAndUserFontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, controlAndUserFontSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, controlAndUserFontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, controlAndUserFontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
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