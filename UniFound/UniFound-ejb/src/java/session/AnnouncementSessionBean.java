/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Announcement;
import entity.UserEntity;

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
public class AnnouncementSessionBean implements AnnouncementSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createAnnouncement(Announcement a) {
        em.persist(a);
    }

    @Override
    public List<Announcement> getAllAnnouncements() {
        Query q;
        q = em.createQuery("SELECT a FROM Announcement a");
        return q.getResultList();
    }

    @Override
    public Announcement getAnnouncement(Long aId) throws NoResultException {
        Announcement a = em.find(Announcement.class, aId);
        if (a != null) {
            return a;
        } else {
            throw new NoResultException("Chat Not found");
        }
    }

    @Override
    public void deleteAnnouncement(Long aId) throws NoResultException {
        Announcement a = getAnnouncement(aId);
        em.remove(a);
    }

    @Override
    public List<Announcement> getAnnouncementsOfUser(Long uId) {
        Query query = em.createQuery("SELECT a FROM Announcement a, IN(a.users) u WHERE u.id =:uId").setParameter("uId", uId);
        List<Announcement> aList = query.getResultList();
        return aList;
    }

    @Override
    public void updateAnnouncement(Announcement a) throws NoResultException {
        Announcement oldA = getAnnouncement(a.getId());
        em.merge(a);
    }

    @Override
    public int retrieveLikesCount(Long aId) {
        return retrieveUsersWhoLiked(aId).size();
    }

    @Override
    public List<UserEntity> retrieveUsersWhoLiked(Long aId) {
        Announcement a = getAnnouncement(aId);
        return a.getUsersLiked();
    }
}
