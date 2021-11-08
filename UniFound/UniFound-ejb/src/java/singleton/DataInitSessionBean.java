/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package singleton;

import entity.LostFoundListing;
import entity.OldTextbookListing;
import entity.StudyBuddyListing;
import entity.UserEntity;
import enumeration.UserStatusEnum;
import exception.UserAlreadyExistException;
import exception.UserNotFoundException;
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
import session.LostFoundSessionBeanLocal;
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
            userSessionLocal.createUser(new UserEntity("Hsiang Hui", "password", "lek@gmail.com", "Male", "Year 5", UserStatusEnum.APPROVED, "Information Systems"));
            userSessionLocal.createUser(new UserEntity("Bob", "password", "bob@gmail.com", "Male", "Year 1", UserStatusEnum.APPROVED, "Computer Science"));
            userSessionLocal.createUser(new UserEntity("May", "password", "may@gmail.com", "Female", "Year 3", UserStatusEnum.APPROVED, "Information Security"));
        } catch (UserAlreadyExistException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initialiseLostFound() {
        try {
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("iPhone 13", "Lost at CLB 2 days ago", "CLB", "Please help me find it", "lost"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Calculator", "Last seen at YIH", "YIH", "Please help!", "lost"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Econs Textbook", "Found an econs textbook", "COM1", "Chat me if it's yours", "found"), new Long(1));
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
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing("Female", "CS2102", "Information Security", "Year 3", "HSSML", 5,userSessionLocal.getUser(3L)) );
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
