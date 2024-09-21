package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int controlFontStyle, int controlFontSize, int systemFontStyle, int systemFontSize, int windowTitleFontStyle, int windowTitleFontSize, int userFontStyle, int userFontSize, int smallFontStyle, int smallFontSize) {
        this.controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource("Dialog", systemFontStyle, systemFontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", windowTitleFontStyle, windowTitleFontSize);
        this.userFont = new FontUIResource("SansSerif", userFontStyle, userFontSize);
        this.smallFont = new FontUIResource("Dialog", smallFontStyle, smallFontSize);
    }

    // Getters for each font
}