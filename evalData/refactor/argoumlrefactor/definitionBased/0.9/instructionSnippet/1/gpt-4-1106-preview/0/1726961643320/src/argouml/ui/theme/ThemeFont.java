package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFont {
    public final FontUIResource controlFont;
    public final FontUIResource systemFont;
    public final FontUIResource windowTitleFont;
    public final FontUIResource userFont;
    public final FontUIResource smallFont;

    public ThemeFont(int size) {
        this.controlFont = new FontUIResource("SansSerif", Font.BOLD, size);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, size);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, size);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, size);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, size - 2);
    }

    public ThemeFont() {
        this(14);
    }
}