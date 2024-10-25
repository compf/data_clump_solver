package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlName, String systemName, int primarySize, int secondarySize) {
        controlFont = new FontUIResource(controlName, Font.PLAIN, primarySize);
        systemFont = new FontUIResource(systemName, Font.PLAIN, primarySize);
        windowTitleFont = new FontUIResource(controlName, Font.BOLD, primarySize);
        userFont = new FontUIResource(controlName, Font.PLAIN, primarySize);
        smallFont = new FontUIResource(systemName, Font.PLAIN, secondarySize);
    }

    // Getters for each font
}