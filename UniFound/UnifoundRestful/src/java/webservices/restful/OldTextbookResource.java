/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.ModuleEntity;
import entity.OldTextbookListing;
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
import session.UserSessionLocal;
import session.OldTextbookSessionBeanLocal;


@Path("oldtextbook")
public class OldTextbookResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    OldTextbookSessionBeanLocal oldTexbookSessionBeanLocal = lookupOldTexbookSessionBeanLocal();
    
    /**
     * Creates a new instance of OldTextbookResource
     */
    public OldTextbookResource() {
    }
    
    @POST
    @Path("/create/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createTextBookListing(OldTextbookListing oldTextbookListing, @PathParam("userId") Long userId) {
        try {
            UserEntity userEntity = userSessionLocal.getUser(userId);
            oldTextbookListing.setUserEntity(userEntity);          
            oldTexbookSessionBeanLocal.createOldTextbook(oldTextbookListing, userId);
            return Response.status(200).entity(oldTextbookListing).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();          
            return Response.status(404).entity(exception).build();
        }
    }

    @GET
    @Path("/alltextbooks")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllTextbookListings() {
        return Response.ok().entity(oldTexbookSessionBeanLocal.getAllOldTextbookListings()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTextBookListing(@PathParam("id") Long textBookListingId) {
        OldTextbookListing oldTextbookListing = oldTexbookSessionBeanLocal.getOldTextbookListing(textBookListingId);

        return Response.status(200).entity(oldTextbookListing).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTextbookListing(@PathParam("id") Long textbookListingId) {

        oldTexbookSessionBeanLocal.deleteOldTextbookListing(textbookListingId);
        return Response.status(204).build();

    }

    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editTextbookListing(@PathParam("id") Long textbookListingId, OldTextbookListing oldTextbookListing) {
        oldTextbookListing.setId(textbookListingId);
        oldTexbookSessionBeanLocal.updateOldTextbookListing(oldTextbookListing);

        return Response.status(200).entity(oldTextbookListing).type(MediaType.APPLICATION_JSON).build();

    }

    private OldTextbookSessionBeanLocal lookupOldTexbookSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (OldTextbookSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/OldTexbookSessionBean!session.OldTexbookSessionBeanLocal");
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
