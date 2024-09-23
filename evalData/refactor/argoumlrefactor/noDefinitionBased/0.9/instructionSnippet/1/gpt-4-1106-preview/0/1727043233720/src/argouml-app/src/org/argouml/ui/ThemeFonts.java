package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlName, String systemName, int mainSize, int smallSize) {
        this.controlFont = new FontUIResource(controlName, Font.PLAIN, mainSize);
        this.systemFont = new FontUIResource(systemName, Font.PLAIN, mainSize);
        this.windowTitleFont = new FontUIResource(controlName, Font.BOLD, mainSize);
        this.userFont = new FontUIResource(controlName, Font.PLAIN, mainSize);
        this.smallFont = new FontUIResource(systemName, Font.PLAIN, smallSize);
    }

    // Add getters for the fonts here
}