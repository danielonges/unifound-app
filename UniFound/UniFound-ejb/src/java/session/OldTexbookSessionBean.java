/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.OldTextbookListing;
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
public class OldTexbookSessionBean implements OldTexbookSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createOldTextbook(OldTextbookListing o) {
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
