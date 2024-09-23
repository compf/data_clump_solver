package org.argouml.ui.theme;

import java.awt.Font;
import javax.swing.plaf.ColorUIResource;
import javax.swing.plaf.FontUIResource;

public class FontTheme {

    private final ColorUIResource primary1 = new ColorUIResource(102, 102, 153);
    private final ColorUIResource primary2 = new ColorUIResource(153, 153, 204);
    private final ColorUIResource primary3 = new ColorUIResource(204, 204, 255);
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public FontTheme(int controlFontStyle, int controlFontSize, int windowTitleFontStyle, int smallFontSize) {
        controlFont = new FontUIResource("SansSerif", controlFontStyle, controlFontSize);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, controlFontSize);
        windowTitleFont = new FontUIResource("SansSerif", windowTitleFontStyle, controlFontSize);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, controlFontSize);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, smallFontSize);
    }

    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }

    // Additional methods like getters can be added here if needed
}