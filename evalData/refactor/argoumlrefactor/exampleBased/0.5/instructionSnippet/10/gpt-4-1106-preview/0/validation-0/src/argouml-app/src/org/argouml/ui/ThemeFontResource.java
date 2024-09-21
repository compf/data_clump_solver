package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResource {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResource(int fontStyle, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        this.systemFont = new FontUIResource("Dialog", fontStyle, largeSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, largeSize);
        this.userFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        this.smallFont = new FontUIResource("Dialog", fontStyle, smallSize);
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