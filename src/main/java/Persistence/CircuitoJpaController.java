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
import Model.Circuito;
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
public class CircuitoJpaController implements Serializable {

    public CircuitoJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public CircuitoJpaController(){
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(Circuito circuito) {
        if (circuito.getCarreras() == null) {
            circuito.setCarreras(new ArrayList<Carrera>());
        }
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            List<Carrera> attachedCarreras = new ArrayList<Carrera>();
            for (Carrera carrerasCarreraToAttach : circuito.getCarreras()) {
                carrerasCarreraToAttach = em.getReference(carrerasCarreraToAttach.getClass(), carrerasCarreraToAttach.getIdCarrera());
                attachedCarreras.add(carrerasCarreraToAttach);
            }
            circuito.setCarreras(attachedCarreras);
            em.persist(circuito);
            for (Carrera carrerasCarrera : circuito.getCarreras()) {
                Circuito oldCircuitoOfCarrerasCarrera = carrerasCarrera.getCircuito();
                carrerasCarrera.setCircuito(circuito);
                carrerasCarrera = em.merge(carrerasCarrera);
                if (oldCircuitoOfCarrerasCarrera != null) {
                    oldCircuitoOfCarrerasCarrera.getCarreras().remove(carrerasCarrera);
                    oldCircuitoOfCarrerasCarrera = em.merge(oldCircuitoOfCarrerasCarrera);
                }
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Circuito circuito) throws IllegalOrphanException, NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Circuito persistentCircuito = em.find(Circuito.class, circuito.getIdCircuito());
            List<Carrera> carrerasOld = persistentCircuito.getCarreras();
            List<Carrera> carrerasNew = circuito.getCarreras();
            List<String> illegalOrphanMessages = null;
            for (Carrera carrerasOldCarrera : carrerasOld) {
                if (!carrerasNew.contains(carrerasOldCarrera)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain Carrera " + carrerasOldCarrera + " since its circuito field is not nullable.");
                }
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            List<Carrera> attachedCarrerasNew = new ArrayList<Carrera>();
            for (Carrera carrerasNewCarreraToAttach : carrerasNew) {
                carrerasNewCarreraToAttach = em.getReference(carrerasNewCarreraToAttach.getClass(), carrerasNewCarreraToAttach.getIdCarrera());
                attachedCarrerasNew.add(carrerasNewCarreraToAttach);
            }
            carrerasNew = attachedCarrerasNew;
            circuito.setCarreras(carrerasNew);
            circuito = em.merge(circuito);
            for (Carrera carrerasNewCarrera : carrerasNew) {
                if (!carrerasOld.contains(carrerasNewCarrera)) {
                    Circuito oldCircuitoOfCarrerasNewCarrera = carrerasNewCarrera.getCircuito();
                    carrerasNewCarrera.setCircuito(circuito);
                    carrerasNewCarrera = em.merge(carrerasNewCarrera);
                    if (oldCircuitoOfCarrerasNewCarrera != null && !oldCircuitoOfCarrerasNewCarrera.equals(circuito)) {
                        oldCircuitoOfCarrerasNewCarrera.getCarreras().remove(carrerasNewCarrera);
                        oldCircuitoOfCarrerasNewCarrera = em.merge(oldCircuitoOfCarrerasNewCarrera);
                    }
                }
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = circuito.getIdCircuito();
                if (findCircuito(id) == null) {
                    throw new NonexistentEntityException("The circuito with id " + id + " no longer exists.");
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
            Circuito circuito;
            try {
                circuito = em.getReference(Circuito.class, id);
                circuito.getIdCircuito();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The circuito with id " + id + " no longer exists.", enfe);
            }
            List<String> illegalOrphanMessages = null;
            List<Carrera> carrerasOrphanCheck = circuito.getCarreras();
            for (Carrera carrerasOrphanCheckCarrera : carrerasOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Circuito (" + circuito + ") cannot be destroyed since the Carrera " + carrerasOrphanCheckCarrera + " in its carreras field has a non-nullable circuito field.");
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            em.remove(circuito);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Circuito> findCircuitoEntities() {
        return findCircuitoEntities(true, -1, -1);
    }

    public List<Circuito> findCircuitoEntities(int maxResults, int firstResult) {
        return findCircuitoEntities(false, maxResults, firstResult);
    }

    private List<Circuito> findCircuitoEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Circuito.class));
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
    
    public List<Circuito> findCircuitoByAnio(int anio) {
    EntityManager em = getEntityManager();
    try {
        return em.createQuery(
            "SELECT c FROM Carrera ca " +
            "JOIN ca.circuito c " +
            "JOIN ca.temporada t " +
            "WHERE t.anio = :anio", Circuito.class)
            .setParameter("anio", anio)
            .getResultList();
    } finally {
        em.close();
    }
}


    public Circuito findCircuito(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Circuito.class, id);
        } finally {
            em.close();
        }
    }

    public int getCircuitoCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Circuito> rt = cq.from(Circuito.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
