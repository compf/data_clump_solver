package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int mainFontSize, int smallFontSize, int controlFontStyle, int windowTitleFontStyle) {
        this.controlFont = new FontUIResource(controlFontFamily, controlFontStyle, mainFontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, mainFontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, windowTitleFontStyle, mainFontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, mainFontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
    }
}
