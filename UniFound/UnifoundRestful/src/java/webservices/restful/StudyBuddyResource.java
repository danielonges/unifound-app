/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.OldTextbookListing;
import entity.StudyBuddyListing;
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
import session.StudyBuddySessionBeanLocal;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author leeleonard
 */
@Path("studybuddy")
public class StudyBuddyResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    StudyBuddySessionBeanLocal studyBuddySessionBeanLocal = lookupStudyBuddySessionBeanLocal();
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of StudyBuddyResource
     */
    public StudyBuddyResource() {
    }
    
    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createStudyBuddyListing(StudyBuddyListing studyBuddyListing, @PathParam("id") Long userId) {
        try {
            UserEntity userEntity = userSessionLocal.getUser(userId);
            studyBuddyListing.setUserEntity(userEntity);
            
            studyBuddySessionBeanLocal.createStudyBuddyListing(studyBuddyListing);
            return Response.status(200).entity(studyBuddyListing).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            
            return Response.status(404).entity(exception).build();
        }

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<StudyBuddyListing> getAllStudyBuddyListings() {
        return studyBuddySessionBeanLocal.getAllStudyBuddyListing();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudyBuddyListing(@PathParam("id") Long studyBuddyListingId) {
       StudyBuddyListing studyBuddyListing = studyBuddySessionBeanLocal.getStudyBuddyListing(studyBuddyListingId);

        return Response.status(200).entity(studyBuddyListing).build();
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteStudyBuddyListing(@PathParam("id") Long studyBuddyListingId) {

        studyBuddySessionBeanLocal.deleteStudyBuddyListing(studyBuddyListingId);
        return Response.status(204).build();

    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editStudyBuddyListing(@PathParam("id") Long studyBuddyListingId, StudyBuddyListing studyBuddyListing) {
        studyBuddyListing.setId(studyBuddyListingId);
        studyBuddySessionBeanLocal.updateStudyBuddyListing(studyBuddyListing);

        return Response.status(200).entity(studyBuddyListing).type(MediaType.APPLICATION_JSON).build();

    }

    private StudyBuddySessionBeanLocal lookupStudyBuddySessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (StudyBuddySessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/StudyBuddySessionBean!session.StudyBuddySessionBeanLocal");
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
