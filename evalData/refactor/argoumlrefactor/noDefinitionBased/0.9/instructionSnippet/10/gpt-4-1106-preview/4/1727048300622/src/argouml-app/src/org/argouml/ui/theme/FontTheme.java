package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme(int controlFontStyle, int controlFontSize, int windowTitleFontStyle, int smallFontSize) {
        controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, controlFontSize);
        windowTitleFont = new FontUIResource("SansSerif", windowTitleFontStyle, controlFontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, controlFontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    // Additional methods like getters can be added here if needed
}