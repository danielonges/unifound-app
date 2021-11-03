/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.OldTextbookListing;
import exception.UserNotFoundException;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;


@Local
public interface OldTextbookSessionBeanLocal {

    public List<OldTextbookListing> getAllOldTextbookListings();

    public OldTextbookListing getOldTextbookListing(Long oId) throws NoResultException;

    public void deleteOldTextbookListing(Long oId) throws NoResultException;
    
    public void updateOldTextbookListing(OldTextbookListing o) throws NoResultException;

    public void createOldTextbook(OldTextbookListing o, Long userId) throws UserNotFoundException;

}
