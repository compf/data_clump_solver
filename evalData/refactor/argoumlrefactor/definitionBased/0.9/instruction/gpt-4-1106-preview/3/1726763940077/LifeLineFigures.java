public class LifeLineFigures {
    private final FigLine lineFig;
    private final FigRect rectFig;

    public LifeLineFigures(int x, int y, int width, int height, Color lineColor, int lineWidth, boolean dashed) {
        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(dashed);
        lineFig.setLineWidth(lineWidth);
    }

    public FigLine getLineFig() {
        return lineFig;
    }

    public FigRect getRectFig() {
        return rectFig;
    }

    public void setLineDashed(boolean dashed) {
        lineFig.setDashed(dashed);
    }

    public void setLineLineWidth(int lineWidth) {
        lineFig.setLineWidth(lineWidth);
    }

    public void setLineColor(Color lineColor) {
        lineFig.setLineColor(lineColor);
    }
    // Additional methods to work with figures could be added here
}
