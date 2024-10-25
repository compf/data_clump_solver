package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource titleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int fontSize, int smallFontSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, fontSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, fontSize);
        titleFont = new FontUIResource(controlFamily, Font.BOLD, fontSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, fontSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallFontSize);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getTitleFont() {
        return titleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}