public class FigLifeLineShape {
    private FigRect rect;
    private FigLine line;

    public FigLifeLineShape(int x, int y, int width, int height) {
        rect = new FigRect(x, y, width, height);
        rect.setFilled(false);
        rect.setLineWidth(0);
        line = new FigLine(x + width / 2, y, x + width / 2, y + height, LINE_COLOR);
        line.setDashed(true);
        line.setLineWidth(LINE_WIDTH);
    }

    public FigRect getRect() { return rect; }
    public FigLine getLine() { return line; }

    public void setBounds(int x, int y, int w, int h) {
        rect.setBounds(x, y, w, h);
        line.setBounds(x + w / 2, y, w, h);
    }
}