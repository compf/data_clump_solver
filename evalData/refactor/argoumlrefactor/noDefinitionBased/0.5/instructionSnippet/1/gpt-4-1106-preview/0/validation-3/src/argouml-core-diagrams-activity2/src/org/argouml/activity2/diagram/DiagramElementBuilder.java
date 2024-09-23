/* $Id$
 *****************************************************************************
 * Copyright (c) 2010 Contributors - see below
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *    Bob Tarling
 *****************************************************************************
 */

package org.argouml.activity2.diagram;

import java.awt.Rectangle;

import org.argouml.uml.diagram.DiagramSettings;

class DiagramElementBuilder {

    private static final int WIDTH = 90;
    private static final int HEIGHT = 25;
    
    static void buildDiagramElement(
            final FigBaseNode fig,
            final String style,
            final Object owner,
            final DiagramSettings settings) {
        
        final Rectangle bounds =
            new Rectangle(fig.getX(), fig.getX(), WIDTH, HEIGHT);
        
        if (style.equals("compartmentbox")) {
            // For classifiers
        } else if (style.equals("rect")) {
            FigNamedRect figNamedRect = new FigNamedRect(bounds, settings);
            fig.setDisplayState(figNamedRect);

                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("rrect")) {
            FigNamedRRect figNamedRRect = new FigNamedRRect(bounds, settings);
            fig.setDisplayState(figNamedRRect);

                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("pentagon")) {
            FigNamedPentagon figNamedPentagon = new FigNamedPentagon(bounds, settings);
            fig.setDisplayState(figNamedPentagon);

                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        } else if (style.equals("concave-pentagon")) {
            FigNamedConcavePentagon figNamedConcavePentagon = new FigNamedConcavePentagon(bounds, settings);
            fig.setDisplayState(figNamedConcavePentagon);

                            owner, 
                            bounds, 
                            fig.getLineColor(), 
                            fig.getFillColor(),
                            owner,
                            settings));
        }
    }

}
