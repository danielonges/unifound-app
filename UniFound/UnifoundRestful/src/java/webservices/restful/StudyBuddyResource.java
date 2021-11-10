/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

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

@Path("studybuddy")
public class StudyBuddyResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    StudyBuddySessionBeanLocal studyBuddySessionBeanLocal = lookupStudyBuddySessionBeanLocal();

    /**
     * Creates a new instance of StudyBuddyResource
     */
    public StudyBuddyResource() {
    }

    @POST
    @Path("/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createStudyBuddyListing(StudyBuddyListing studyBuddyListing, @PathParam("userId") Long userId) {
        try {

            UserEntity userEntity = userSessionLocal.getUser(userId);
            studyBuddyListing.setStudyListingOwner(userEntity);
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
    @Path("/search/{module}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getStudyListingsByModule(@PathParam("module") String module) {
        if (module.length() > 0) {
            List<StudyBuddyListing> studyBuddyListings = studyBuddySessionBeanLocal.getStudyListingsByModule(module);
         
            return Response.status(200).entity(studyBuddyListings).build();
        } else {
            List<StudyBuddyListing> studyBuddyListings = studyBuddySessionBeanLocal.getAllStudyBuddyListing();
            return Response.status(200).entity(studyBuddyListings).build();
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllStudyBuddyListings() {
        List<StudyBuddyListing> studyBuddyListings = studyBuddySessionBeanLocal.getAllStudyBuddyListing();
        
        return Response.status(200).entity(studyBuddyListings).build();
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

    @PUT
    @Path("/{listingId}/addUser/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addUserToStudyListing(@PathParam("listingId") Long studyBuddyListingId, @PathParam("userId") Long userId, StudyBuddyListing studyBuddyListing) {
        try {
            studyBuddyListing.setId(studyBuddyListingId);
            UserEntity user = userSessionLocal.getUser(userId);
            boolean check = false;
            for (int i = 0; i < studyBuddyListing.getUsers().size(); i++) {
                if (studyBuddyListing.getUsers().get(i).getId() == userId) {
                    check = true;
                }
            }
            if (check) {
                JsonObject exception = Json.createObjectBuilder()
                        .add("error", "User is already in the study group!")
                        .build();
                return Response.status(404).entity(exception).build();
            } else {

                studyBuddyListing.getUsers().add(user);
                studyBuddySessionBeanLocal.updateStudyBuddyListing(studyBuddyListing);
                return Response.status(200).entity(studyBuddyListing).type(MediaType.APPLICATION_JSON).build();
            }
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }

    }

    @PUT
    @Path("/{listingId}/removeUser/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response removeUserFromStudyListing(@PathParam("listingId") Long studyBuddyListingId, @PathParam("userId") Long userId, StudyBuddyListing studyBuddyListing) {
        try {
            studyBuddyListing.setId(studyBuddyListingId);
            UserEntity user = userSessionLocal.getUser(userId);
            for (int i = 0; i < studyBuddyListing.getUsers().size(); i++) {
                if (studyBuddyListing.getUsers().get(i).getId() == userId) {
                    studyBuddyListing.getUsers().remove(i);
                }
            }

            System.out.println(userId + "*************");
            studyBuddySessionBeanLocal.updateStudyBuddyListing(studyBuddyListing);

            return Response.status(200).entity(studyBuddyListing).type(MediaType.APPLICATION_JSON).build();

        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception).build();
        }

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
