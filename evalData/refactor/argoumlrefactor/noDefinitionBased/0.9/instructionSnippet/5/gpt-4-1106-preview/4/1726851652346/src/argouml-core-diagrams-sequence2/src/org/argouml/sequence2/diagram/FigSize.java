package org.argouml.sequence2.diagram;

public final class FigSize {
    private final int x;
    private final int y;
    private final int w;
    private final int h;

    public FigSize(int x, int y, int w, int h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public int getWidth() {
        return w;
    }

    public int getHeight() {
        return h;
    }
}