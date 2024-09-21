package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class FontSet {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontSet(int mainSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        this.systemFont = new FontUIResource("Dialog", Font.PLAIN, mainSize);
        this.windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, mainSize);
        this.userFont = new FontUIResource("SansSerif", Font.PLAIN, mainSize);
        this.smallFont = new FontUIResource("Dialog", Font.PLAIN, smallSize);
    }

    // Getters for the fonts can be added here
}
