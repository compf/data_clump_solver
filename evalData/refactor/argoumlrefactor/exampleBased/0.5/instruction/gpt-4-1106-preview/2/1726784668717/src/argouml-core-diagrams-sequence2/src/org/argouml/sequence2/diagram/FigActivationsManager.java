public class FigActivationsManager {
    private List<FigActivation> activations;
    private List<FigActivation> stackedActivations;

    public FigActivationsManager() {
        activations = new LinkedList<FigActivation>();
        stackedActivations = new LinkedList<FigActivation>();
    }

    public void clearActivations() {
        activations.clear();
        stackedActivations.clear();
    }

    public void createActivations(List<FigMessage> messages, FigLine line, Object owner, DiagramSettings settings) {
        // Implementation of creating standard and stacked activations
    }

    public void moveActivations(FigLine line, int yDiff, Rectangle oldBounds, int newHeight) {
        // Implementation of moving activations
    }

    public List<FigActivation> getActivations() { return activations; }
    public List<FigActivation> getStackedActivations() { return stackedActivations; }
}