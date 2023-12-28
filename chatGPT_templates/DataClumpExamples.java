import java.util.Arrays;
import java.util.Date;
import java.time.LocalDateTime;
//#### example 1 ##################################
// 'Parameters to parameters' data clump
class Example1A {

    //Both methods have the same parameters, so we can extract them into a class
    void processUserData(int userID, String username, String email) {
        System.out.println("Processing user data: ID-" + userID + ", Username-" + username + ", Email-" + email);
    }

    void performUserAction(int userID, String username, String email) {
        System.out.println("Performing user action: ID-" + userID + ", Username-" + username + ", Email-" + email);
    }
}


//refactored######################################
class UserData{
    int userID;
    String username;
    String email;
    UserData(int userID, String username, String email){
        this.userID = userID;
        this.username = username;
        this.email = email;
    }
    public int getUserID() {
        return userID;
    }
    public String getUsername() {
        return username;
    }
    public String getEmail() {
        return email;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
}
class Example1A {
    void processUserData(UserData userData) {
        System.out.println("Processing user data: ID-" + userData.getUserId() + ", Username-" + userData.getUsername() + ", Email-" + userData.getEmail());
    }

    void performUserAction(UserData userData) {
        System.out.println("Performing user action: ID-" + userData.getUserId() + ", Username-" + userData.getUsername() + ", Email-" + userData.getEmail());
    }
}



//#### example 1 end ##################################

//#### example 2 ##################################
//// 'Parameters to parameters' data clump
// Example2A.java
class Example2A {
    //The methods in both classes have the same parameters, so we can extract them into a class
    void processProductData(int productID, String name, String description) {
        System.out.println("Processing product data: ID-" + productID + ", Name-" + name + ", Description-" + description);
    }

   
}
class Example2B {
    void showProductInfo(int productID, String name, String description) {
        System.out.println("Showing product info: ID-" + productID + ", Name-" + name + ", Description-" + description);
    }
}
//### refactored ##################################
class ProductInfo{
    int productID;
    String name;
    String description;
    ProductInfo(int productID, String name, String description){
        this.productID = productID;
        this.name = name;
        this.description = description;
    }
    public int getProductID() {
        return productID;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDescription(String description) {
        this.description = description;
    }    
}
class Example2A {
    void processProductData(ProductInfo productInfo) {
        System.out.println("Processing product data: ID-" + productInfo.getProductID() + ", Name-" + productInfo.getName() + ", Description-" + productInfo.getDescription());
    }

    void displayProductInfo(int productID, String name, String description) {
        System.out.println("Displaying product info: ID-" + productInfo.getProductID() + ", Name-" + productInfo.getName() + ", Description-" + productInfo.getDescription());
    }
}
class Example2B {
    void showProductInfo(ProductInfo productInfo) {
        System.out.println("Showing product info: ID-" + productInfo.getProductID() + ", Name-" + productInfo.getName() + ", Description-" + productInfo.getDescription());
    }
}
//#### example 2 end ##################################

//#### example 3 ##################################
//'fields to fields' data clump
class Example3A {
    // both classes have the same fields, so we can extract them into a class
    private int orderId;
    private int customerId;
    private int[] productIds;
    void processOrderData() {
        System.out.println("Processing order data: OrderID-" + orderID + ", CustomerID-" + customerID + ", ProductIDs-" + Arrays.toString(productIDs));
    }
    Example3A(int orderID, int customerID, int[] productIDs){
        this.orderID = orderID;
        this.customerID = customerID;
        this.productIDs = productIDs;
    }

 
}

// Example3B.java
class Example3B {
    private int orderId;
    private int customerId;
    private int[] productIds;
    void displayOrderSummary() {
        System.out.println("Displaying order summary: OrderID-" + orderID + ", CustomerID-" + customerID + ", ProductIDs-" + Arrays.toString(productIDs));
    }
    Example3B(int orderID, int customerID, int[] productIDs){
        this.orderID = orderID;
        this.customerID = customerID;
        this.productIDs = productIDs;
    }
}
//### refactored ##################################
class OrderDetails{
    int orderID;
    int customerID;
    int[] productIDs;
    OrderDetails(int orderID, int customerID, int[] productIDs){
        this.orderID = orderID;
        this.customerID = customerID;
        this.productIDs = productIDs;
    }
    public int getOrderID() {
        return orderID;
    }
    public int getCustomerID() {
        return customerID;
    }
    public int[] getProductIDs() {
        return productIDs;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }
    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }
    public void setProductIDs(int[] productIDs) {
        this.productIDs = productIDs;
    }    
}
class Example3A {
    private OrderDetails orderDetails;
    void processOrderData() {
        System.out.println("Processing order data: OrderID-" + orderDetails.getOrderID() + ", CustomerID-" + orderDetails.getCustomerId() + ", ProductIDs-" + Arrays.toString(orderDetails.getProductIDs()));
    }
    Example3A(int orderID, int customerID, int[] productIDs){
        this.orderDetails = new OrderDetails(orderID, customerID, productIDs);
    }

 
}

// Example3B.java
class Example3B {
    private OrderDetails orderDetails;
    void displayOrderSummary() {
        System.out.println("Displaying order summary: OrderID-" + orderDetails.getOrderID() + ", CustomerID-" + orderDetails.getCustomerId() + ", ProductIDs-" + Arrays.toString(orderDetails.getProductIDs()));
    }
    Example3B(int orderID, int customerID, int[] productIDs){
        this.orderDetails = new OrderDetails(orderID, customerID, productIDs);
    }
}
//#### example 3 end ##################################


//#### example 4 ##################################
// 'method parameters to fields' data clump
class Example4A {
    private int employeeID;
    private String firstName;
    private String lastName;
    void processEmployeeData() {
        System.out.println("Processing employee data: ID-" + employeeID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

// Example4B.java
class Example4B {
    void showEmployeeInfo(int employeeID, String firstName, String lastName) {
        //this method has the same parameters as the fields in Example4A, so we can extract them into a class
        System.out.println("Showing employee info: ID-" + employeeID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}
//### refactored ##################################
class EmployeeRecord{
    int employeeID;
    String firstName;
    String lastName;
    EmployeeRecord(int employeeID, String firstName, String lastName){
        this.employeeID = employeeID;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public int getEmployeeID() {
        return employeeID;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }

    public void setEmployeeID(int employeeID) {
        this.employeeID = employeeID;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    } 
       
}
class Example4A {
    private EmployeeRecord employeeRecord;
    void processEmployeeData() {
        System.out.println("Processing employee data: ID-" + employeeRecord.getEmployeeID() + ", First Name-" + employeeRecord.getFirstName() + ", Last Name-" + employeeRecord.getLastName());
    }

}
class Example4B {
    void showEmployeeInfo(EmployeeRecord employeeRecord) {
        System.out.println("Showing employee info: ID-" + employeeRecord.getEmployeeID() + ", First Name-" + employeeRecord.getFirstName() + ", Last Name-" + employeeRecord.getLastName());
    }
}
//#### example 4 end ##################################


// ### example 5#########################
//'method parameters to method parameters' data clump
class Example5A {

    // both methods share at least 3 parameters, so we can extract those 3 parameters into a class
    void processCustomerData(int customerID, String firstName, String lastName,int offset) {
        System.out.println("Processing customer data: ID-" + customerID+offset + ", First Name-" + firstName + ", Last Name-" + lastName);
    }

    void sendCustomerNotification(int customerID, String firstName, String lastName,double factor) {
        System.out.println("Sending customer notification: ID-" + customerID*factor + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

//## refactored ##################################
class CustomerData{
    int customerID;
    String firstName;
    String lastName;
    CustomerData(int customerID, String firstName, String lastName){
        this.customerID = customerID;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public int getCustomerID() {
        return customerID;
    }
    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }

    public void setCustomerID(int customerID) {
        this.customerID = customerID;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    } 
       
}
class Example5A {
    void processCustomerData(CustomerData customerData, int offset) {
        System.out.println("Processing customer data: ID-" + customerData.getCustomerID()+offset + ", First Name-" + customerData.getFirstName() + ", Last Name-" + customerData.getLastName());
    }

    void sendCustomerNotification(CustomerData customerData, double factor) {
        System.out.println("Sending customer notification: ID-" + customerData.getCustomerID()*factor + ", First Name-" + customerData.getFirstName() + ", Last Name-" + customerData.getLastName());
    }
}
//#### example 5 end ##################################

//### Example 6 #############
// method parameters to method parameters' data clump
class Example6A {

    // both classes have methods which share at least 3 parameters, so we can extract those 3 parameters into a class
    void processTaskData(int taskID, String description, String status,String prefix) {
        System.out.println("Processing task data: ID-" + taskID + ", Description-" + description + ", Status-" + prefix+":"+status);
    }

 
}


class Example6B {
    void finishTask(int taskID, String description, String status,boolean lowerCase) {
        System.out.println("Finishing task: ID-" + taskID + ", Description-" + description + ", Status-" + lowerCase?status.toLowerCase():status);
    }
}
//## refactored ##################################

class TaskData{
    int taskID;
    String description;
    String status;
    TaskData(int taskID, String description, String status){
        this.taskID = taskID;
        this.description = description;
        this.status = status;
    }
    public int getTaskID() {
        return taskID;
    }
    public String getDescription() {
        return description;
    }
    public String getStatus() {
        return status;
    }

    public void setTaskID(int taskID) {
        this.taskID = taskID;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setStatus(String status) {
        this.status = status;
    } 
       
}
class Example6A {
    void processTaskData(TaskData taskData, String prefix) {
        System.out.println("Processing task data: ID-" + taskData.getTaskID() + ", Description-" + taskData.getDescription() + ", Status-" + prefix+":"+taskData.getStatus());
    }

 
}
class Example6B {
    void finishTask(TaskData taskData, boolean lowerCase) {
        System.out.println("Finishing task: ID-" + taskData.getTaskID() + ", Description-" + taskData.getDescription() + ", Status-" + lowerCase?taskData.getStatus().toLowerCase():taskData.getStatus());
    }
}
//## Example 6 end ##################################


//## example 7 ##################################
// 'fields to fields' data clump
class Example7A {

    // both classes share at least 3 fields, so we can extract those 3 fields into a class
    private int postID;
    private String title;
    private String content;
    private String author;

    void processBlogPostData() {
        System.out.println("Processing blog post data: PostID-" + postID + ", Title-" + title + ", Content-" + content+", Author-"+author);
    }
    Example7A(int postID, String title, String content, String author){
        this.postID = postID;
        this.title = title;
        this.content = content;
        this.author = author;
    }
   
}

// Example7B.java
class Example7B {
    private int postID;
    private String title;
    private String content;
    private int length;
    void distributeBlogPost(int postID, String title, String content) {
        System.out.println("Distributing blog post: PostID-" + postID + ", Title-" + title + ", Content-" + content+ ", Length-" + length+ "words");
    }
    Example7B(int postID, String title, String content){
        this.postID = postID;
        this.title = title;
        this.content = content;
        this.length = content.split(" ").length;
    }
}
//## refactored ##################################

class BlogPost{
    int postID;
    String title;
    String content;
    BlogPost(int postID, String title, String content, String author){
        this.postID = postID;
        this.title = title;
        this.content = content;
    }
    public int getPostID() {
        return postID;
    }
    public String getTitle() {
        return title;
    }
    public String getContent() {
        return content;
    }


    public void setPostID(int postID) {
        this.postID = postID;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setContent(String content) {
        this.content = content;
    }
   
       
}

class Example7A {
    private BlogPost blogPost;
    private String author;
    void processBlogPostData() {
        System.out.println("Processing blog post data: PostID-" + blogPost.getPostID() + ", Title-" + blogPost.getTitle() + ", Content-" + blogPost.getContent()+", Author-"+author);
    }
    Example7A(int postID, String title, String content, String author){
        this.blogPost = new BlogPost(postID, title, content);
        this.author = author;
    }
   
}
class Example7B {
    private BlogPost blogPost;
    private int length;
    void distributeBlogPost() {
        System.out.println("Distributing blog post: PostID-" + blogPost.getPostID() + ", Title-" + blogPost.getTitle() + ", Content-" + blogPost.getContent()+ ", Length-" + length+ "words");
    }
    Example7B(int postID, String title, String content){
        this.blogPost = new BlogPost(postID, title, content);
        this.length= content.split(" ").length;
    }
}
//## example 7 end ##################################


//## example 8 ##################################
// 'method parameters to fields' data clump
class Example8A {
    void processEventData(int eventID, String title, LocalDateTime dateTime,boolean isGlobalEvent) {
        // this method shares at least 3 parameters with the fields in Example8B, so we can extract those 3 parameters into a class
        System.out.println("Processing event data: EventID-" + eventID + ", Title-" + title + ", Date and Time-" + dateTime+", Is Global Event-"+isGlobalEvent);
    }   
}

// Example8B.java
class Example8B {
    private int eventID;
    private String title;
    private LocalDateTime dateTime;
    private Object params;

    void attendEvent() {
        System.out.println("Attending event: EventID-" + eventID + ", Title-" + title + ", Date and Time-" + dateTime + ", Params-" + params.toString());
    }
}
//## refactored ##################################
class EventData{
    int eventID;
    String title;
    LocalDateTime dateTime;
    EventData(int eventID, String title, LocalDateTime dateTime){
        this.eventID = eventID;
        this.title = title;
        this.dateTime = dateTime;
    }
    public int getEventID() {
        return eventID;
    }
    public String getTitle() {
        return title;
    }
    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setEventID(int eventID) {
        this.eventID = eventID;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
 
       
}
class Example8A {
    private EventData eventData;
    private  boolean isGlobalEvent;
    void processEventData() {
        System.out.println("Processing event data: EventID-" + eventData.getEventID() + ", Title-" + eventData.getTitle() + ", Date and Time-" + eventData.getDateTime()+", Is Global Event-"+eventData.getIsGlobalEvent());
    }   
    Example8A(int eventID, String title, LocalDateTime dateTime,boolean isGlobalEvent){
        this.eventData = new EventData(eventID, title, dateTime);
        this.isGlobalEvent = isGlobalEvent;
    }
}
class Example8B {
    private EventData eventData;
    private Object params;
    void attendEvent() {
        System.out.println("Attending event: EventID-" + eventData.getEventID() + ", Title-" + eventData.getTitle() + ", Date and Time-" + eventData.getDateTime() + ", Params-" + params.toString());
    }
    Example8B(int eventID, String title, LocalDateTime dateTime){
        this.eventData = new EventData(eventID, title, dateTime);
        this.params = params;
    }
}
//## example 8 end ##################################

//## example 9 ##################################
class Example9A {
    void processPaymentData(int paymentID, int orderID, double paymentAmount) {
        System.out.println("Processing payment data: PaymentID-" + paymentID + ", OrderID-" + orderID + ", Amount-" + paymentAmount);
    }
}

// Example9B.java
class Example9B extends Example9A {
    @Override
    void processPaymentData(int paymentID, int orderID, double paymentAmount) {
        // This method constitutes not a data clump even if signature is copied because the method is overridden and therefore must have the same paremeters
        System.out.println("Confirming payment: PaymentID-" + paymentID + ", OrderID-" + orderID + ", Amount-" + paymentAmount);
    }
}
//## example 9 end ##################################

