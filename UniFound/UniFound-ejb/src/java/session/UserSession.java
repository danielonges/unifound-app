/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.UserEntity;

import exception.InvalidLoginException;
import exception.UserAlreadyExistException;

import exception.UserNotFoundException;
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
public class UserSession implements UserSessionLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createUser(UserEntity userEntity) throws UserAlreadyExistException {

        try {
            Query query = em.createQuery("SELECT u from UserEntity u WHERE u.email=:inEmail");
            query.setParameter("inEmail", userEntity.getEmail());
            query.getSingleResult();
            throw new UserAlreadyExistException("Email is in use!");
        } catch (NoResultException ex) {
            em.persist(userEntity);

        }
    }

    @Override
    public UserEntity retrieveUserById(Long userId) throws UserNotFoundException {
        UserEntity u = em.find(UserEntity.class, userId);

        if (u != null) {
            return u;
        } else {
            throw new UserNotFoundException("User ID" + userId + " does not exist!");
        }
    }

    @Override
    public List<UserEntity> retrieveAllUsers() {
        Query query = em.createQuery("SELECT u FROM UserEntity u");
        return query.getResultList();
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
    public UserEntity retrieveUserByEmail(String email) throws UserNotFoundException {
        Query query = em.createQuery("SELECT s FROM UserEntity s WHERE s.email = :inEmail");
        query.setParameter("inEmail", email);
        return (UserEntity) query.getSingleResult();
    }

    @Override
    public UserEntity loginUser(String email, String password) throws InvalidLoginException, UserNotFoundException {
        Query q = em.createQuery("SELECT u from UserEntity u WHERE u.email = :inEmail AND u.password = :inPassword");
        q.setParameter("inEmail", email);
        q.setParameter("inPassword", password);
        if (!q.getResultList().isEmpty()) {
            UserEntity u = retrieveUserByEmail(email);
            return u;
        } else {
            throw new UserNotFoundException("No Such User!");
        }
    }

    @Override
    public void deleteUser(Long uId) throws NoResultException, UserNotFoundException {
        UserEntity user = getUser(uId);

        em.remove(user);
    }

    //add to list of friends
    //delete from list of friends
    //view list of friends
}
