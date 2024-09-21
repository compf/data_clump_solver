package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class FigActivationParams {
    private final Object owner;
    private final int x, y, w, h;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public FigActivationParams(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.settings = settings;
        this.messageFig = messageFig;
    }

    public Object getOwner() { return owner; }
    public int getX() { return x; }
    public int getY() { return y; }
    public int getWidth() { return w; }
    public int getHeight() { return h; }
    public DiagramSettings getSettings() { return settings; }
    public FigMessage getMessageFig() { return messageFig; }
    public Rectangle toRectangle() { return new Rectangle(x, y, w, h); }
}