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

    // Getters for each field
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
    public FontUIResource getControlTextFont() { return controlFont; }
    public FontUIResource getSystemTextFont() { return systemFont; }
    public FontUIResource getUserTextFont() { return userFont; }
    public FontUIResource getMenuTextFont() { return controlFont; }
    public FontUIResource getSubTextFont() { return smallFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
}
