package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int controlFontStyle, int controlFontSize, int titleFontStyle, int titleFontSize, int smallFontStyle, int smallFontSize) {
        this.controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource("Dialog", controlFontStyle, controlFontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", titleFontStyle, titleFontSize);
        this.userFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.smallFont = new FontUIResource("Dialog", smallFontStyle, smallFontSize);
    }

    // Getters and potentially other methods
}