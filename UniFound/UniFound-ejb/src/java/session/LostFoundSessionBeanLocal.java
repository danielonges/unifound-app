/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.LostFoundListing;
import exception.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

@Local
public interface LostFoundSessionBeanLocal {

    public List<LostFoundListing> getAllLostFoundListings();

    public LostFoundListing getLostFoundListing(Long lId) throws NoResultException;

    public void deleteLostFoundListing(Long lId) throws NoResultException;

    public void updateLostFoundListing(LostFoundListing l) throws NoResultException;

    public void createLostFound(LostFoundListing lostFoundListing, Long userId) throws UserNotFoundException;

    public List<LostFoundListing> getAllLostFoundListingsOfUser(Long userId) throws UserNotFoundException;
}
