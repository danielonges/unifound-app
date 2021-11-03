/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package webservices.restful;

import entity.LostFoundListing;
import entity.ModuleEntity;
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
import session.ModuleSessionBeanLocal;


@Path("module")
public class ModuleResource {

    ModuleSessionBeanLocal moduleSessionBeanLocal = lookupModuleSessionBeanLocal();

    /**
     * Creates a new instance of ModuleResource
     */
    public ModuleResource() {
    }

    @POST
    @Path("/create/{userId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createModule(ModuleEntity moduleEntity, @PathParam("id") Long userId) {
        try {
            moduleSessionBeanLocal.createModule(moduleEntity, userId);
            return Response.status(200).entity(moduleEntity).type(MediaType.APPLICATION_JSON).build();
        } catch (UserNotFoundException ex) {
            JsonObject exception = Json.createObjectBuilder()
                    .add("error", ex.getMessage())
                    .build();
            return Response.status(404).entity(exception)
                    .type(MediaType.APPLICATION_JSON).build();
        }
    }

    @GET
    @Path("/allmodules")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllModules() {
        return Response.ok().entity(moduleSessionBeanLocal.getAllModules()).build();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getModule(@PathParam("id") Long moduleId) {
        ModuleEntity moduleEntity = moduleSessionBeanLocal.getModule(moduleId);

        return Response.status(200).entity(moduleEntity).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteModule(@PathParam("id") Long moduleId) {

        moduleSessionBeanLocal.deleteModule(moduleId);
        return Response.status(204).build();

    }

    @PUT
    @Path("/edit/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editModule(@PathParam("id") Long moduleId, ModuleEntity moduleEntity) {
        moduleEntity.setId(moduleId);
        moduleSessionBeanLocal.updateModule(moduleEntity);

        return Response.status(200).entity(moduleEntity).type(MediaType.APPLICATION_JSON).build();

    }

    private ModuleSessionBeanLocal lookupModuleSessionBeanLocal() {
        try {
            javax.naming.Context c = new InitialContext();
            return (ModuleSessionBeanLocal) c.lookup("java:global/UniFound/UniFound-ejb/ModuleSessionBean!session.ModuleSessionBeanLocal");
        } catch (NamingException ne) {
            Logger.getLogger(getClass().getName()).log(Level.SEVERE, "exception caught", ne);
            throw new RuntimeException(ne);
        }
    }

}
