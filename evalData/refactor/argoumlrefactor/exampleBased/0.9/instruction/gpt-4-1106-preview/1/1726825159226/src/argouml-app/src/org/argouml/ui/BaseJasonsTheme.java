public abstract class BaseJasonsTheme extends MetalTheme {

    protected abstract String getName();

    protected ColorUIResource getPrimary1() { return new ColorUIResource(102, 102, 153); }
    protected ColorUIResource getPrimary2() { return new ColorUIResource(153, 153, 204); }
    protected ColorUIResource getPrimary3() { return new ColorUIResource(204, 204, 255); }

    protected ColorUIResource getSecondary1() { return new ColorUIResource(102, 102, 102); }
    protected ColorUIResource getSecondary2() { return new ColorUIResource(153, 153, 153); }
    protected ColorUIResource getSecondary3() { return new ColorUIResource(204, 204, 204); }
}