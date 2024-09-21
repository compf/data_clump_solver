public class ThemeColors {

    private final ColorUIResource primary1;
    private final ColorUIResource primary2;
    private final ColorUIResource primary3;

    private final ColorUIResource secondary1;
    private final ColorUIResource secondary2;
    private final ColorUIResource secondary3;

    public ThemeColors(int primaryShade, int secondaryShade, int tertiaryShade) {
        primary1 = new ColorUIResource(primaryShade, primaryShade, tertiaryShade + 51);
        primary2 = new ColorUIResource(primaryShade + 51, primaryShade + 51, tertiaryShade + 102);
        primary3 = new ColorUIResource(tertiaryShade + 102, tertiaryShade + 102, tertiaryShade + 153);

        secondary1 = new ColorUIResource(primaryShade, primaryShade, primaryShade);
        secondary2 = new ColorUIResource(primaryShade + 51, primaryShade + 51, primaryShade + 51);
        secondary3 = new ColorUIResource(tertiaryShade + 102, tertiaryShade + 102, tertiaryShade + 102);
    }

    // Additional methods to retrieve and manipulate colors could be added here
}
