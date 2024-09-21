package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int controlStyle, int size, int titleStyle, int smallSize) {
        this.controlFont = new FontUIResource(controlFamily, controlStyle, size);
        this.systemFont = new FontUIResource(systemFamily, controlStyle, size);
        this.windowTitleFont = new FontUIResource(controlFamily, titleStyle, size);
        this.userFont = new FontUIResource(controlFamily, controlStyle, size);
        this.smallFont = new FontUIResource(systemFamily, controlStyle, smallSize);
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
