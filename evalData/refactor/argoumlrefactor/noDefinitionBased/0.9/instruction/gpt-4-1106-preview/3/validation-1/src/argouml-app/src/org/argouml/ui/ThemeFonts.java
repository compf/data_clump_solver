package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, String smallFontName, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, largeSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, largeSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.smallFont = new FontUIResource(smallFontName, Font.PLAIN, smallSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
