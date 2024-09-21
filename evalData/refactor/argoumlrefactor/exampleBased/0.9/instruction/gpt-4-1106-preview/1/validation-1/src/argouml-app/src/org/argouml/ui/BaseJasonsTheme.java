public abstract class BaseJasonsTheme extends javax.swing.plaf.metal.MetalTheme {

    public abstract String getName();

    protected javax.swing.plaf.ColorUIResource getPrimary1() { return new javax.swing.plaf.ColorUIResource(102, 102, 153); }
    protected javax.swing.plaf.ColorUIResource getPrimary2() { return new javax.swing.plaf.ColorUIResource(153, 153, 204); }
    protected javax.swing.plaf.ColorUIResource getPrimary3() { return new javax.swing.plaf.ColorUIResource(204, 204, 255); }

    protected javax.swing.plaf.ColorUIResource getSecondary1() { return new javax.swing.plaf.ColorUIResource(102, 102, 102); }
    protected javax.swing.plaf.ColorUIResource getSecondary2() { return new javax.swing.plaf.ColorUIResource(153, 153, 153); }
    protected javax.swing.plaf.ColorUIResource getSecondary3() { return new javax.swing.plaf.ColorUIResource(204, 204, 204); }
}