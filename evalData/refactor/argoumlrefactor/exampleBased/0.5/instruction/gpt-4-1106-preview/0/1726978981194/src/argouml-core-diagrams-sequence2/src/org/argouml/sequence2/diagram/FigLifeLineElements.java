public class FigLifeLineElements {

    private FigLine lineFig;
    private FigRect rectFig;

    public FigLifeLineElements(int x, int y, int width, int height, Color lineColor, int lineWidth) {
        rectFig = new FigRect(x, y, width, height); 
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(true);
        lineFig.setLineWidth(lineWidth);
    }

    // Getters
    public FigLine getLineFig() { return lineFig; }
    public FigRect getRectFig() { return rectFig; }

    // Additional functionality can be added here
}