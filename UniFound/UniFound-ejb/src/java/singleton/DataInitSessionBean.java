/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.Chat;
import entity.LostFoundListing;
import entity.MessageEntity;
import entity.OldTextbookListing;
import entity.StudyBuddyListing;
import entity.UserEntity;
import enumeration.UserStatusEnum;
import exception.UserAlreadyExistException;
import exception.UserNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.ejb.LocalBean;
import javax.ejb.Startup;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import session.ChatSessionBeanLocal;
import session.LostFoundSessionBeanLocal;
import session.MessageSessionBeanLocal;
import session.ModuleSessionBeanLocal;
import session.OldTextbookSessionBeanLocal;
import session.StudyBuddySessionBeanLocal;
import session.UserSessionLocal;


@Singleton
@LocalBean
@Startup
public class DataInitSessionBean {
    
    @EJB
    private LostFoundSessionBeanLocal lostFoundSessionBeanLocal;
    @EJB
    private ModuleSessionBeanLocal moduleSessionBeanLocal;
    @EJB
    private OldTextbookSessionBeanLocal oldTextbookSessionBeanLocal;
    @EJB
    private StudyBuddySessionBeanLocal studyBuddySessionBeanLocal;
    @EJB
    private UserSessionLocal userSessionLocal;
    @EJB
    private ChatSessionBeanLocal chatSessionBeanLocal;
    @EJB
    private MessageSessionBeanLocal messageSessionBeanLocal; 
    
    @PersistenceContext
    private EntityManager em;

    public DataInitSessionBean() {
    }

    @PostConstruct
    public void postConstruct() {
        List<UserEntity> users = userSessionLocal.retrieveAllUsers();
        if (users.isEmpty()) {
            initialiseUsers();
            initialiseLostFound();
            initialiseOldTextbook();
            initialiseStudyBuddy();
        }
    }
    
    private void initialiseUsers() {
        try {
            UserEntity lek = new UserEntity("Hsiang Hui", "password", "lek@gmail.com", "Male", "Year 5", UserStatusEnum.APPROVED, "Information Systems");
            UserEntity bob = new UserEntity("Bob", "password", "bob@gmail.com", "Male", "Year 1", UserStatusEnum.APPROVED, "Computer Science");
            UserEntity may = new UserEntity("May", "password", "may@gmail.com", "Female", "Year 3", UserStatusEnum.APPROVED, "Information Security");
            userSessionLocal.createUser(lek);
            userSessionLocal.createUser(bob);
            userSessionLocal.createUser(may);
            
            System.out.println(lek.getId());
//            initialiseChats(lek, bob);
//            initialiseChats(bob, may);
//            initialiseChats(may, lek);
        } catch (UserAlreadyExistException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
    
    private void initialiseChats(UserEntity user1, UserEntity user2) {
        try {
            Chat chat = new Chat();
            chatSessionBeanLocal.createChat(chat, user1.getId(), user2.getId());
//            for (int i = 0; i < 10; i++) {
//                MessageEntity message = new MessageEntity();
//                message.setDateCreated(new Date());
//                if (i % 2 == 0) {
//                    message.setUserEntity(user1);
//                    message.setMessageBody("Message " + i + " from " + user1.getName());
//                } else {
//                    message.setUserEntity(user2);
//                    message.setMessageBody("Message " + i + " from " + user2.getName());
//                }
//                messageSessionBeanLocal.createMessage(message, chat.getId());
//            }
        } catch (UserNotFoundException e) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    public void initialiseLostFound() {
        try {
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("iPhone 13", "Lost at CLB 2 days ago", "CLB", "Please help me find it", "lost", "ELECTRONICS"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Calculator", "Last seen at YIH", "YIH", "Please help!", "lost", "ELECTRONICS"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Econs Textbook", "Found an econs textbook", "COM1", "Chat me if it's yours", "found", "EDUCATION"), new Long(1));
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initialiseOldTextbook() {
        try {
            oldTextbookSessionBeanLocal.createOldTextbook(new OldTextbookListing("IS3106", "Introduction to React", "Very useful book!"), new Long(1));
            oldTextbookSessionBeanLocal.createOldTextbook(new OldTextbookListing("CS2105", "Principles of Networking", "Used less than 5 times"), new Long(1));
            oldTextbookSessionBeanLocal.createOldTextbook(new OldTextbookListing("CS2102", "Introduction to Database", "Good condition"), new Long(1));
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }       
    }

    public void initialiseStudyBuddy() {
        try {
          
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing("Male", "IS3106", "Information Systems", "Year 5", "CLB", 2,userSessionLocal.getUser(1L)));
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing("Male", "CS2105", "Computer Science", "Year 1", "COM1", 4,userSessionLocal.getUser(2L)));
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing("Female", "CS2102", "Information Security", "Year 3", "UTOWN", 5,userSessionLocal.getUser(3L)));
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }
}
