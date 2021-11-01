/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.MessageEntity;

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
public class ChatSessionBean implements ChatSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createChat(Chat c) {
        em.persist(c);
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
    public void deleteChat(Long cId) throws NoResultException {
        Chat c = getChat(cId);
        em.remove(c);
    }

 
    
    /*add message to a chat, not sure if u want it like this*/
     @Override
    public void updateChat(Chat chat) throws NoResultException {
        Chat oldChat = getChat(chat.getId());
        em.merge(chat);
    }

}
