package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    final FontUIResource controlFont;
    final FontUIResource systemFont;
    final FontUIResource windowTitleFont;
    final FontUIResource userFont;
    final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String systemFamily, int controlStyle, int systemStyle, int controlSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFamily, controlStyle, controlSize);
        this.systemFont = new FontUIResource(systemFamily, systemStyle, controlSize);
        this.windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, controlSize);
        this.userFont = new FontUIResource(controlFamily, controlStyle, controlSize);
        this.smallFont = new FontUIResource(systemFamily, systemStyle, smallSize);
    }
}