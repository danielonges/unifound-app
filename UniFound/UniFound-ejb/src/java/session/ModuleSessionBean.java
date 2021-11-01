/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package session;

import entity.ModuleEntity;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author jiajun
 */
@Stateless
public class ModuleSessionBean implements ModuleSessionBeanLocal {

    @PersistenceContext
    private EntityManager em;

    @Override
    public void createModule(ModuleEntity m) {
        em.persist(m);
    }

    @Override
    public List<ModuleEntity> getAllModules() {
        Query q;
        q = em.createQuery("SELECT m FROM ModuleEntity m");
        return q.getResultList();
    }

    @Override
    public ModuleEntity getModule(Long mId) throws NoResultException {
        ModuleEntity m = em.find(ModuleEntity.class, mId);
        if (m != null) {
            return m;
        } else {
            throw new NoResultException("Lost Found Listing Not found");
        }
    }

    @Override
    public void deleteModule(Long mId) throws NoResultException {
        ModuleEntity m = getModule(mId);
        em.remove(m);
    }

    
    @Override
    public void updateModule(ModuleEntity m) throws NoResultException {
        ModuleEntity oldM = getModule(m.getId());

       em.merge(m);
    }
}
