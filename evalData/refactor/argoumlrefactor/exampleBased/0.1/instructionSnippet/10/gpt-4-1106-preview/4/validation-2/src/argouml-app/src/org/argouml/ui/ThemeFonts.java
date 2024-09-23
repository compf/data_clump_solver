package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontName, String systemFontName, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeSize);
        this.userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        this.smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
        this.windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, largeSize);
    }

    public FontUIResource controlFont() { return controlFont; }
    public FontUIResource systemFont() { return systemFont; }
    public FontUIResource userFont() { return userFont; }
    public FontUIResource smallFont() { return smallFont; }
    public FontUIResource windowTitleFont() { return windowTitleFont; }
}
