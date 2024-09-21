package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontName, int controlFontStyle, int controlFontSize,
                      String systemFontName, int systemFontStyle, int systemFontSize,
                      String windowFontName, int windowFontStyle, int windowFontSize,
                      String userFontName, int userFontStyle, int userFontSize,
                      String smallFontName, int smallFontStyle, int smallFontSize) {
        controlFont = new FontUIResource(controlFontName, controlFontStyle, controlFontSize);
        systemFont = new FontUIResource(systemFontName, systemFontStyle, systemFontSize);
        windowTitleFont = new FontUIResource(windowFontName, windowFontStyle, windowFontSize);
        userFont = new FontUIResource(userFontName, userFontStyle, userFontSize);
        smallFont = new FontUIResource(smallFontName, smallFontStyle, smallFontSize);
    }

    // Getters and potentially other methods related to theme fonts.
}
