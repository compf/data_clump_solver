package org.argouml.sequence2.diagram;

import java.awt.Rectangle;
import java.util.List;
import java.util.LinkedList;

class ActivationList {

    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    ActivationList() {
        activations = new LinkedList<>();
        stackedActivations = new LinkedList<>();
    }

    /* Methods that handle the creation, adding, setting colors, moving, and clearing of activations.
       Implementation relies on the now-obsolete methods from FigLifeLine, refactored to fit into the new class structure. */

    // ... Rest of the methods go here ...

}