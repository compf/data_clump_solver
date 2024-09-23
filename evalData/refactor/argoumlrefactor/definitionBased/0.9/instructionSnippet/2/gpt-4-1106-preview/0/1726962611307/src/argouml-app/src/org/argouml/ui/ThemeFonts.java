package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFamily, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFamily, Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFamily, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallFontSize);
    }

    // Getters
}