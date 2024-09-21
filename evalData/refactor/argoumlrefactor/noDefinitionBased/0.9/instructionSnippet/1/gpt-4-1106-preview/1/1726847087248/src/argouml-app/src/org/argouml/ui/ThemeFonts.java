package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(int controlFontStyle, int controlFontSize, int windowTitleFontStyle, int windowTitleFontSize, int smallFontStyle, int smallFontSize) {
        this.controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, controlFontSize);
        this.windowTitleFont = new FontUIResource("SansSerif", windowTitleFontStyle, windowTitleFontSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, controlFontSize);
        this.smallFont = new FontUIResource("Dialog", smallFontStyle, smallFontSize);
    }
}
