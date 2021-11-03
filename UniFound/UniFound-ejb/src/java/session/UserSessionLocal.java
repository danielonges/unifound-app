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
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface UserSessionLocal {

   
    public UserEntity getUser(Long uId) throws UserNotFoundException;

    public void updateUser(UserEntity user) throws UserNotFoundException;

    public UserEntity loginUser(String name, String password) throws InvalidLoginException, UserNotFoundException;

    public UserEntity retrieveUserByName(String name) throws UserNotFoundException;

    public void deleteUser(Long uId) throws NoResultException, UserNotFoundException;

    public void createUser(UserEntity userEntity) throws UserAlreadyExistException;

    public List<UserEntity> retrieveAllUsers();

    public UserEntity retrieveUserById(Long userId) throws UserNotFoundException;

}
