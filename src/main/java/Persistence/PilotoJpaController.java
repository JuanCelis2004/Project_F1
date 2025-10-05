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
import Model.Escuderia;
import Model.Temporada;
import Model.HistorialCarrera;
import Model.Piloto;
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
public class PilotoJpaController implements Serializable {

    public PilotoJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public PilotoJpaController(){
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(Piloto piloto) {
        if (piloto.getHistorialCarreras() == null) {
            piloto.setHistorialCarreras(new ArrayList<HistorialCarrera>());
        }
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Escuderia escuderia = piloto.getEscuderia();
            if (escuderia != null) {
                escuderia = em.getReference(escuderia.getClass(), escuderia.getIdEscuderia());
                piloto.setEscuderia(escuderia);
            }
            Temporada temporada = piloto.getTemporada();
            if (temporada != null) {
                temporada = em.getReference(temporada.getClass(), temporada.getIdTemporada());
                piloto.setTemporada(temporada);
            }
            List<HistorialCarrera> attachedHistorialCarreras = new ArrayList<HistorialCarrera>();
            for (HistorialCarrera historialCarrerasHistorialCarreraToAttach : piloto.getHistorialCarreras()) {
                historialCarrerasHistorialCarreraToAttach = em.getReference(historialCarrerasHistorialCarreraToAttach.getClass(), historialCarrerasHistorialCarreraToAttach.getIdHistorial());
                attachedHistorialCarreras.add(historialCarrerasHistorialCarreraToAttach);
            }
            piloto.setHistorialCarreras(attachedHistorialCarreras);
            em.persist(piloto);
            if (escuderia != null) {
                escuderia.getPilotos().add(piloto);
                escuderia = em.merge(escuderia);
            }
            if (temporada != null) {
                temporada.getPilotos().add(piloto);
                temporada = em.merge(temporada);
            }
            for (HistorialCarrera historialCarrerasHistorialCarrera : piloto.getHistorialCarreras()) {
                Piloto oldPilotoOfHistorialCarrerasHistorialCarrera = historialCarrerasHistorialCarrera.getPiloto();
                historialCarrerasHistorialCarrera.setPiloto(piloto);
                historialCarrerasHistorialCarrera = em.merge(historialCarrerasHistorialCarrera);
                if (oldPilotoOfHistorialCarrerasHistorialCarrera != null) {
                    oldPilotoOfHistorialCarrerasHistorialCarrera.getHistorialCarreras().remove(historialCarrerasHistorialCarrera);
                    oldPilotoOfHistorialCarrerasHistorialCarrera = em.merge(oldPilotoOfHistorialCarrerasHistorialCarrera);
                }
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Piloto piloto) throws IllegalOrphanException, NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Piloto persistentPiloto = em.find(Piloto.class, piloto.getIdPiloto());
            Escuderia escuderiaOld = persistentPiloto.getEscuderia();
            Escuderia escuderiaNew = piloto.getEscuderia();
            Temporada temporadaOld = persistentPiloto.getTemporada();
            Temporada temporadaNew = piloto.getTemporada();
            List<HistorialCarrera> historialCarrerasOld = persistentPiloto.getHistorialCarreras();
            List<HistorialCarrera> historialCarrerasNew = piloto.getHistorialCarreras();
            List<String> illegalOrphanMessages = null;
            for (HistorialCarrera historialCarrerasOldHistorialCarrera : historialCarrerasOld) {
                if (!historialCarrerasNew.contains(historialCarrerasOldHistorialCarrera)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain HistorialCarrera " + historialCarrerasOldHistorialCarrera + " since its piloto field is not nullable.");
                }
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            if (escuderiaNew != null) {
                escuderiaNew = em.getReference(escuderiaNew.getClass(), escuderiaNew.getIdEscuderia());
                piloto.setEscuderia(escuderiaNew);
            }
            if (temporadaNew != null) {
                temporadaNew = em.getReference(temporadaNew.getClass(), temporadaNew.getIdTemporada());
                piloto.setTemporada(temporadaNew);
            }
            List<HistorialCarrera> attachedHistorialCarrerasNew = new ArrayList<HistorialCarrera>();
            for (HistorialCarrera historialCarrerasNewHistorialCarreraToAttach : historialCarrerasNew) {
                historialCarrerasNewHistorialCarreraToAttach = em.getReference(historialCarrerasNewHistorialCarreraToAttach.getClass(), historialCarrerasNewHistorialCarreraToAttach.getIdHistorial());
                attachedHistorialCarrerasNew.add(historialCarrerasNewHistorialCarreraToAttach);
            }
            historialCarrerasNew = attachedHistorialCarrerasNew;
            piloto.setHistorialCarreras(historialCarrerasNew);
            piloto = em.merge(piloto);
            if (escuderiaOld != null && !escuderiaOld.equals(escuderiaNew)) {
                escuderiaOld.getPilotos().remove(piloto);
                escuderiaOld = em.merge(escuderiaOld);
            }
            if (escuderiaNew != null && !escuderiaNew.equals(escuderiaOld)) {
                escuderiaNew.getPilotos().add(piloto);
                escuderiaNew = em.merge(escuderiaNew);
            }
            if (temporadaOld != null && !temporadaOld.equals(temporadaNew)) {
                temporadaOld.getPilotos().remove(piloto);
                temporadaOld = em.merge(temporadaOld);
            }
            if (temporadaNew != null && !temporadaNew.equals(temporadaOld)) {
                temporadaNew.getPilotos().add(piloto);
                temporadaNew = em.merge(temporadaNew);
            }
            for (HistorialCarrera historialCarrerasNewHistorialCarrera : historialCarrerasNew) {
                if (!historialCarrerasOld.contains(historialCarrerasNewHistorialCarrera)) {
                    Piloto oldPilotoOfHistorialCarrerasNewHistorialCarrera = historialCarrerasNewHistorialCarrera.getPiloto();
                    historialCarrerasNewHistorialCarrera.setPiloto(piloto);
                    historialCarrerasNewHistorialCarrera = em.merge(historialCarrerasNewHistorialCarrera);
                    if (oldPilotoOfHistorialCarrerasNewHistorialCarrera != null && !oldPilotoOfHistorialCarrerasNewHistorialCarrera.equals(piloto)) {
                        oldPilotoOfHistorialCarrerasNewHistorialCarrera.getHistorialCarreras().remove(historialCarrerasNewHistorialCarrera);
                        oldPilotoOfHistorialCarrerasNewHistorialCarrera = em.merge(oldPilotoOfHistorialCarrerasNewHistorialCarrera);
                    }
                }
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = piloto.getIdPiloto();
                if (findPiloto(id) == null) {
                    throw new NonexistentEntityException("The piloto with id " + id + " no longer exists.");
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
            Piloto piloto;
            try {
                piloto = em.getReference(Piloto.class, id);
                piloto.getIdPiloto();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The piloto with id " + id + " no longer exists.", enfe);
            }
            List<String> illegalOrphanMessages = null;
            List<HistorialCarrera> historialCarrerasOrphanCheck = piloto.getHistorialCarreras();
            for (HistorialCarrera historialCarrerasOrphanCheckHistorialCarrera : historialCarrerasOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Piloto (" + piloto + ") cannot be destroyed since the HistorialCarrera " + historialCarrerasOrphanCheckHistorialCarrera + " in its historialCarreras field has a non-nullable piloto field.");
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            Escuderia escuderia = piloto.getEscuderia();
            if (escuderia != null) {
                escuderia.getPilotos().remove(piloto);
                escuderia = em.merge(escuderia);
            }
            Temporada temporada = piloto.getTemporada();
            if (temporada != null) {
                temporada.getPilotos().remove(piloto);
                temporada = em.merge(temporada);
            }
            em.remove(piloto);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Piloto> findPilotoEntities() {
        return findPilotoEntities(true, -1, -1);
    }

    public List<Piloto> findPilotoEntities(int maxResults, int firstResult) {
        return findPilotoEntities(false, maxResults, firstResult);
    }

    private List<Piloto> findPilotoEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Piloto.class));
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
    
    public List<Piloto> findPilotoByAnio(int anio) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT e FROM Piloto e WHERE e.temporada.anio = :anio", Piloto.class)
                    .setParameter("anio", anio)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public Piloto findPiloto(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Piloto.class, id);
        } finally {
            em.close();
        }
    }

    public int getPilotoCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Piloto> rt = cq.from(Piloto.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
