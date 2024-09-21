import java.awt.Rectangle;

class RectDimension {

    private Rectangle bounds;

    public RectDimension(Rectangle bounds) {
        this.bounds = bounds;
    }

    int getWidth() {
        return this.bounds.width;
    }
    int getHeight() {
        return this.bounds.height;
    }
}