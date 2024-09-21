package org.argouml.activity2.diagram;

import org.tigris.gef.presentation.FigGroup;
import java.awt.Rectangle;
import org.argouml.uml.diagram.DiagramSettings;

public class PresentationFig extends FigGroup {

    public PresentationFig(Object owner, Rectangle bounds, DiagramSettings settings) {
        super(owner);
        setBounds(bounds);
        // additional initialization here if needed
    }

    // other methods specific to PresentationFig
}