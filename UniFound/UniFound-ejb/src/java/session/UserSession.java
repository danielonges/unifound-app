/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.LostFoundListing;
import entity.UserEntity;

import exception.InvalidLoginException;
import exception.ItemNotFoundException;

import exception.UserNotFoundException;
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
public class UserSession implements UserSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public LostFoundListing searchItem(Long iId) throws ItemNotFoundException {
        LostFoundListing item = em.find(LostFoundListing.class, iId);
        return item;
    }

    @Override
    public UserEntity getUser(Long uId) throws UserNotFoundException {
        UserEntity user = em.find(UserEntity.class, uId);

        if (user != null) {
            return user;
        } else {
            throw new UserNotFoundException();
        }
    }

    @Override
    public void updateUser(UserEntity user) throws UserNotFoundException {
        UserEntity newUser = getUser(user.getId());
        em.merge(user);

    }


    @Override
    public UserEntity retrieveUserByName(String name) throws UserNotFoundException {
        Query query = em.createQuery("SELECT s FROM UserEntity s WHERE s.name = :inName");
        query.setParameter("inName", name);
        return (UserEntity) query.getSingleResult();
    }

    @Override
    public UserEntity loginUser(String name, String password) throws InvalidLoginException, UserNotFoundException {
        UserEntity user = retrieveUserByName(name);
        if (user.getPassword().equals(password)) {
            return user;
        } else {
            throw new InvalidLoginException("Invalid Login!");
        }
    }

    @Override
    public void deleteUser(Long uId) throws NoResultException, UserNotFoundException {
        UserEntity user = getUser(uId);
        
     //   Query query = em.createQuery("SELECT u FROM Forum u WHERE :thread MEMBER OF u.threads"))
        em.remove(user);
    }
    
    

    //add to list of friends
    //delete from list of friends
    //view list of friends
}
