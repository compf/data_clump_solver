public class ThemeColors {

    private final ColorUIResource primary1, primary2, primary3;
    private final ColorUIResource secondary1, secondary2, secondary3;

    public ThemeColors(int primary, int secondary) {
        primary1 = new ColorUIResource(primary, primary, primary + 51);
        primary2 = new ColorUIResource(primary + 51, primary + 51, primary + 51 + 51);
        primary3 = new ColorUIResource(primary + 51 + 51, primary + 51 + 51, primary + 51 + 51 + 51);
        secondary1 = new ColorUIResource(secondary, secondary, secondary);
        secondary2 = new ColorUIResource(secondary + 51, secondary + 51, secondary + 51);
        secondary3 = new ColorUIResource(secondary + 51 + 51, secondary + 51 + 51, secondary + 51 + 51);
    }

    // Getter methods for primary colors
    public ColorUIResource getPrimary1() { return primary1; }
    public ColorUIResource getPrimary2() { return primary2; }
    public ColorUIResource getPrimary3() { return primary3; }

    // Getter methods for secondary colors
    public ColorUIResource getSecondary1() { return secondary1; }
    public ColorUIResource getSecondary2() { return secondary2; }
    public ColorUIResource getSecondary3() { return secondary3; }
}