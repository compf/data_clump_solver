public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;
    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primary, int secondary, int tertiary) {
        this.primary1 = new ColorUIResource(primary, primary, tertiary);
        this.primary2 = new ColorUIResource(secondary, secondary, tertiary + 51);
        this.primary3 = new ColorUIResource(tertiary, tertiary, tertiary + 102);
        this.secondary1 = new ColorUIResource(primary, primary, primary);
        this.secondary2 = new ColorUIResource(secondary, secondary, secondary);
        this.secondary3 = new ColorUIResource(tertiary, tertiary, tertiary);
    }

    // Getters for all colors
}