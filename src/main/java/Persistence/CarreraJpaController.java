/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Persistence;

import Model.Carrera;
import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import Model.Temporada;
import Model.Circuito;
import Model.HistorialCarrera;
import Persistence.exceptions.IllegalOrphanException;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class CarreraJpaController implements Serializable {

    public CarreraJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public CarreraJpaController(){
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(Carrera carrera) {
        if (carrera.getHistorialCarreras() == null) {
            carrera.setHistorialCarreras(new ArrayList<HistorialCarrera>());
        }
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Temporada temporada = carrera.getTemporada();
            if (temporada != null) {
                temporada = em.getReference(temporada.getClass(), temporada.getIdTemporada());
                carrera.setTemporada(temporada);
            }
            Circuito circuito = carrera.getCircuito();
            if (circuito != null) {
                circuito = em.getReference(circuito.getClass(), circuito.getIdCircuito());
                carrera.setCircuito(circuito);
            }
            List<HistorialCarrera> attachedHistorialCarreras = new ArrayList<HistorialCarrera>();
            for (HistorialCarrera historialCarrerasHistorialCarreraToAttach : carrera.getHistorialCarreras()) {
                historialCarrerasHistorialCarreraToAttach = em.getReference(historialCarrerasHistorialCarreraToAttach.getClass(), historialCarrerasHistorialCarreraToAttach.getIdHistorial());
                attachedHistorialCarreras.add(historialCarrerasHistorialCarreraToAttach);
            }
            carrera.setHistorialCarreras(attachedHistorialCarreras);
            em.persist(carrera);
            if (temporada != null) {
                temporada.getCarreras().add(carrera);
                temporada = em.merge(temporada);
            }
            if (circuito != null) {
                circuito.getCarreras().add(carrera);
                circuito = em.merge(circuito);
            }
            for (HistorialCarrera historialCarrerasHistorialCarrera : carrera.getHistorialCarreras()) {
                Carrera oldCarreraOfHistorialCarrerasHistorialCarrera = historialCarrerasHistorialCarrera.getCarrera();
                historialCarrerasHistorialCarrera.setCarrera(carrera);
                historialCarrerasHistorialCarrera = em.merge(historialCarrerasHistorialCarrera);
                if (oldCarreraOfHistorialCarrerasHistorialCarrera != null) {
                    oldCarreraOfHistorialCarrerasHistorialCarrera.getHistorialCarreras().remove(historialCarrerasHistorialCarrera);
                    oldCarreraOfHistorialCarrerasHistorialCarrera = em.merge(oldCarreraOfHistorialCarrerasHistorialCarrera);
                }
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Carrera carrera) throws IllegalOrphanException, NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Carrera persistentCarrera = em.find(Carrera.class, carrera.getIdCarrera());
            Temporada temporadaOld = persistentCarrera.getTemporada();
            Temporada temporadaNew = carrera.getTemporada();
            Circuito circuitoOld = persistentCarrera.getCircuito();
            Circuito circuitoNew = carrera.getCircuito();
            List<HistorialCarrera> historialCarrerasOld = persistentCarrera.getHistorialCarreras();
            List<HistorialCarrera> historialCarrerasNew = carrera.getHistorialCarreras();
            List<String> illegalOrphanMessages = null;
            for (HistorialCarrera historialCarrerasOldHistorialCarrera : historialCarrerasOld) {
                if (!historialCarrerasNew.contains(historialCarrerasOldHistorialCarrera)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain HistorialCarrera " + historialCarrerasOldHistorialCarrera + " since its carrera field is not nullable.");
                }
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            if (temporadaNew != null) {
                temporadaNew = em.getReference(temporadaNew.getClass(), temporadaNew.getIdTemporada());
                carrera.setTemporada(temporadaNew);
            }
            if (circuitoNew != null) {
                circuitoNew = em.getReference(circuitoNew.getClass(), circuitoNew.getIdCircuito());
                carrera.setCircuito(circuitoNew);
            }
            List<HistorialCarrera> attachedHistorialCarrerasNew = new ArrayList<HistorialCarrera>();
            for (HistorialCarrera historialCarrerasNewHistorialCarreraToAttach : historialCarrerasNew) {
                historialCarrerasNewHistorialCarreraToAttach = em.getReference(historialCarrerasNewHistorialCarreraToAttach.getClass(), historialCarrerasNewHistorialCarreraToAttach.getIdHistorial());
                attachedHistorialCarrerasNew.add(historialCarrerasNewHistorialCarreraToAttach);
            }
            historialCarrerasNew = attachedHistorialCarrerasNew;
            carrera.setHistorialCarreras(historialCarrerasNew);
            carrera = em.merge(carrera);
            if (temporadaOld != null && !temporadaOld.equals(temporadaNew)) {
                temporadaOld.getCarreras().remove(carrera);
                temporadaOld = em.merge(temporadaOld);
            }
            if (temporadaNew != null && !temporadaNew.equals(temporadaOld)) {
                temporadaNew.getCarreras().add(carrera);
                temporadaNew = em.merge(temporadaNew);
            }
            if (circuitoOld != null && !circuitoOld.equals(circuitoNew)) {
                circuitoOld.getCarreras().remove(carrera);
                circuitoOld = em.merge(circuitoOld);
            }
            if (circuitoNew != null && !circuitoNew.equals(circuitoOld)) {
                circuitoNew.getCarreras().add(carrera);
                circuitoNew = em.merge(circuitoNew);
            }
            for (HistorialCarrera historialCarrerasNewHistorialCarrera : historialCarrerasNew) {
                if (!historialCarrerasOld.contains(historialCarrerasNewHistorialCarrera)) {
                    Carrera oldCarreraOfHistorialCarrerasNewHistorialCarrera = historialCarrerasNewHistorialCarrera.getCarrera();
                    historialCarrerasNewHistorialCarrera.setCarrera(carrera);
                    historialCarrerasNewHistorialCarrera = em.merge(historialCarrerasNewHistorialCarrera);
                    if (oldCarreraOfHistorialCarrerasNewHistorialCarrera != null && !oldCarreraOfHistorialCarrerasNewHistorialCarrera.equals(carrera)) {
                        oldCarreraOfHistorialCarrerasNewHistorialCarrera.getHistorialCarreras().remove(historialCarrerasNewHistorialCarrera);
                        oldCarreraOfHistorialCarrerasNewHistorialCarrera = em.merge(oldCarreraOfHistorialCarrerasNewHistorialCarrera);
                    }
                }
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = carrera.getIdCarrera();
                if (findCarrera(id) == null) {
                    throw new NonexistentEntityException("The carrera with id " + id + " no longer exists.");
                }
            }
            throw ex;
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void destroy(int id) throws IllegalOrphanException, NonexistentEntityException {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Carrera carrera;
            try {
                carrera = em.getReference(Carrera.class, id);
                carrera.getIdCarrera();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The carrera with id " + id + " no longer exists.", enfe);
            }
            List<String> illegalOrphanMessages = null;
            List<HistorialCarrera> historialCarrerasOrphanCheck = carrera.getHistorialCarreras();
            for (HistorialCarrera historialCarrerasOrphanCheckHistorialCarrera : historialCarrerasOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Carrera (" + carrera + ") cannot be destroyed since the HistorialCarrera " + historialCarrerasOrphanCheckHistorialCarrera + " in its historialCarreras field has a non-nullable carrera field.");
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            Temporada temporada = carrera.getTemporada();
            if (temporada != null) {
                temporada.getCarreras().remove(carrera);
                temporada = em.merge(temporada);
            }
            Circuito circuito = carrera.getCircuito();
            if (circuito != null) {
                circuito.getCarreras().remove(carrera);
                circuito = em.merge(circuito);
            }
            em.remove(carrera);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Carrera> findCarreraEntities() {
        return findCarreraEntities(true, -1, -1);
    }

    public List<Carrera> findCarreraEntities(int maxResults, int firstResult) {
        return findCarreraEntities(false, maxResults, firstResult);
    }

    private List<Carrera> findCarreraEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Carrera.class));
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
    
    public List<Carrera> findCarreraByAnio(int anio) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT e FROM Carrera e WHERE e.temporada.anio = :anio", Carrera.class)
                    .setParameter("anio", anio)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public Carrera findCarrera(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Carrera.class, id);
        } finally {
            em.close();
        }
    }

    public int getCarreraCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Carrera> rt = cq.from(Carrera.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
