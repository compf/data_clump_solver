package org.argouml.ui.themes;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class ThemeColorsFonts {

    private final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    private final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    private final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);

    private final ColorUIResource secondary1 = new ColorUIResource(102, 102, 102);
    private final ColorUIResource secondary2 = new ColorUIResource(153, 153, 153);
    private final ColorUIResource secondary3 = new ColorUIResource(204, 204, 204);

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeColorsFonts(int mainFontSize, int smallFontSize) {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, mainFontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, mainFontSize);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, mainFontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, mainFontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    // Getters for ColorUIResource and FontUIResource fields
    // ... 
}
