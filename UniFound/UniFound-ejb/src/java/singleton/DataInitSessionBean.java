/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.LostFoundListing;
import entity.OldTextbookListing;
import entity.StudyBuddyListing;
import entity.UserEntity;
import enumeration.CourseEnum;
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
            userSessionLocal.createUser(new UserEntity("Hsiang Hui", "password", "lek@gmail.com", 'M', "Year 5", UserStatusEnum.APPROVED, CourseEnum.INFORMATION_SYSTEMS));
            userSessionLocal.createUser(new UserEntity("Bob", "password", "bob@gmail.com", 'M', "Year 1", UserStatusEnum.APPROVED, CourseEnum.COMPUTER_SCIENCE));
            userSessionLocal.createUser(new UserEntity("May", "password", "may@gmail.com", 'F', "Year 3", UserStatusEnum.APPROVED, CourseEnum.INFORMATION_SECURITY));
        } catch (UserAlreadyExistException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void initialiseLostFound() {
        try {
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("iPhone 13", "abc", "Electronics", "Lost at CLB 2 days ago", "CLB", "Please help me find it", "LOST"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Calculator", "def", "Electronics", "Last seen at YIH", "YIH", "Please help!", "LOST"), new Long(1));
            lostFoundSessionBeanLocal.createLostFound(new LostFoundListing("Econs Textbook", "ghi", "Education", "Found an econs textbook", "COM1", "Chat me if it's yours", "FOUND"), new Long(1));
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
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing('M', "IS3106", CourseEnum.INFORMATION_SYSTEMS, "Year 5", "CLB", 2), new Long(1));
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing('M', "CS2105", CourseEnum.COMPUTER_SCIENCE, "Year 1", "COM1", 4), new Long(2));
            studyBuddySessionBeanLocal.createStudyBuddyListing(new StudyBuddyListing('F', "CS2102", CourseEnum.INFORMATION_SECURITY, "Year 3", "HSSML", 5), new Long(3));
        } catch (UserNotFoundException ex) {
            Logger.getLogger(DataInitSessionBean.class.getName()).log(Level.SEVERE, null, ex);
        }
    }
}
