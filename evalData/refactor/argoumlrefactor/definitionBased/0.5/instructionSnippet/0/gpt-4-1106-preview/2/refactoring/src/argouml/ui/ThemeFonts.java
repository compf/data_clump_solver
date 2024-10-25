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
        controlFont = new FontUIResource("Dialog", Font.BOLD, 12);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, 10);
        windowTitleFont = new FontUIResource("Dialog", Font.BOLD, 12);
        userFont = new FontUIResource("Dialog", Font.PLAIN, 12);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, 10);
    }

    // Getters for all the fonts
}
