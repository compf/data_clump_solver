package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;
    private final FontUIResource windowTitleFont;

    public ThemeFonts(String fontName, int style, int size) {
        this.controlFont = new FontUIResource(new Font(fontName, style, size));
        this.systemFont = new FontUIResource(new Font(fontName, style, size));
        this.userFont = new FontUIResource(new Font(fontName, style, size));
        this.smallFont = new FontUIResource(new Font(fontName, style, size - 2));
        this.windowTitleFont = new FontUIResource(new Font(fontName, Font.BOLD, size));
    }

    // Getters
    // ...
}