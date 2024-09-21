package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, fontSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    // Additional functionality or getters can be added here
}