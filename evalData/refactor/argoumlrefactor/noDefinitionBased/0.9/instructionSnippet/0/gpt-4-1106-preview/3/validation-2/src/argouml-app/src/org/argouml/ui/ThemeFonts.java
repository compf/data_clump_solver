package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontName, int controlFontStyle, int controlFontSize,
                      String systemFontName, int systemFontStyle, int systemFontSize,
                      String userFontName, int userFontStyle, int userFontSize,
                      String smallFontName, int smallFontStyle, int smallFontSize,
                      String windowTitleFontName, int windowTitleFontStyle, int windowTitleFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        userFont = new FontUIResource(userFontName, userFontStyle, userFontSize);
        smallFont = new FontUIResource(smallFontName, smallFontStyle, smallFontSize);
        windowTitleFont = new FontUIResource(windowTitleFontName, windowTitleFontStyle, windowTitleFontSize);
    }

    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
