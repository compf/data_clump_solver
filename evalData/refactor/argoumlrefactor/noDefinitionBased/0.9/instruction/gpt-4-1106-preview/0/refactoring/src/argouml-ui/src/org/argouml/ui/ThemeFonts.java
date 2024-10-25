public class ThemeFonts {

    private final FontUIResource controlFont;
    private final FontUIResource systemFont;
    private final FontUIResource windowTitleFont;
    private final FontUIResource userFont;
    private final FontUIResource smallFont;

    public ThemeFonts() {
        controlFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
        systemFont = new FontUIResource("Dialog", Font.PLAIN, 14);
        windowTitleFont = new FontUIResource("SansSerif", Font.BOLD, 14);
        userFont = new FontUIResource("SansSerif", Font.PLAIN, 14);
        smallFont = new FontUIResource("Dialog", Font.PLAIN, 12);
    }

    // Additional methods here
}