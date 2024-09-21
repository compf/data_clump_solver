package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class JasonsThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public JasonsThemeFonts(int plainStyle, int boldStyle, int largeSize, int smallSize) {
        this.controlFont = new FontUIResource("SansSerif", plainStyle, largeSize);
        this.systemFont = new FontUIResource("Dialog", plainStyle, largeSize);
        this.windowTitleFont = new FontUIResource("SansSerif", boldStyle, largeSize);
        this.userFont = new FontUIResource("SansSerif", plainStyle, largeSize);
        this.smallFont = new FontUIResource("Dialog", plainStyle, smallSize);
    }

    // Getters for fonts
    // Additional functionality or business logic could be added here
}