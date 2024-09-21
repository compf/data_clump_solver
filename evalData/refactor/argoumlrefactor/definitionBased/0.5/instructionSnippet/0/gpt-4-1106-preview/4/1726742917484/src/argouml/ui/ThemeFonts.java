package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts() {
        Font font = new Font("Dialog", Font.PLAIN, 12);
        this.controlFont = new FontUIResource(font);
        this.systemFont = new FontUIResource(font);
        this.windowTitleFont = new FontUIResource(font);
        this.userFont = new FontUIResource(font);
        this.smallFont = new FontUIResource(font);
    }

    // Getters for all fonts
}
