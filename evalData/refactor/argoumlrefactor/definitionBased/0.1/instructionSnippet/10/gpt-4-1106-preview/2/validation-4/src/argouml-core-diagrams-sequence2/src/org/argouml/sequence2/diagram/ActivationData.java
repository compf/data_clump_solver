package org.argouml.sequence2.diagram;

import org.argouml.uml.diagram.DiagramSettings;

public class ActivationData {
    private final Object owner;
    private final int x;
    private final int y;
    private final int width;
    private final int height;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationData(Object owner, int x, int y, int width, int height, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    public Object owner() { return owner; }
    public int x() { return x; }
    public int y() { return y; }
    public int width() { return width; }
    public int height() { return height; }
    public DiagramSettings settings() { return settings; }
    public FigMessage messageFig() { return messageFig; }
}