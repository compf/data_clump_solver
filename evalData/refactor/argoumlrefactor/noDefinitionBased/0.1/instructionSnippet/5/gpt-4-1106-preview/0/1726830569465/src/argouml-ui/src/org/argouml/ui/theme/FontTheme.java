package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontTheme {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme(int regularSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", Font.PLAIN, regularSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, regularSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, regularSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, regularSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    // Getters and other methods if necessary
}
