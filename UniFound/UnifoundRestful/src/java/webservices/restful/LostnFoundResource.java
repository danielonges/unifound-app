/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.LostFoundListing;
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
import session.LostFoundSessionBeanLocal;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author leeleonard
 */
@Path("lostnfound")
public class LostnFoundResource {
    
    UserSessionLocal userSessionLocal = lookupUserSessionLocal();
    
    LostFoundSessionBeanLocal lostFoundSessionBeanLocal = lookupLostFoundSessionBeanLocal();

    /**
     * Creates a new instance of LostnFoundResource
     */
    public LostnFoundResource() {
    }
    
    @POST
    @Path("/create/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createLostFoundListing(LostFoundListing lostFoundListing, @PathParam("userId") Long userId) {
        try {
            UserEntity userEntity = userSessionLocal.getUser(userId);
            lostFoundListing.setUser(userEntity);         
            lostFoundSessionBeanLocal.createLostFound(lostFoundListing, userId);
            return Response.status(200).entity(lostFoundListing).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Not found")
                    .build();
            
            return Response.status(404).entity(exception).build();
        }
    }
    
    @GET
    @Path("/allLFlistings")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllLostFoundListings() {
        return Response.ok().entity(lostFoundSessionBeanLocal.getAllLostFoundListings()).build();
    }
    
    @GET
    @Path("/search/{lostfound}")
     @Produces(MediaType.APPLICATION_JSON)
    public Response getLostFoundByNameOrCategory(@PathParam ("lostfound") String lostFound) {
        if(lostFound.length() > 0) {
            return Response.status(200).entity(lostFoundSessionBeanLocal.getLFListingsByNameOrCategory(lostFound)).build();
        } else {
            return Response.status(200).entity(lostFoundSessionBeanLocal.getAllLostFoundListings()).build();
        }
    }
    
    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLostFoundListing(@PathParam("id") Long lostFoundListingId) {
        LostFoundListing lostFoundListing = lostFoundSessionBeanLocal.getLostFoundListing(lostFoundListingId);
        
        return Response.status(200).entity(lostFoundListing).build();
    }
    
    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteLostFoundListing(@PathParam("id") Long lostFoundListingId) {     
        lostFoundSessionBeanLocal.deleteLostFoundListing(lostFoundListingId);
        return Response.status(204).build();  
    }    
    
    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editLostFoundListing(@PathParam("id") Long lostFoundListingId, LostFoundListing lostFoundListing) {
        lostFoundListing.setId(lostFoundListingId);
        lostFoundSessionBeanLocal.updateLostFoundListing(lostFoundListing);
        
        return Response.status(200).entity(lostFoundListing).type(MediaType.APPLICATION_JSON).build();
        
    }
    
    private LostFoundSessionBeanLocal lookupLostFoundSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (LostFoundSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/LostFoundSessionBean!session.LostFoundSessionBeanLocal");
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
