class FigBoundary {
    private FigLine lineFig;
    private FigRect rectFig;
    
    public FigBoundary(FigRect rect, FigLine line) {
        this.rectFig = rect;
        this.lineFig = line;
    }
    
    public FigLine getLineFig() { return lineFig; }
    public FigRect getRectFig() { return rectFig; }
}
