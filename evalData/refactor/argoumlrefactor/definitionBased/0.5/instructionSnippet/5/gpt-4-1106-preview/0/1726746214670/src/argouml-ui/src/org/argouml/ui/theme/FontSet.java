package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontSet {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontSet(String controlFamily, String systemFamily, int size, int smallSize) {
        this.controlFont = new FontUIResource(controlFamily, Font.PLAIN, size);
        this.systemFont = new FontUIResource(systemFamily, Font.PLAIN, size);
        this.windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, size);
        this.userFont = new FontUIResource(controlFamily, Font.PLAIN, size);
        this.smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
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