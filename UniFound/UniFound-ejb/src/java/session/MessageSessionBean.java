/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

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
public class MessageSessionBean implements MessageSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createMessage(MessageEntity m) {
        em.persist(m);
    }

    @Override
    public List<MessageEntity> getAllMessages() {
        Query q;
        q = em.createQuery("SELECT m FROM Message m");
        return q.getResultList();
    }

    @Override
    public MessageEntity getMessage(Long mId) throws NoResultException {
        MessageEntity m = em.find(MessageEntity.class, mId);
        if (m != null) {
            return m;
        } else {
            throw new NoResultException("Message Not found");
        }
    }

    @Override
    public void deleteMessage(Long mId) throws NoResultException {
        MessageEntity m = getMessage(mId);
        em.remove(m);
    }
    
    public void updateMessage(MessageEntity message) {
        MessageEntity oldMessage = getMessage(message.getId());
        em.merge(message);
    }

}
