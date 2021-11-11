/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.Chat;
import entity.MessageEntity;
import entity.UserEntity;
import exception.InvalidLoginException;
import exception.UserAlreadyExistException;
import exception.UserNotFoundException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.json.Json;
import javax.json.JsonObject;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import session.UserSessionLocal;

/**
 * REST Web Service
 *
 * @author leeleonard
 */
@Path("user")
public class UserResource {

    UserSessionLocal userSessionLocal = lookupUserSessionLocal();

    @Context
    private UriInfo context;

    /**
     * Creates a new instance of UserResource
     */
    public UserResource() {
    }

//    @GET
//    @Produces(MediaType.APPLICATION_JSON)
//    public Response getAllUsers() {
//       
//    }
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response userLogin(UserEntity userEntity) {
        String password = userEntity.getPassword();
        String email = userEntity.getEmail();
        try {
            userEntity = userSessionLocal.loginUser(email, password);
            return Response.status(200).entity(userEntity).build();
        } catch (InvalidLoginException | UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", "Username or password is incorrect!")
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createUser(UserEntity userEntity) {
        try {
            userSessionLocal.createUser(userEntity);
            return Response.status(200).entity(userEntity).type(MediaType.APPLICATION_JSON).build();
        } catch (UserAlreadyExistException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserEntity(@PathParam("id") Long userId) {

        try {
            UserEntity user = userSessionLocal.getUser(userId);
            return Response.status(200).entity(user).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editUserProfile(@PathParam("id") Long userId, UserEntity userEntity) {
        userEntity.setId(userId);

        try {
            userSessionLocal.updateUser(userEntity);
            return Response.status(200).entity(userEntity).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();

            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
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
