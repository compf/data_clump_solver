package org.argouml.sequence2.diagram;

public class FigActivationData {
    private final Object owner;
    private final int x;
    private final int y;
    private final int w;
    private final int h;

    public FigActivationData(Object owner, int x, int y, int w, int h) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    // Getters for owner, x, y, w, h
}