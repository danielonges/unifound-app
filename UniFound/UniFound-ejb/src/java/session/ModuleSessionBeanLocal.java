/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.ModuleEntity;
import java.util.List;
import javax.ejb.Local;
import javax.persistence.NoResultException;

/**
 *
 * @author jiajun
 */
@Local
public interface ModuleSessionBeanLocal {

    public void createModule(ModuleEntity m);

    public List<ModuleEntity> getAllModules();

    public ModuleEntity getModule(Long mId) throws NoResultException;

    public void deleteModule(Long mId) throws NoResultException;


    public void updateModule(ModuleEntity m) throws NoResultException;

}
