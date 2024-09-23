import javax.swing.plaf.FontUIResource;
import java.awt.Font;

public class ThemeFonts {

    private FontUIResource controlFont;
    private FontUIResource systemFont;
    private FontUIResource windowTitleFont;
    private FontUIResource userFont;
    private FontUIResource smallFont;

    public ThemeFonts(Font control, Font system, Font windowTitle, Font user, Font small) {
        controlFont = new FontUIResource(control);
        systemFont = new FontUIResource(system);
        windowTitleFont = new FontUIResource(windowTitle);
        userFont = new FontUIResource(user);
        smallFont = new FontUIResource(small);
    }

    public FontUIResource getControlFont() {
        return controlFont;
    }

    public FontUIResource getSystemFont() {
        return systemFont;
    }

    public FontUIResource getWindowTitleFont() {
        return windowTitleFont;
    }

    public FontUIResource getUserFont() {
        return userFont;
    }

    public FontUIResource getSmallFont() {
        return smallFont;
    }
}