package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, int controlFontStyle, int controlFontSize, String systemFontFamily, int systemFontStyle, int systemFontSize, String windowTitleFontFamily, int windowTitleFontStyle, int windowTitleFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource(systemFontFamily, systemFontStyle, systemFontSize);
        this.windowTitleFont = new FontUIResource(windowTitleFontFamily, windowTitleFontStyle, windowTitleFontSize);
        this.userFont = new FontUIResource(controlFontFamily, controlFontStyle, controlFontSize);
        this.smallFont = new FontUIResource(systemFontFamily, systemFontStyle, systemFontSize);
    }

    // Getters for all fonts
}
