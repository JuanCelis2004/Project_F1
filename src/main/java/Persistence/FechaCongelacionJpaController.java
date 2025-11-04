/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Persistence;

import Model.FechaCongelacion;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class FechaCongelacionJpaController implements Serializable {

    public FechaCongelacionJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public FechaCongelacionJpaController() {
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(FechaCongelacion fechaCongelacion) {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            em.persist(fechaCongelacion);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(FechaCongelacion fechaCongelacion) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            fechaCongelacion = em.merge(fechaCongelacion);
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = fechaCongelacion.getId();
                if (findFechaCongelacion(id) == null) {
                    throw new NonexistentEntityException("The fechaCongelacion with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(int id) throws NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            FechaCongelacion fechaCongelacion;
            try {
                fechaCongelacion = em.getReference(FechaCongelacion.class, id);
                fechaCongelacion.getId();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The fechaCongelacion with id " + id + " no longer exists.", enfe);
            }
            em.remove(fechaCongelacion);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<FechaCongelacion> findFechaCongelacionEntities() {
        return findFechaCongelacionEntities(true, -1, -1);
    }

    public List<FechaCongelacion> findFechaCongelacionEntities(int maxResults, int firstResult) {
        return findFechaCongelacionEntities(false, maxResults, firstResult);
    }

    private List<FechaCongelacion> findFechaCongelacionEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(FechaCongelacion.class));
            Query q = em.createQuery(cq);
            if (!all) {
                q.setMaxResults(maxResults);
                q.setFirstResult(firstResult);
            }
            return q.getResultList();
        } finally {
            em.close();
        }
    }

    public FechaCongelacion findFechaCongelacion(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(FechaCongelacion.class, id);
        } finally {
            em.close();
        }
    }

    public int getFechaCongelacionCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<FechaCongelacion> rt = cq.from(FechaCongelacion.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
