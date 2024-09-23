package org.argouml.ui;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(int plainStyle, int boldStyle, int largeSize, int smallSize) {
        controlFont = new FontUIResource("SansSerif", plainStyle, largeSize);
        systemFont = new FontUIResource("Dialog", plainStyle, largeSize);
        windowTitleFont = new FontUIResource("SansSerif", boldStyle, largeSize);
        userFont = new FontUIResource("SansSerif", plainStyle, largeSize);
        smallFont = new FontUIResource("Dialog", plainStyle, smallSize);
    }

    // Getters and logic related to fonts could be added here
}
