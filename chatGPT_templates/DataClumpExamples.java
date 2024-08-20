/* 
    These examples show data clumps and how they might be refactored
    Imports are missing so these examples would not compile
*/
// ### example 5#########################
//'method parameters to method parameters' data clump
class Example1A {

    // both methods share at least 3 parameters, so we can extract those 3
    // parameters into a class

    public static String buildServiceKey(String path, String group, String version) {
        int length = path == null ? 0 : path.length();
        length += group == null ? 0 : group.length();
        length += version == null ? 0 : version.length();
        length += 2;
        StringBuilder buf = new StringBuilder(length);
        if (StringUtils.isNotEmpty(group)) {
            buf.append(group).append('/');
        }
        buf.append(path);
        if (StringUtils.isNotEmpty(version)) {
            buf.append(':').append(version);
        }
        return buf.toString().intern();
    }

    public static String buildKey(String path, String group, String version, String prefix) {
        return prefix + buildServiceKey(path, group, version);
    }

}

// ## refactored ##################################
class KeyData {
    private String path;
    private String group;
    private String version;

    KeyData(String path, String group, String version) {
        this.path = path;
        this.group = group;
        this.version = version;
    }

    public String getPath() {
        return path;
    }

    public String getGroup() {
        return group;
    }

    public String getVersion() {
        return version;
    }

    public int getLength() {
        return path == null ? 0
                : path.length() + group == null ? 0 : group.length() + version == null ? 0 : version.length() + 2;
    }

}

class Example1A {

    public static String buildServiceKey(KeyData keyData) {
        int length = keyData.getLength();
        StringBuilder buf = new StringBuilder(length);
        if (StringUtils.isNotEmpty(keyData.getGroup())) {
            buf.append(keyData.getGroup()).append('/');
        }
        buf.append(keyData.getPath());
        if (StringUtils.isNotEmpty(keyData.getVersion())) {
            buf.append(':').append(keyData.getVersion());
        }
        return buf.toString().intern();
    }

    public static String buildKey(KeyData keyData, String prefix) {
        return prefix + buildServiceKey(keyData);
    }
}
// #### example 5 end ##################################

//

// ## example 2 ##################################
// 'fields to fields' data clump
class Example2A {

    // both classes share at least 3 fields, so we can extract those 3 fields into a class
    private List<Integer> states;
    private Map<Integer, List<Integer>> successors;
    private Map<Integer, List<Label>> labels;
    private SmPLMethodCFG cfg;

    void init() {
        for (ControlFlowNode node : cfg.vertexSet()) {
			
			int state = node.getId();
			states.add(state);
			successors.put(state, new ArrayList<Integer>());
			labels.put(state, new ArrayList<Label>())
        }
    }

}

// Example2B.java
class Example2B {
    private List<Integer> states;
    private Map<Integer, List<Integer>> successors;
    private Map<Integer, List<Label>> labels;
    private Map<Integer, String> stateDescriptions;

    void print() {
        for (int state : states) {
            System.out.println("State: " + state + ", Successors: " + successors.get(state) + ", Labels: "
                    + labels.get(state) + ", Description: " + stateDescriptions.get(state));
        }
    }
}
// ## refactored ##################################

class StateGraphData {
    private List<Integer> states;
    private Map<Integer, List<Integer>> successors;
    private Map<Integer, List<Label>> labels;

    StateGraphData() {
        this.states = new ArrayList<Integer>();
        this.successors = new HashMap<Integer, List<Integer>>();
        this.labels = new HashMap<Integer, List<Label>>();
    }

    public List<Integer> getStates() {
        return states;
    }

    public Map<Integer, List<Integer>> getSuccessors(int state) {
        return successors.get(state);
    }

    public Map<Integer, List<Label>> getLabels(int state) {
        return labels.get(state);
    }

    public void addState(int state) {
        states.add(state);
        successors.put(state, new ArrayList<Integer>());
        labels.put(state, new ArrayList<Label>());
    }

}

class Example2A {

    // both classes share at least 3 fields, so we can extract those 3 fields into a
    // class
    private StateGraphData stateGraphData;
    private SmPLMethodCFG cfg;

    void init() {
        for (ControlFlowNode node : cfg.vertexSet()) {

            stateGraphData.addState(node.getId());
        }
    }

}

// Example2B.java
class Example2B {
    private StateGraphData stateGraphData;
    private Map<Integer, String> stateDescriptions;

    void print() {
        for (int state : states) {
            System.out.println("State: " + state + ", Successors: " + stateGraphData.getSuccessor(state) + ", Labels: "
                    + stateGraphData.getLabel(state) + ", Description: " + stateDescriptions.get(state));
        }
    }
}
// ## example 2 end ##################################

// ## example 3 ##################################
// 'parameters to fields' data clump
class Example3A {
    boolean validate(String methodName, Class<?>[] parameterTypes, Object[] arguments) {
        return parameterTypes.length == arguments.length;
    }
}

// Example3B.java
class Example3B {

    private URL consumerUrl;

    private List<URL> urls;

    private URL url;

    private String methodName;

    private Class<?>[] parameterTypes;

    private Object[] arguments;

    private InetSocketAddress localAddress;

    private InetSocketAddress remoteAddress;

}

// ## refactored ##################################
class MethodCallData {
    public String methodName;
    public Class<?>[] parameterTypes;
    public Object[] arguments;

    public boolean isValid() {
        return parameterTypes.length == arguments.length;
    }

}

class Example3A {
    boolean validate(MethodCallData methodCallData) {
        return methodCallData.isValid();
    }
}

class Example3B {
    private URL consumerUrl;

    private List<URL> urls;

    private URL url;

    private MethodCallData methodCallData;

    private InetSocketAddress localAddress;

    private InetSocketAddress remoteAddress;
}
// ## example 3 end ##################################

// ## example 4 ##################################
class Example4A {
    protected void beforeEvaluation(TemplateOutputWriter writer, RootBuilder root, Feature feature)
            throws IOException {
        writer.incrementNumberReturned();
        writer.setAxisOrder(CRS.getAxisOrder(featureCrs));
    }
}

// Example4B.java
class Example4B extends Example4A {
     // This pair of methods do not constitute a data clump even if signature is copied because
    // the method is overridden and therefore must have the same paremeters
    @Override
    protected void beforeEvaluation(TemplateOutputWriter writer, RootBuilder root, Feature feature)
            throws IOException {
        root.reset();
        super.beforeEvaluation(writer, root, feature);
    }
   
}
// ## example 4 end ##################################
