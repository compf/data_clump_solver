package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;
    public final FontUIResource windowTitleFont;

    public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
        this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
        this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
    }
}
