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
import java.util.ArrayList;
import java.util.List;
import Model.Piloto;
import Model.Carrera;
import Model.PosicionConstructor;
import Model.Temporada;
import Persistence.exceptions.IllegalOrphanException;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class TemporadaJpaController implements Serializable {

    public TemporadaJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    public TemporadaJpaController(){
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(Temporada temporada) {
        if (temporada.getEscuderias() == null) {
            temporada.setEscuderias(new ArrayList<Escuderia>());
        }
        if (temporada.getPilotos() == null) {
            temporada.setPilotos(new ArrayList<Piloto>());
        }
        if (temporada.getCarreras() == null) {
            temporada.setCarreras(new ArrayList<Carrera>());
        }
        if (temporada.getPosicionesConstructores() == null) {
            temporada.setPosicionesConstructores(new ArrayList<PosicionConstructor>());
        }
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            List<Escuderia> attachedEscuderias = new ArrayList<Escuderia>();
            for (Escuderia escuderiasEscuderiaToAttach : temporada.getEscuderias()) {
                escuderiasEscuderiaToAttach = em.getReference(escuderiasEscuderiaToAttach.getClass(), escuderiasEscuderiaToAttach.getIdEscuderia());
                attachedEscuderias.add(escuderiasEscuderiaToAttach);
            }
            temporada.setEscuderias(attachedEscuderias);
            List<Piloto> attachedPilotos = new ArrayList<Piloto>();
            for (Piloto pilotosPilotoToAttach : temporada.getPilotos()) {
                pilotosPilotoToAttach = em.getReference(pilotosPilotoToAttach.getClass(), pilotosPilotoToAttach.getIdPiloto());
                attachedPilotos.add(pilotosPilotoToAttach);
            }
            temporada.setPilotos(attachedPilotos);
            List<Carrera> attachedCarreras = new ArrayList<Carrera>();
            for (Carrera carrerasCarreraToAttach : temporada.getCarreras()) {
                carrerasCarreraToAttach = em.getReference(carrerasCarreraToAttach.getClass(), carrerasCarreraToAttach.getIdCarrera());
                attachedCarreras.add(carrerasCarreraToAttach);
            }
            temporada.setCarreras(attachedCarreras);
            List<PosicionConstructor> attachedPosicionesConstructores = new ArrayList<PosicionConstructor>();
            for (PosicionConstructor posicionesConstructoresPosicionConstructorToAttach : temporada.getPosicionesConstructores()) {
                posicionesConstructoresPosicionConstructorToAttach = em.getReference(posicionesConstructoresPosicionConstructorToAttach.getClass(), posicionesConstructoresPosicionConstructorToAttach.getIdPosicion());
                attachedPosicionesConstructores.add(posicionesConstructoresPosicionConstructorToAttach);
            }
            temporada.setPosicionesConstructores(attachedPosicionesConstructores);
            em.persist(temporada);
            for (Escuderia escuderiasEscuderia : temporada.getEscuderias()) {
                Temporada oldTemporadaOfEscuderiasEscuderia = escuderiasEscuderia.getTemporada();
                escuderiasEscuderia.setTemporada(temporada);
                escuderiasEscuderia = em.merge(escuderiasEscuderia);
                if (oldTemporadaOfEscuderiasEscuderia != null) {
                    oldTemporadaOfEscuderiasEscuderia.getEscuderias().remove(escuderiasEscuderia);
                    oldTemporadaOfEscuderiasEscuderia = em.merge(oldTemporadaOfEscuderiasEscuderia);
                }
            }
            for (Piloto pilotosPiloto : temporada.getPilotos()) {
                Temporada oldTemporadaOfPilotosPiloto = pilotosPiloto.getTemporada();
                pilotosPiloto.setTemporada(temporada);
                pilotosPiloto = em.merge(pilotosPiloto);
                if (oldTemporadaOfPilotosPiloto != null) {
                    oldTemporadaOfPilotosPiloto.getPilotos().remove(pilotosPiloto);
                    oldTemporadaOfPilotosPiloto = em.merge(oldTemporadaOfPilotosPiloto);
                }
            }
            for (Carrera carrerasCarrera : temporada.getCarreras()) {
                Temporada oldTemporadaOfCarrerasCarrera = carrerasCarrera.getTemporada();
                carrerasCarrera.setTemporada(temporada);
                carrerasCarrera = em.merge(carrerasCarrera);
                if (oldTemporadaOfCarrerasCarrera != null) {
                    oldTemporadaOfCarrerasCarrera.getCarreras().remove(carrerasCarrera);
                    oldTemporadaOfCarrerasCarrera = em.merge(oldTemporadaOfCarrerasCarrera);
                }
            }
            for (PosicionConstructor posicionesConstructoresPosicionConstructor : temporada.getPosicionesConstructores()) {
                Temporada oldTemporadaOfPosicionesConstructoresPosicionConstructor = posicionesConstructoresPosicionConstructor.getTemporada();
                posicionesConstructoresPosicionConstructor.setTemporada(temporada);
                posicionesConstructoresPosicionConstructor = em.merge(posicionesConstructoresPosicionConstructor);
                if (oldTemporadaOfPosicionesConstructoresPosicionConstructor != null) {
                    oldTemporadaOfPosicionesConstructoresPosicionConstructor.getPosicionesConstructores().remove(posicionesConstructoresPosicionConstructor);
                    oldTemporadaOfPosicionesConstructoresPosicionConstructor = em.merge(oldTemporadaOfPosicionesConstructoresPosicionConstructor);
                }
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Temporada temporada) throws IllegalOrphanException, NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Temporada persistentTemporada = em.find(Temporada.class, temporada.getIdTemporada());
            List<Escuderia> escuderiasOld = persistentTemporada.getEscuderias();
            List<Escuderia> escuderiasNew = temporada.getEscuderias();
            List<Piloto> pilotosOld = persistentTemporada.getPilotos();
            List<Piloto> pilotosNew = temporada.getPilotos();
            List<Carrera> carrerasOld = persistentTemporada.getCarreras();
            List<Carrera> carrerasNew = temporada.getCarreras();
            List<PosicionConstructor> posicionesConstructoresOld = persistentTemporada.getPosicionesConstructores();
            List<PosicionConstructor> posicionesConstructoresNew = temporada.getPosicionesConstructores();
            List<String> illegalOrphanMessages = null;
            for (Escuderia escuderiasOldEscuderia : escuderiasOld) {
                if (!escuderiasNew.contains(escuderiasOldEscuderia)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain Escuderia " + escuderiasOldEscuderia + " since its temporada field is not nullable.");
                }
            }
            for (Piloto pilotosOldPiloto : pilotosOld) {
                if (!pilotosNew.contains(pilotosOldPiloto)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain Piloto " + pilotosOldPiloto + " since its temporada field is not nullable.");
                }
            }
            for (Carrera carrerasOldCarrera : carrerasOld) {
                if (!carrerasNew.contains(carrerasOldCarrera)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain Carrera " + carrerasOldCarrera + " since its temporada field is not nullable.");
                }
            }
            for (PosicionConstructor posicionesConstructoresOldPosicionConstructor : posicionesConstructoresOld) {
                if (!posicionesConstructoresNew.contains(posicionesConstructoresOldPosicionConstructor)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain PosicionConstructor " + posicionesConstructoresOldPosicionConstructor + " since its temporada field is not nullable.");
                }
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            List<Escuderia> attachedEscuderiasNew = new ArrayList<Escuderia>();
            for (Escuderia escuderiasNewEscuderiaToAttach : escuderiasNew) {
                escuderiasNewEscuderiaToAttach = em.getReference(escuderiasNewEscuderiaToAttach.getClass(), escuderiasNewEscuderiaToAttach.getIdEscuderia());
                attachedEscuderiasNew.add(escuderiasNewEscuderiaToAttach);
            }
            escuderiasNew = attachedEscuderiasNew;
            temporada.setEscuderias(escuderiasNew);
            List<Piloto> attachedPilotosNew = new ArrayList<Piloto>();
            for (Piloto pilotosNewPilotoToAttach : pilotosNew) {
                pilotosNewPilotoToAttach = em.getReference(pilotosNewPilotoToAttach.getClass(), pilotosNewPilotoToAttach.getIdPiloto());
                attachedPilotosNew.add(pilotosNewPilotoToAttach);
            }
            pilotosNew = attachedPilotosNew;
            temporada.setPilotos(pilotosNew);
            List<Carrera> attachedCarrerasNew = new ArrayList<Carrera>();
            for (Carrera carrerasNewCarreraToAttach : carrerasNew) {
                carrerasNewCarreraToAttach = em.getReference(carrerasNewCarreraToAttach.getClass(), carrerasNewCarreraToAttach.getIdCarrera());
                attachedCarrerasNew.add(carrerasNewCarreraToAttach);
            }
            carrerasNew = attachedCarrerasNew;
            temporada.setCarreras(carrerasNew);
            List<PosicionConstructor> attachedPosicionesConstructoresNew = new ArrayList<PosicionConstructor>();
            for (PosicionConstructor posicionesConstructoresNewPosicionConstructorToAttach : posicionesConstructoresNew) {
                posicionesConstructoresNewPosicionConstructorToAttach = em.getReference(posicionesConstructoresNewPosicionConstructorToAttach.getClass(), posicionesConstructoresNewPosicionConstructorToAttach.getIdPosicion());
                attachedPosicionesConstructoresNew.add(posicionesConstructoresNewPosicionConstructorToAttach);
            }
            posicionesConstructoresNew = attachedPosicionesConstructoresNew;
            temporada.setPosicionesConstructores(posicionesConstructoresNew);
            temporada = em.merge(temporada);
            for (Escuderia escuderiasNewEscuderia : escuderiasNew) {
                if (!escuderiasOld.contains(escuderiasNewEscuderia)) {
                    Temporada oldTemporadaOfEscuderiasNewEscuderia = escuderiasNewEscuderia.getTemporada();
                    escuderiasNewEscuderia.setTemporada(temporada);
                    escuderiasNewEscuderia = em.merge(escuderiasNewEscuderia);
                    if (oldTemporadaOfEscuderiasNewEscuderia != null && !oldTemporadaOfEscuderiasNewEscuderia.equals(temporada)) {
                        oldTemporadaOfEscuderiasNewEscuderia.getEscuderias().remove(escuderiasNewEscuderia);
                        oldTemporadaOfEscuderiasNewEscuderia = em.merge(oldTemporadaOfEscuderiasNewEscuderia);
                    }
                }
            }
            for (Piloto pilotosNewPiloto : pilotosNew) {
                if (!pilotosOld.contains(pilotosNewPiloto)) {
                    Temporada oldTemporadaOfPilotosNewPiloto = pilotosNewPiloto.getTemporada();
                    pilotosNewPiloto.setTemporada(temporada);
                    pilotosNewPiloto = em.merge(pilotosNewPiloto);
                    if (oldTemporadaOfPilotosNewPiloto != null && !oldTemporadaOfPilotosNewPiloto.equals(temporada)) {
                        oldTemporadaOfPilotosNewPiloto.getPilotos().remove(pilotosNewPiloto);
                        oldTemporadaOfPilotosNewPiloto = em.merge(oldTemporadaOfPilotosNewPiloto);
                    }
                }
            }
            for (Carrera carrerasNewCarrera : carrerasNew) {
                if (!carrerasOld.contains(carrerasNewCarrera)) {
                    Temporada oldTemporadaOfCarrerasNewCarrera = carrerasNewCarrera.getTemporada();
                    carrerasNewCarrera.setTemporada(temporada);
                    carrerasNewCarrera = em.merge(carrerasNewCarrera);
                    if (oldTemporadaOfCarrerasNewCarrera != null && !oldTemporadaOfCarrerasNewCarrera.equals(temporada)) {
                        oldTemporadaOfCarrerasNewCarrera.getCarreras().remove(carrerasNewCarrera);
                        oldTemporadaOfCarrerasNewCarrera = em.merge(oldTemporadaOfCarrerasNewCarrera);
                    }
                }
            }
            for (PosicionConstructor posicionesConstructoresNewPosicionConstructor : posicionesConstructoresNew) {
                if (!posicionesConstructoresOld.contains(posicionesConstructoresNewPosicionConstructor)) {
                    Temporada oldTemporadaOfPosicionesConstructoresNewPosicionConstructor = posicionesConstructoresNewPosicionConstructor.getTemporada();
                    posicionesConstructoresNewPosicionConstructor.setTemporada(temporada);
                    posicionesConstructoresNewPosicionConstructor = em.merge(posicionesConstructoresNewPosicionConstructor);
                    if (oldTemporadaOfPosicionesConstructoresNewPosicionConstructor != null && !oldTemporadaOfPosicionesConstructoresNewPosicionConstructor.equals(temporada)) {
                        oldTemporadaOfPosicionesConstructoresNewPosicionConstructor.getPosicionesConstructores().remove(posicionesConstructoresNewPosicionConstructor);
                        oldTemporadaOfPosicionesConstructoresNewPosicionConstructor = em.merge(oldTemporadaOfPosicionesConstructoresNewPosicionConstructor);
                    }
                }
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = temporada.getIdTemporada();
                if (findTemporada(id) == null) {
                    throw new NonexistentEntityException("The temporada with id " + id + " no longer exists.");
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
            Temporada temporada;
            try {
                temporada = em.getReference(Temporada.class, id);
                temporada.getIdTemporada();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The temporada with id " + id + " no longer exists.", enfe);
            }
            List<String> illegalOrphanMessages = null;
            List<Escuderia> escuderiasOrphanCheck = temporada.getEscuderias();
            for (Escuderia escuderiasOrphanCheckEscuderia : escuderiasOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Temporada (" + temporada + ") cannot be destroyed since the Escuderia " + escuderiasOrphanCheckEscuderia + " in its escuderias field has a non-nullable temporada field.");
            }
            List<Piloto> pilotosOrphanCheck = temporada.getPilotos();
            for (Piloto pilotosOrphanCheckPiloto : pilotosOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Temporada (" + temporada + ") cannot be destroyed since the Piloto " + pilotosOrphanCheckPiloto + " in its pilotos field has a non-nullable temporada field.");
            }
            List<Carrera> carrerasOrphanCheck = temporada.getCarreras();
            for (Carrera carrerasOrphanCheckCarrera : carrerasOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Temporada (" + temporada + ") cannot be destroyed since the Carrera " + carrerasOrphanCheckCarrera + " in its carreras field has a non-nullable temporada field.");
            }
            List<PosicionConstructor> posicionesConstructoresOrphanCheck = temporada.getPosicionesConstructores();
            for (PosicionConstructor posicionesConstructoresOrphanCheckPosicionConstructor : posicionesConstructoresOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Temporada (" + temporada + ") cannot be destroyed since the PosicionConstructor " + posicionesConstructoresOrphanCheckPosicionConstructor + " in its posicionesConstructores field has a non-nullable temporada field.");
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            em.remove(temporada);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Temporada> findTemporadaEntities() {
        return findTemporadaEntities(true, -1, -1);
    }

    public List<Temporada> findTemporadaEntities(int maxResults, int firstResult) {
        return findTemporadaEntities(false, maxResults, firstResult);
    }

    private List<Temporada> findTemporadaEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Temporada.class));
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

    public Temporada findTemporada(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Temporada.class, id);
        } finally {
            em.close();
        }
    }

    public int getTemporadaCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Temporada> rt = cq.from(Temporada.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }
    
}
