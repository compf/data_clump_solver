package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int regularSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", Font.PLAIN, regularSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, regularSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, regularSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, regularSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    // Getters for the fonts
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
