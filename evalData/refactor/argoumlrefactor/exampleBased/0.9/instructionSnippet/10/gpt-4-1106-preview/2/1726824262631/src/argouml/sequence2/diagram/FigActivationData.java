package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class FigActivationData {

    private final Object owner;
    private final Rectangle rectangle;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public FigActivationData(final Object owner, final int x, final int y, final int w, final int h, final DiagramSettings settings, final FigMessage messageFig) {
        this.owner = owner;
        this.rectangle = new Rectangle(x, y, w, h);
        this.settings = settings;
        this.messageFig = messageFig;
    }

    public Object getOwner() {
        return owner;
    }

    public Rectangle getRectangle() {
        return rectangle;
    }

    public DiagramSettings getSettings() {
        return settings;
    }

    public FigMessage getMessageFig() {
        return messageFig;
    }

    // Additional functionality can be added here.

}
