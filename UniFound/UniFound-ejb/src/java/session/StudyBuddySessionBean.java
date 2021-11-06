/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.StudyBuddyListing;
import entity.UserEntity;
import exception.UserNotFoundException;
import java.util.List;
import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;


@Stateless
public class StudyBuddySessionBean implements StudyBuddySessionBeanLocal {

    @PersistenceContext
    private EntityManager em;
    
   

    @Override
    public void createStudyBuddyListing(StudyBuddyListing s)  {
        em.persist(s);
    }
    
  // getAllStudyBuddies
    
     @Override
    public StudyBuddyListing getStudyBuddyListing(Long sId) throws NoResultException {
       StudyBuddyListing s = em.find(StudyBuddyListing.class,
                 sId);
        if (s != null) {
            return s;
        } else {
            throw new NoResultException("StudyBuddyListing Not found");
        }
    }
    
    
  @Override
    public List<StudyBuddyListing> getAllStudyBuddyListing() {
        Query q;
        q = em.createQuery("SELECT s FROM StudyBuddyListing s");
        return q.getResultList();
    }
    
     @Override
    public void deleteStudyBuddyListing(Long sId) throws NoResultException {
        StudyBuddyListing s = getStudyBuddyListing(sId);
        em.remove(s);
    }
    
    @Override
    public void updateStudyBuddyListing(StudyBuddyListing studyBuddyListing) {
         StudyBuddyListing s = getStudyBuddyListing(studyBuddyListing.getId());
         em.merge(studyBuddyListing);
    }

}
