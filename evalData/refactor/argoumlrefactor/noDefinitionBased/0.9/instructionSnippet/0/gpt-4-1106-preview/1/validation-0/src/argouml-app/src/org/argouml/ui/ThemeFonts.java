package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFonts(FontUIResource controlAndSystemFont, FontUIResource windowTitleFont, FontUIResource smallFont) {
        this.controlFont = controlAndSystemFont;
        this.systemFont = controlAndSystemFont;
        this.windowTitleFont = windowTitleFont;
        this.userFont = controlAndSystemFont;
        this.smallFont = smallFont;
    }
}