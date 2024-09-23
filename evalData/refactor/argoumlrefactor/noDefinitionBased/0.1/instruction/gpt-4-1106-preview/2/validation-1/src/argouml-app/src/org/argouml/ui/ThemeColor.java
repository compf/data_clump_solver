import javax.swing.plaf.ColorUIResource;

public class ThemeColor {
    private ColorUIResource color1;
    private ColorUIResource color2;
    private ColorUIResource color3;

    public ThemeColor(int shade1, int shade2, int shade3) {
        color1 = new ColorUIResource(shade1, shade1, shade1);
        color2 = new ColorUIResource(shade2, shade2, shade2);
        color3 = new ColorUIResource(shade3, shade3, shade3);
    }

    public ColorUIResource getColor1() {
        return color1;
    }

    public ColorUIResource getColor2() {
        return color2;
    }

    public ColorUIResource getColor3() {
        return color3;
    }
}