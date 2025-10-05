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
import Model.Carrera;
import Model.HistorialCarrera;
import Model.Piloto;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.List;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class HistorialCarreraJpaController implements Serializable {

    public HistorialCarreraJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public HistorialCarreraJpaController() {
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(HistorialCarrera historialCarrera) {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Carrera carrera = historialCarrera.getCarrera();
            if (carrera != null) {
                carrera = em.getReference(carrera.getClass(), carrera.getIdCarrera());
                historialCarrera.setCarrera(carrera);
            }
            Piloto piloto = historialCarrera.getPiloto();
            if (piloto != null) {
                piloto = em.getReference(piloto.getClass(), piloto.getIdPiloto());
                historialCarrera.setPiloto(piloto);
            }
            em.persist(historialCarrera);
            if (carrera != null) {
                carrera.getHistorialCarreras().add(historialCarrera);
                carrera = em.merge(carrera);
            }
            if (piloto != null) {
                piloto.getHistorialCarreras().add(historialCarrera);
                piloto = em.merge(piloto);
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(HistorialCarrera historialCarrera) throws NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            HistorialCarrera persistentHistorialCarrera = em.find(HistorialCarrera.class, historialCarrera.getIdHistorial());
            Carrera carreraOld = persistentHistorialCarrera.getCarrera();
            Carrera carreraNew = historialCarrera.getCarrera();
            Piloto pilotoOld = persistentHistorialCarrera.getPiloto();
            Piloto pilotoNew = historialCarrera.getPiloto();
            if (carreraNew != null) {
                carreraNew = em.getReference(carreraNew.getClass(), carreraNew.getIdCarrera());
                historialCarrera.setCarrera(carreraNew);
            }
            if (pilotoNew != null) {
                pilotoNew = em.getReference(pilotoNew.getClass(), pilotoNew.getIdPiloto());
                historialCarrera.setPiloto(pilotoNew);
            }
            historialCarrera = em.merge(historialCarrera);
            if (carreraOld != null && !carreraOld.equals(carreraNew)) {
                carreraOld.getHistorialCarreras().remove(historialCarrera);
                carreraOld = em.merge(carreraOld);
            }
            if (carreraNew != null && !carreraNew.equals(carreraOld)) {
                carreraNew.getHistorialCarreras().add(historialCarrera);
                carreraNew = em.merge(carreraNew);
            }
            if (pilotoOld != null && !pilotoOld.equals(pilotoNew)) {
                pilotoOld.getHistorialCarreras().remove(historialCarrera);
                pilotoOld = em.merge(pilotoOld);
            }
            if (pilotoNew != null && !pilotoNew.equals(pilotoOld)) {
                pilotoNew.getHistorialCarreras().add(historialCarrera);
                pilotoNew = em.merge(pilotoNew);
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = historialCarrera.getIdHistorial();
                if (findHistorialCarrera(id) == null) {
                    throw new NonexistentEntityException("The historialCarrera with id " + id + " no longer exists.");
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
            HistorialCarrera historialCarrera;
            try {
                historialCarrera = em.getReference(HistorialCarrera.class, id);
                historialCarrera.getIdHistorial();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The historialCarrera with id " + id + " no longer exists.", enfe);
            }
            Carrera carrera = historialCarrera.getCarrera();
            if (carrera != null) {
                carrera.getHistorialCarreras().remove(historialCarrera);
                carrera = em.merge(carrera);
            }
            Piloto piloto = historialCarrera.getPiloto();
            if (piloto != null) {
                piloto.getHistorialCarreras().remove(historialCarrera);
                piloto = em.merge(piloto);
            }
            em.remove(historialCarrera);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<HistorialCarrera> findHistorialCarreraEntities() {
        return findHistorialCarreraEntities(true, -1, -1);
    }

    public List<HistorialCarrera> findHistorialCarreraEntities(int maxResults, int firstResult) {
        return findHistorialCarreraEntities(false, maxResults, firstResult);
    }

    private List<HistorialCarrera> findHistorialCarreraEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(HistorialCarrera.class));
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

    public List<HistorialCarrera> findHistorialCarreraByAnio(int anio) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery(
                    "SELECT h FROM HistorialCarrera h "
                    + "JOIN h.piloto p "
                    + "JOIN p.temporada t "
                    + "WHERE t.anio = :anio", HistorialCarrera.class)
                    .setParameter("anio", anio)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public HistorialCarrera findHistorialCarrera(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(HistorialCarrera.class, id);
        } finally {
            em.close();
        }
    }

    public int getHistorialCarreraCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<HistorialCarrera> rt = cq.from(HistorialCarrera.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }

}
