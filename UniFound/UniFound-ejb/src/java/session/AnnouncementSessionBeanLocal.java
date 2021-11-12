/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Announcement;
import entity.UserEntity;

import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface AnnouncementSessionBeanLocal {
    
    public void createAnnouncement(Announcement a);
    
    public List<Announcement> getAllAnnouncements();
    
    public Announcement getAnnouncement(Long aId) throws NoResultException;
    
    public void deleteAnnouncement(Long aId) throws NoResultException;
    
    public List<Announcement> getAnnouncementsOfUser(Long uId);
    
    public void updateAnnouncement(Announcement a) throws NoResultException;

    public List<UserEntity> retrieveUsersWhoLiked(Long aId);

    public int retrieveLikesCount(Long aId);
}
