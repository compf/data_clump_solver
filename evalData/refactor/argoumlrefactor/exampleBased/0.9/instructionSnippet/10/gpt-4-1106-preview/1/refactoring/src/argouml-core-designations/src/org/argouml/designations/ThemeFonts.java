package org.argouml.designations;

import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts(String controlFamily, String windowFamily, String systemFamily, int controlSize, int windowSize, int systemSize, int userSize, int smallSize) {
        this.controlFont = new FontUIResource(controlFamily, Font.PLAIN, controlSize);
        this.windowTitleFont = new FontUIResource(windowFamily, Font.BOLD, windowSize);
        this.systemFont = new FontUIResource(systemFamily, Font.PLAIN, systemSize);
        this.userFont = new FontUIResource(controlFamily, Font.PLAIN, userSize);
        this.smallFont = new FontUIResource(systemFamily, Font.PLAIN, smallSize);
    }

    // getters for fonts omitted for brevity
}
