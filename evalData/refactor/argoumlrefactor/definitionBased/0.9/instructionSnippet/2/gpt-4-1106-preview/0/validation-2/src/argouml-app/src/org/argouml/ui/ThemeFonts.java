package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int fontStyle, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(fontName, fontStyle, fontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    // Getters...
}
public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String fontName, int fontStyle, int fontSize, int smallFontSize) {
        this.controlFont = new FontUIResource(fontName, fontStyle, fontSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, fontSize);
        this.windowTitleFont = new FontUIResource(fontName, Font.BOLD, fontSize);
        this.userFont = new FontUIResource(fontName, Font.PLAIN, fontSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }
    // Getters and other methods...
}