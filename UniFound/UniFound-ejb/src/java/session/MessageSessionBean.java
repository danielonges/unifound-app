/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.Chat;
import entity.MessageEntity;
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
public class MessageSessionBean implements MessageSessionBeanLocal {

    @EJB(name = "ChatSessionBeanLocal")
    private ChatSessionBeanLocal chatSessionBeanLocal;

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createMessage(MessageEntity m, Long chatId) {
        Chat chat = chatSessionBeanLocal.getChat(chatId);
        chat.getMessages().add(m);
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
       

        Query query = em.createQuery("SELECT c FROM Chat c WHERE :message MEMBER OF c.messages");
        query.setParameter("message", m);

        Chat chat = (Chat) query.getSingleResult();
        m.setUserEntity(null);
        chat.getMessages().remove(m);

        em.remove(m);
    }

    @Override
    public void updateMessage(MessageEntity message) {
        MessageEntity oldMessage = getMessage(message.getId());
        em.merge(message);
    }

}
