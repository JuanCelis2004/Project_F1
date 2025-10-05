/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Persistence;

import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import Model.Temporada;
import Model.Escuderia;
import Model.PosicionConstructor;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class PosicionConstructorJpaController implements Serializable {

    public PosicionConstructorJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public PosicionConstructorJpaController(){
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(PosicionConstructor posicionConstructor) {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Temporada temporada = posicionConstructor.getTemporada();
            if (temporada != null) {
                temporada = em.getReference(temporada.getClass(), temporada.getIdTemporada());
                posicionConstructor.setTemporada(temporada);
            }
            Escuderia constructor = posicionConstructor.getConstructor();
            if (constructor != null) {
                constructor = em.getReference(constructor.getClass(), constructor.getIdEscuderia());
                posicionConstructor.setConstructor(constructor);
            }
            em.persist(posicionConstructor);
            if (temporada != null) {
                temporada.getPosicionesConstructores().add(posicionConstructor);
                temporada = em.merge(temporada);
            }
            if (constructor != null) {
                constructor.getPosicionesConstructores().add(posicionConstructor);
                constructor = em.merge(constructor);
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(PosicionConstructor posicionConstructor) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            PosicionConstructor persistentPosicionConstructor = em.find(PosicionConstructor.class, posicionConstructor.getIdPosicion());
            Temporada temporadaOld = persistentPosicionConstructor.getTemporada();
            Temporada temporadaNew = posicionConstructor.getTemporada();
            Escuderia constructorOld = persistentPosicionConstructor.getConstructor();
            Escuderia constructorNew = posicionConstructor.getConstructor();
            if (temporadaNew != null) {
                temporadaNew = em.getReference(temporadaNew.getClass(), temporadaNew.getIdTemporada());
                posicionConstructor.setTemporada(temporadaNew);
            }
            if (constructorNew != null) {
                constructorNew = em.getReference(constructorNew.getClass(), constructorNew.getIdEscuderia());
                posicionConstructor.setConstructor(constructorNew);
            }
            posicionConstructor = em.merge(posicionConstructor);
            if (temporadaOld != null && !temporadaOld.equals(temporadaNew)) {
                temporadaOld.getPosicionesConstructores().remove(posicionConstructor);
                temporadaOld = em.merge(temporadaOld);
            }
            if (temporadaNew != null && !temporadaNew.equals(temporadaOld)) {
                temporadaNew.getPosicionesConstructores().add(posicionConstructor);
                temporadaNew = em.merge(temporadaNew);
            }
            if (constructorOld != null && !constructorOld.equals(constructorNew)) {
                constructorOld.getPosicionesConstructores().remove(posicionConstructor);
                constructorOld = em.merge(constructorOld);
            }
            if (constructorNew != null && !constructorNew.equals(constructorOld)) {
                constructorNew.getPosicionesConstructores().add(posicionConstructor);
                constructorNew = em.merge(constructorNew);
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = posicionConstructor.getIdPosicion();
                if (findPosicionConstructor(id) == null) {
                    throw new NonexistentEntityException("The posicionConstructor with id " + id + " no longer exists.");
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
            PosicionConstructor posicionConstructor;
            try {
                posicionConstructor = em.getReference(PosicionConstructor.class, id);
                posicionConstructor.getIdPosicion();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The posicionConstructor with id " + id + " no longer exists.", enfe);
            }
            Temporada temporada = posicionConstructor.getTemporada();
            if (temporada != null) {
                temporada.getPosicionesConstructores().remove(posicionConstructor);
                temporada = em.merge(temporada);
            }
            Escuderia constructor = posicionConstructor.getConstructor();
            if (constructor != null) {
                constructor.getPosicionesConstructores().remove(posicionConstructor);
                constructor = em.merge(constructor);
            }
            em.remove(posicionConstructor);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<PosicionConstructor> findPosicionConstructorEntities() {
        return findPosicionConstructorEntities(true, -1, -1);
    }

    public List<PosicionConstructor> findPosicionConstructorEntities(int maxResults, int firstResult) {
        return findPosicionConstructorEntities(false, maxResults, firstResult);
    }

    private List<PosicionConstructor> findPosicionConstructorEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(PosicionConstructor.class));
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
    
    public List<PosicionConstructor> findPosicionConstructorByAnio(int anio) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT e FROM PosicionConstructor e WHERE e.temporada.anio = :anio", PosicionConstructor.class)
                    .setParameter("anio", anio)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public PosicionConstructor findPosicionConstructor(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(PosicionConstructor.class, id);
        } finally {
            em.close();
        }
    }

    public int getPosicionConstructorCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<PosicionConstructor> rt = cq.from(PosicionConstructor.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
