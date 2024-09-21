package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int size, String sansSerif, String dialog, int style) {
        controlFont = new FontUIResource(sansSerif, style, size);
        systemFont = new FontUIResource(dialog, Font.PLAIN, size);
        windowTitleFont = new FontUIResource(sansSerif, Font.BOLD, size);
        userFont = new FontUIResource(sansSerif, style, size);
        smallFont = new FontUIResource(dialog, Font.PLAIN, size - 2);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
}