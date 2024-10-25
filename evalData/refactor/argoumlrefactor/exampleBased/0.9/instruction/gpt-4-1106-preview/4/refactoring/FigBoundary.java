class FigBoundary {
    private FigLine lineFig;
    private FigRect rectFig;
    
    public FigBoundary(int x, int y, int width, int height, Color lineColor, int lineWidth, boolean dashed) {
        rectFig = new FigRect(x, y, width, height);
        rectFig.setFilled(false);
        rectFig.setLineWidth(0);
        lineFig = new FigLine(x + width / 2, y, x + width / 2, y + height, lineColor);
        lineFig.setDashed(dashed);
        lineFig.setLineWidth(lineWidth);
    }

    public FigLine getLineFig() { return lineFig; }
    public FigRect getRectFig() { return rectFig; }
}
