package org.argouml.ui;
import java.awt.Font;
import javax.swing.plaf.FontUIResource;

public class ThemeFonts {
  private FontUIResource controlFont;
  private FontUIResource systemFont;
  private FontUIResource windowTitleFont;
  private FontUIResource userFont;
  private FontUIResource smallFont;

  public ThemeFonts(String controlFontFamily, String systemFontFamily, int fontSize, int smallFontSize) {
    this.controlFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
    this.systemFont = new FontUIResource(systemFontFamily, Font.PLAIN, fontSize);
    this.windowTitleFont = new FontUIResource(controlFontFamily, Font.BOLD, fontSize);
    this.userFont = new FontUIResource(controlFontFamily, Font.PLAIN, fontSize);
    this.smallFont = new FontUIResource(systemFontFamily, Font.PLAIN, smallFontSize);
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
