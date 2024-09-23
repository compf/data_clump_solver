public class FigNodeState {

    private FigBasePresentation displayState;
    private DiagramSettings settings;
    private DiagramElement nameDiagramElement;

    public FigNodeState(FigBasePresentation displayState, Object owner, Rectangle bounds, DiagramSettings settings) {
        this.displayState = displayState;
        this.settings = settings;
        displayState.setOwner(owner);
        displayState.setBounds(bounds);
    }

    public Dimension getMinimumSize() {
        return displayState.getMinimumSize();
    }

    public void setNameDiagramElement(DiagramElement name) {
        this.nameDiagramElement = name;
    }

    // Other methods related to the state of the FigNode
}