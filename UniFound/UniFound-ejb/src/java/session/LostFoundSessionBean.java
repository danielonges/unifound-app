/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.LostFoundListing;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author jiajun
 */
@Stateless
public class LostFoundSessionBean implements LostFoundSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createLostFound(LostFoundListing lostFoundListing) {
        em.persist(lostFoundListing);
    }

    @Override
    public List<LostFoundListing> getAllLostFoundListings() {
        Query q;
        q = em.createQuery("SELECT l FROM LostFoundListing l");
        return q.getResultList();
    }

    @Override
    public LostFoundListing getLostFoundListing(Long lId) throws NoResultException {
        LostFoundListing l = em.find(LostFoundListing.class, lId);
        if (l != null) {
            return l;
        } else {
            throw new NoResultException("Lost Found Listing Not found");
        }
    }

    @Override
    public void deleteLostFoundListing(Long lId) throws NoResultException {
        LostFoundListing l = getLostFoundListing(lId);
        em.remove(l);
    }

    

    @Override
    public void updateLostFoundListing(LostFoundListing l) throws NoResultException {
        LostFoundListing oldL = getLostFoundListing(l.getId());
        em.merge(l);
    }
    
}
