/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.MessageEntity;
import entity.UserEntity;
import exception.UserNotFoundException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.MessageSessionBeanLocal;
import session.UserSessionLocal;


@Path("message")
public class MessageResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    MessageSessionBeanLocal messageSessionBean = lookupMessageSessionBeanLocal();
    
    /**
     * Creates a new instance of MessageResource
     */
    public MessageResource() {
    }
    
    @POST
    @Path("chat/{id}/{chatId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createMessageEntity(MessageEntity messageEntity,@PathParam("id") Long userId, @PathParam("chatId") Long chatId) {
        try {
            UserEntity userEntity = userSessionLocal.getUser(userId);
            messageEntity.setUsername(userEntity.getName());
            messageSessionBean.createMessage(messageEntity,chatId);
            return Response.status(200).entity(messageEntity).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMessage(@PathParam("id") Long messageId) {
      MessageEntity messageEntity = messageSessionBean.getMessage(messageId);
        
        return Response.status(200).entity(messageEntity).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteMessage(@PathParam("id") Long messageId) {
        messageSessionBean.deleteMessage(messageId);
        return Response.status(204).build();     
    }
    
    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editMessage(@PathParam("id") Long messageId, MessageEntity messageEntity) {
        messageEntity.setId(messageId);
        messageSessionBean.updateMessage(messageEntity);
        return Response.status(200).entity(messageEntity).type(MediaType.APPLICATION_JSON).build();     
    }

    private MessageSessionBeanLocal lookupMessageSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (MessageSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/MessageSessionBean!session.MessageSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    private UserSessionLocal lookupUserSessionLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (UserSessionLocal) c.lookup("java:global/UniFound/UniFound-ejb/UserSession!session.UserSessionLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

    
}
