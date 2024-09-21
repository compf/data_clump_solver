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
        controlFont = new FontUIResource(font);
        systemFont = new FontUIResource(font);
        windowTitleFont = new FontUIResource(font);
        userFont = new FontUIResource(font);
        smallFont = new FontUIResource(font);
    }

    // Getters for the fonts
}
