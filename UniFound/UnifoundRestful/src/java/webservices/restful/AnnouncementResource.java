/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Announcement;
import entity.UserEntity;
import exception.UserNotFoundException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
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
import session.AnnouncementSessionBeanLocal;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author leeleonard
 */
@Path("announcement")
public class AnnouncementResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    AnnouncementSessionBeanLocal announcementSessionBeanLocal = lookupAnnouncementSessionBeanLocal();
    
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AnnouncementResource
     */
    public AnnouncementResource() {
    }
    
    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAnnouncement(Announcement announcement,@PathParam("id") Long userId) {
        try {
          UserEntity userEntity = userSessionLocal.getUser(userId);
            announcement.setUserEntity(userEntity);
        
        announcementSessionBeanLocal.createAnnouncement(announcement);
        return Response.status(200).entity(announcement).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();

            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Announcement> getAllAnnouncements() {
        return announcementSessionBeanLocal.getAllAnnouncements();
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAnnouncement(@PathParam("id") Long announcementId) {
       Announcement announcement = announcementSessionBeanLocal.getAnnouncement(announcementId);
        
        return Response.status(200).entity(announcement).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAnnouncement(@PathParam("id") Long announcementId) {
       
           announcementSessionBeanLocal.deleteAnnouncement(announcementId);
            return Response.status(204).build();
        
    } 

  
    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editAnnouncement(@PathParam("id") Long announcementId, Announcement announcement) {
        announcement.setId(announcementId);
       
            announcementSessionBeanLocal.updateAnnouncement(announcement);
            
            return Response.status(200).entity(announcement).type(MediaType.APPLICATION_JSON).build();
        
    }

    private AnnouncementSessionBeanLocal lookupAnnouncementSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (AnnouncementSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/AnnouncementSessionBean!session.AnnouncementSessionBeanLocal");
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
