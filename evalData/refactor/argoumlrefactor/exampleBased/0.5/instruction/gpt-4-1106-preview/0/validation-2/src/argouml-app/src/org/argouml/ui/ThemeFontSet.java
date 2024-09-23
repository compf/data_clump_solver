

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFontSet {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFontSet(String controlFamily, String systemFamily, int regularSize, int smallSize) {
        controlFont = new FontUIResource(controlFamily, Font.PLAIN, regularSize);
        systemFont = new FontUIResource(systemFamily, Font.PLAIN, regularSize);
        windowTitleFont = new FontUIResource(controlFamily, Font.BOLD, regularSize);
        userFont = new FontUIResource(controlFamily, Font.PLAIN, regularSize);
        smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // Getters
    public FontUIResource getControlFont() { return controlFont; }
    public FontUIResource getSystemFont() { return systemFont; }
    public FontUIResource getWindowTitleFont() { return windowTitleFont; }
    public FontUIResource getUserFont() { return userFont; }
    public FontUIResource getSmallFont() { return smallFont; }

    // Additional functionality can be added here
}