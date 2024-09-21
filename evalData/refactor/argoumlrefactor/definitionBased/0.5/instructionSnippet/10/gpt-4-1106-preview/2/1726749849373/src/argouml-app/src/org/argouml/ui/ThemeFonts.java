package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, mainFontSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, mainFontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    // getters...
}