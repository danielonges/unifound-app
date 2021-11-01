/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.MessageEntity;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface MessageSessionBeanLocal {

    public void createMessage(MessageEntity m);

    public MessageEntity getMessage(Long mId) throws NoResultException;

    public List<MessageEntity> getAllMessages();

    public void deleteMessage(Long mId) throws NoResultException;
    
}
