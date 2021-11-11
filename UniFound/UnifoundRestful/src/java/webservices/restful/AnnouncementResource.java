/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Announcement;
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
import session.AnnouncementSessionBeanLocal;
import session.UserSessionLocal;

@Path("announcement")
public class AnnouncementResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    AnnouncementSessionBeanLocal announcementSessionBeanLocal = lookupAnnouncementSessionBeanLocal();

    /**
     * Creates a new instance of AnnouncementResource
     */
    public AnnouncementResource() {
    }

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createAnnouncement(Announcement announcement) {
        announcementSessionBeanLocal.createAnnouncement(announcement);
        return Response.ok().entity(announcement).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("/announcements")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAnnouncements() {
        return Response.ok().entity(announcementSessionBeanLocal.getAllAnnouncements()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAnnouncement(@PathParam("id") Long announcementId) {
        Announcement announcement = announcementSessionBeanLocal.getAnnouncement(announcementId);
        return Response.ok().entity(announcement).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAnnouncement(@PathParam("id") Long announcementId) {
        announcementSessionBeanLocal.deleteAnnouncement(announcementId);
        return Response.status(204).build();
    }

    @PUT
    @Path("/edit/{id}")
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
