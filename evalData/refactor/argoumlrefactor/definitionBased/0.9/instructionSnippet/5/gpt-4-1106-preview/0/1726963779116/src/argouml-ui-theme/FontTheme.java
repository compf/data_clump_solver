package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme(int fontStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        systemFont = new FontUIResource("Dialog", fontStyle, largeSize);
        windowTitleFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        userFont = new FontUIResource("SansSerif", fontStyle, largeSize);
        smallFont = new FontUIResource("Dialog", fontStyle, smallSize);
    }

    // Public getters for fonts may be added here as needed or other methods interacting with the theme fonts.
}