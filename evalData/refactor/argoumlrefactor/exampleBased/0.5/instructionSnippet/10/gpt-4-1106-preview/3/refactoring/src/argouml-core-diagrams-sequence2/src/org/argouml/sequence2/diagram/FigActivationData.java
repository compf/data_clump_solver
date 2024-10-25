package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class FigActivationData {
    private final Object owner;
    private final Rectangle rectangle;
    private final DiagramSettings settings;
    private final FigMessage messageFig;

    public FigActivationData(Object owner, int x, int y, int w, int h, DiagramSettings settings, FigMessage messageFig) {
        this.owner = owner;
        this.rectangle = new Rectangle(x, y, w, h);
        this.settings = settings;
        this.messageFig = messageFig;
    }

    // Getter methods
}
