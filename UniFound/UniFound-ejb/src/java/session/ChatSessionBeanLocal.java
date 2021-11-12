/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.MessageEntity;
import entity.UserEntity;
import exception.UserNotFoundException;

import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface ChatSessionBeanLocal {


    public Chat getChat(Long cId) throws NoResultException;

    public List<MessageEntity> getAllMessages(Long cId) throws NoResultException;

    public List<Chat> getAllChats();

    public void deleteChat(Long cId, Long userId) throws NoResultException, UserNotFoundException;

    public void updateChat(Chat c) throws NoResultException;

    public void createChat(Chat c, UserEntity user) throws UserNotFoundException;
    
    public void addToChat(Chat c, UserEntity user) throws UserNotFoundException;

    public List<UserEntity> getAllUsersFromChat(Long cId) throws NoResultException;

    public List<Chat> getUserChats(Long uId) throws UserNotFoundException;

    public void deleteChatForAll(Long cId) throws NoResultException, UserNotFoundException;

    public void createChatForLostFound(Chat c, UserEntity owner, UserEntity user) throws UserNotFoundException;
    
}
