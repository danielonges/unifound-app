/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.StudyBuddyListing;
import exception.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface StudyBuddySessionBeanLocal {

    public StudyBuddyListing getStudyBuddyListing(Long sId) throws NoResultException;

    public List<StudyBuddyListing> getAllStudyBuddyListing();

    public void deleteStudyBuddyListing(Long sId) throws NoResultException;

    public void updateStudyBuddyListing(StudyBuddyListing studyBuddyListing);

    public void createStudyBuddyListing(StudyBuddyListing s, Long userId) throws UserNotFoundException;
    
}
