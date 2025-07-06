package Controller;

import Model.History;
import Model.Logs;
import Model.Product;
import Model.User;
import View.Frame;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;

public class Main {
    
    public SQLite sqlite;
    
    public static void main(String[] args) {
        new Main().init();
    }
    
    public void init(){
        // Initialize a driver object
        sqlite = new SQLite();

        // Create a database
        sqlite.createNewDatabase();
        
        // Drop users table if needed (uncomment for fresh start)
        // sqlite.dropHistoryTable();
        // sqlite.dropLogsTable();
        // sqlite.dropProductTable();
        // sqlite.dropUserTable();
        
        // Create users table if not exist
        sqlite.createHistoryTable();
        sqlite.createLogsTable();
        sqlite.createProductTable();
        sqlite.createUserTable();
        
        // Add sample history
        sqlite.addHistory("admin", "Antivirus", 1, "2019-04-03 14:30:00.000");
        sqlite.addHistory("manager", "Firewall", 1, "2019-04-03 14:30:01.000");
        sqlite.addHistory("staff", "Scanner", 1, "2019-04-03 14:30:02.000");
        
        // Add sample logs
        sqlite.addLogs("NOTICE", "admin", "User creation successful", new Timestamp(new Date().getTime()).toString());
        sqlite.addLogs("NOTICE", "manager", "User creation successful", new Timestamp(new Date().getTime()).toString());
        sqlite.addLogs("NOTICE", "admin", "User creation successful", new Timestamp(new Date().getTime()).toString());
        
        // Add sample product
        sqlite.addProduct("Antivirus", 5, 500.0);
        sqlite.addProduct("Firewall", 3, 1000.0);
        sqlite.addProduct("Scanner", 10, 100.0);

        // Add sample users with SECURE passwords (change these in production!)
        // Note: These passwords meet the security requirements (8+ chars, uppercase, lowercase, digit)
        sqlite.addUser("admin", "AdminPass123" , 5);
        sqlite.addUser("manager", "ManageSecure456", 4);
        sqlite.addUser("staff", "StaffSecure789", 3);
        sqlite.addUser("client1", "ClientPass123", 2);
        sqlite.addUser("client2", "ClientPass456", 2);
        
        // System startup log
        sqlite.addLogs("INFO", "SYSTEM", "Application started successfully", 
                      new Timestamp(new Date().getTime()).toString());
        
        // Initialize User Interface
        Frame frame = new Frame();
        frame.init(this);
    }
}