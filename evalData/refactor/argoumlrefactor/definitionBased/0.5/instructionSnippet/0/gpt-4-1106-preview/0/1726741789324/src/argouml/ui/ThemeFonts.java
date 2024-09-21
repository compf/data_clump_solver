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
        this.controlFont = new FontUIResource("Dialog", Font.BOLD, 12);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, 12);
        this.windowTitleFont = new FontUIResource("Dialog", Font.BOLD, 12);
        this.userFont = new FontUIResource("Dialog", Font.PLAIN, 12);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, 10);
    }

    // Getters for each font
}