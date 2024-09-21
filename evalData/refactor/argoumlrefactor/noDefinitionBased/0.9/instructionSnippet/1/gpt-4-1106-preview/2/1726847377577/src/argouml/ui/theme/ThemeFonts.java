package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(int controlFontStyle, int controlFontSize, int smallFontStyle, int smallFontSize) {
        this.controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource("Dialog", controlFontStyle, controlFontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.userFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.smallFont = new FontUIResource("Dialog", smallFontStyle, smallFontSize);
    }
}
