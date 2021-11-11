/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Chat;
import entity.UserEntity;
import exception.UserNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.persistence.NoResultException;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.ChatSessionBeanLocal;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author leeleonard
 */
@Path("chat")
public class ChatResource {

    @EJB
    private UserSessionLocal userSessionLocal;
    
    ChatSessionBeanLocal chatSessionBeanLocal = lookupChatSessionBeanLocal();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of ChatResource
     */
    public ChatResource() {
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createChat(@HeaderParam("userId") Long userId, Chat chat) {
        try {
            UserEntity user = userSessionLocal.getUser(userId);
            chatSessionBeanLocal.createChat(chat, user);
            return Response.status(200).entity(chat).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    
    @PUT
    @Path("/add")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addToChat(@HeaderParam("userId") Long userId, Chat chat) {
        try {
            UserEntity user = userSessionLocal.getUser(userId);
            chatSessionBeanLocal.addToChat(chat, user);
            return Response.status(204).build();
        } catch (UserNotFoundException e) {
             JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }
    

    @GET
    @Path("/{cId}/users")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsersFromChat(@PathParam("cId") Long cId) {
        try {
            List<UserEntity> users = chatSessionBeanLocal.getAllUsersFromChat(cId);
            return Response.ok(new GenericEntity<List<UserEntity>>(users) {
            }, MediaType.APPLICATION_JSON).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/user/{uId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserChats(@PathParam("uId") Long uId) {
        try {
            List<Chat> chats = chatSessionBeanLocal.getUserChats(uId);
            return Response.ok(new GenericEntity<List<Chat>>(chats) {
            }, MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", e.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getChat(@PathParam("id") Long chatId) {
        Chat chat = chatSessionBeanLocal.getChat(chatId);

        return Response.status(200).entity(chat).build();
    }

    @DELETE
    @Path("/delete-user/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteChatForUser(@PathParam("id") Long chatId, @HeaderParam("userId") Long userId) {
        try {
            chatSessionBeanLocal.deleteChat(chatId, userId);
            return Response.status(204).build();
        } catch (NoResultException | UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }
    
    @DELETE
    @Path("/delete-all/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteChatForAll(@PathParam("id") Long chatId) {
        try {
            chatSessionBeanLocal.deleteChatForAll(chatId);
            return Response.status(204).build();
        } catch (NoResultException | UserNotFoundException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editChat(@PathParam("id") Long chatId, Chat chat) {
        chat.setId(chatId);
        try {
            chatSessionBeanLocal.updateChat(chat);
            return Response.status(200).entity(chat).type(MediaType.APPLICATION_JSON).build();
        } catch (NoResultException e) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    private ChatSessionBeanLocal lookupChatSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ChatSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/ChatSessionBean!session.ChatSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

}
