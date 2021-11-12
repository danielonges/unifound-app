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
import javax.ejb.EJB;
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
public class ChatSessionBean implements ChatSessionBeanLocal {

    @EJB(name = "UserSessionLocal")
    private UserSessionLocal userSessionLocal;

    @PersistenceContext(name = "UniFound-ejbPU")
    private EntityManager em;

    @Override
    public void createChat(Chat c, UserEntity user) throws UserNotFoundException {
        c.setOwnerId(user.getId());
        em.persist(c);
        em.flush();
        user.getChats().add(c);
        userSessionLocal.updateUser(user);
    }
    
    @Override
    public void addToChat(Chat c, UserEntity user) throws UserNotFoundException {
        user.getChats().add(c);
        userSessionLocal.updateUser(user);
    }

    @Override
    public List<UserEntity> getAllUsersFromChat(Long cId) throws NoResultException {
        Chat c = getChat(cId);
        Query q = em.createQuery("SELECT u FROM UserEntity u WHERE :inChat MEMBER OF u.chats");
        q.setParameter("inChat", c);
        return q.getResultList();
    }

    @Override
    public List<Chat> getUserChats(Long uId) throws UserNotFoundException {
        List<Chat> chats = userSessionLocal.getUser(uId).getChats();
        return chats;
    }

    @Override
    public List<MessageEntity> getAllMessages(Long cId) throws NoResultException {
        Chat chat = getChat(cId);
        List<MessageEntity> messages = chat.getMessages();
        return messages;
    }

    @Override
    public Chat getChat(Long cId) throws NoResultException {
        Chat c = em.find(Chat.class, cId);
        if (c != null) {
            return c;
        } else {
            throw new NoResultException("Chat Not found");
        }
    }

    @Override
    public List<Chat> getAllChats() {
        Query q;
        q = em.createQuery("SELECT c FROM Chat c");
        return q.getResultList();
    }

    @Override
    public void deleteChat(Long cId, Long userId) throws NoResultException, UserNotFoundException {
        Chat c = getChat(cId);

        UserEntity userEntity = userSessionLocal.getUser(userId);
        userEntity.getChats().remove(c);

//        em.remove(c);
    }

    @Override
    public void deleteChatForAll(Long cId) throws NoResultException, UserNotFoundException {
        Chat c = getChat(cId);
        List<UserEntity> users = getAllUsersFromChat(cId);

        for (UserEntity userEntity : users) {
            userEntity.getChats().remove(c);
        }

        em.remove(c);
    }

    /*add message to a chat, not sure if u want it like this*/
    @Override
    public void updateChat(Chat chat) throws NoResultException {
        Chat oldChat = getChat(chat.getId());
        em.merge(chat);
    }

}
