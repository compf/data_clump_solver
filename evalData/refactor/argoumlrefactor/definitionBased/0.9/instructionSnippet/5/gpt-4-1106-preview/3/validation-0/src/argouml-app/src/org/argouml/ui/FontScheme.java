package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontScheme {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontScheme(String controlFontName, String systemFontName, int largeSize, int smallSize) {
        controlFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        systemFont = new FontUIResource(systemFontName, Font.PLAIN, largeSize);
        windowTitleFont = new FontUIResource(controlFontName, Font.BOLD, largeSize);
        userFont = new FontUIResource(controlFontName, Font.PLAIN, largeSize);
        smallFont = new FontUIResource(systemFontName, Font.PLAIN, smallSize);
    }

    // Getters and other methods...
}