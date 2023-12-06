import java.util.Arrays;
import java.util.Date;
import java.time.LocalDateTime;
//#### example 1 ##################################
// 'Parameters to parameters' data clump
class Example1A {
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

// Example3A.java
//'fields to fields' data clump
class Example3A {
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
// Example4A.java
class Example4A {
    void processEmployeeData(int employeeID, String firstName, String lastName) {
        System.out.println("Processing employee data: ID-" + employeeID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }

    void displayEmployeeInfo(int employeeID, String firstName, String lastName) {
        System.out.println("Displaying employee info: ID-" + employeeID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

// Example4B.java
class Example4B {
    void showEmployeeInfo(int employeeID, String firstName, String lastName) {
        System.out.println("Showing employee info: ID-" + employeeID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

// Example5A.java
class Example5A {
    void processCustomerData(int customerID, String firstName, String lastName) {
        System.out.println("Processing customer data: ID-" + customerID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }

    void sendCustomerNotification(int customerID, String firstName, String lastName) {
        System.out.println("Sending customer notification: ID-" + customerID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

// Example5B.java
class Example5B {
    void notifyCustomer(int customerID, String firstName, String lastName) {
        System.out.println("Notifying customer: ID-" + customerID + ", First Name-" + firstName + ", Last Name-" + lastName);
    }
}

// Example6A.java
class Example6A {
    void processTaskData(int taskID, String description, String status) {
        System.out.println("Processing task data: ID-" + taskID + ", Description-" + description + ", Status-" + status);
    }

    void completeTask(int taskID, String description, String status) {
        System.out.println("Completing task: ID-" + taskID + ", Description-" + description + ", Status-" + status);
    }
}

// Example6B.java
class Example6B {
    void finishTask(int taskID, String description, String status) {
        System.out.println("Finishing task: ID-" + taskID + ", Description-" + description + ", Status-" + status);
    }
}

// Example7A.java
class Example7A {
    void processBlogPostData(int postID, String title, String content) {
        System.out.println("Processing blog post data: PostID-" + postID + ", Title-" + title + ", Content-" + content);
    }

    void shareBlogPost(int postID, String title, String content) {
        System.out.println("Sharing blog post: PostID-" + postID + ", Title-" + title + ", Content-" + content);
    }
}

// Example7B.java
class Example7B {
    void distributeBlogPost(int postID, String title, String content) {
        System.out.println("Distributing blog post: PostID-" + postID + ", Title-" + title + ", Content-" + content);
    }
}

// Example8A.java
class Example8A {
    void processEventData(int eventID, String title, LocalDateTime dateTime) {
        System.out.println("Processing event data: EventID-" + eventID + ", Title-" + title + ", Date and Time-" + dateTime);
    }

    void organizeEvent(int eventID, String location, int organizerID) {
        System.out.println("Organizing event: EventID-" + eventID + ", Location-" + location + ", OrganizerID-" + organizerID);
    }
}

// Example8B.java
class Example8B {
    void attendEvent(int eventID, String title, LocalDateTime dateTime) {
        System.out.println("Attending event: EventID-" + eventID + ", Title-" + title + ", Date and Time-" + dateTime);
    }
}

// Example9A.java
class Example9A {
    void processPaymentData(int paymentID, int orderID, double paymentAmount) {
        System.out.println("Processing payment data: PaymentID-" + paymentID + ", OrderID-" + orderID + ", Amount-" + paymentAmount);
    }

    void recordPayment(int paymentID, int orderID, Date paymentDate) {
        System.out.println("Recording payment: PaymentID-" + paymentID + ", OrderID-" + orderID + ", Payment Date-" + paymentDate);
    }
}

// Example9B.java
class Example9B {
    void confirmPayment(int paymentID, int orderID, double paymentAmount) {
        System.out.println("Confirming payment: PaymentID-" + paymentID + ", OrderID-" + orderID + ", Amount-" + paymentAmount);
    }
}

// Example10A.java
class Example10A {
    void processBookData(String ISBN, String title, String author) {
        System.out.println("Processing book data: ISBN-" + ISBN + ", Title-" + title + ", Author-" + author);
    }

    void updateBookGenre(String ISBN, String genre) {
        System.out.println("Updating book genre: ISBN-" + ISBN + ", Genre-" + genre);
    }
}

// Example10B.java
class Example10B {
    void displayBookDetails(String ISBN, String title, String author) {
        System.out.println("Displaying book details: ISBN-" + ISBN + ", Title-" + title + ", Author-" + author);
    }
}
