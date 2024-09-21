package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontResources {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontResources(String controlFontFamily, String systemFontFamily, int fontStyle, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, fontStyle, fontSize);
        this.systemFont = new FontUIResource(systemFontFamily, fontStyle, fontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(controlFontFamily, fontStyle, fontSize);
        this.smallFont = new FontUIResource(systemFontFamily, fontStyle, smallFontSize);
    }

    // Add getters for font resources

}