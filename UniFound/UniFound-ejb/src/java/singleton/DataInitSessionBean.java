/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.Announcement;
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
import session.AnnouncementSessionBeanLocal;
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
    @EJB
    private AnnouncementSessionBeanLocal announcementSessionBeanLocal;
    
    @PersistenceContext
    private EntityManager em;

    public DataInitSessionBean() {
    }

    @PostConstruct
    private void init() {
        List<UserEntity> users = userSessionLocal.retrieveAllUsers();
        if (users.isEmpty()) {
            initialiseUsers();
            initialiseLostFound();
            initialiseOldTextbook();
            initialiseStudyBuddy();
            initialiseAnnouncement();
            
//            initialiseMessage(1L, 1L, 2L);
//            initialiseMessage(2L, 2L, 3L);
//            initialiseMessage(3L, 1L, 3L);
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
            
            initialiseChats(lek, bob, "Hello 1");
            initialiseChats(bob, may, "Hello 2");
            initialiseChats(lek, may, "Hello 3");

        } catch (UserAlreadyExistException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private void initialiseChats(UserEntity user1, UserEntity user2, String name) {
        try {
            Chat chat = new Chat();
            chat.setName(name);
            chatSessionBeanLocal.createChat(chat, user1, user2);
            System.out.println(chat.getId());
            
            for (int i = 0; i < 10; i++) {
                MessageEntity message = new MessageEntity();
                message.setDateCreated(new Date());
                if (i % 2 == 0) {
                    message.setUsername(user1.getName());
                    message.setMessageBody("Message " + i + " from " + user1.getName());
                } else {
                    message.setUsername(user2.getName());
                    message.setMessageBody("Message " + i + " from " + user2.getName());
                }
                messageSessionBeanLocal.createMessage(message, chat.getId());
            }

        } catch (UserNotFoundException e) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, e);
        }
    }

    public void initialiseLostFound() {
        try {
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("iPhone 13", "Lost at CLB 2 days ago", "CLB", "Please help me find it", "lost", "Phone"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Airpods Pro", "Last seen at YIH", "YIH", "Please help!", "lost", "Earphones"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Canvas bag", "Found a bag", "COM1", "Chat me if it's yours", "found", "Bag"), new Long(1));
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
    
    private void initialiseAnnouncement() {
        announcementSessionBeanLocal.createAnnouncement(new Announcement("Week 13 hell week..."));
        announcementSessionBeanLocal.createAnnouncement(new Announcement("They're giving out welfare packs from 8-10 Nov at COM2!"));
        announcementSessionBeanLocal.createAnnouncement(new Announcement("Stay positive everyone the sem is ending soon!"));
    }
}
