package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class ActivationData {
    private final Object owner;
    private final Rectangle bounds;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public ActivationData(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.bounds = new Rectangle(x, y, w, h);
        this.settings = settings;
        this.messageFig = messageFig;
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle getBounds() {
        return bounds;
    }

    public DiagramSettings getSettings() {
        return settings;
    }

    public FigMessage getMessageFig() {
        return messageFig;
    }
}
