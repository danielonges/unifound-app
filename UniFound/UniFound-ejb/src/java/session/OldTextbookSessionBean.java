/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.OldTextbookListing;
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
public class OldTextbookSessionBean implements OldTextbookSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;
    
    @EJB
    private UserSessionLocal userSessionLocal;

    @Override
    public void createOldTextbook(OldTextbookListing o, Long userId) throws UserNotFoundException {
        UserEntity u = userSessionLocal.retrieveUserById(userId);
        o.setUserEntity(u);
        em.persist(o);
    }

    @Override
    public List<OldTextbookListing> getAllOldTextbookListings() {
        Query q;
        q = em.createQuery("SELECT o FROM OldTextbookListing o");
        return q.getResultList();
    }

    @Override
    public OldTextbookListing getOldTextbookListing(Long oId) throws NoResultException {
        OldTextbookListing o = em.find(OldTextbookListing.class, oId);
        if (o != null) {
            return o;
        } else {
            throw new NoResultException("Old Textbook Listing Not found");
        }
    }

    @Override
    public void deleteOldTextbookListing(Long oId) throws NoResultException {
        OldTextbookListing o = getOldTextbookListing(oId);
        em.remove(o);
    }

    

    @Override
    public void updateOldTextbookListing(OldTextbookListing o) throws NoResultException {
        OldTextbookListing oldO = getOldTextbookListing(o.getId());
        em.merge(o);
    }
}
