/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Persistence;

import Model.Escuderia;
import java.io.Serializable;
import javax.persistence.Query;
import javax.persistence.EntityNotFoundException;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import Model.Temporada;
import Model.Piloto;
import java.util.ArrayList;
import java.util.List;
import Model.PosicionConstructor;
import Persistence.exceptions.IllegalOrphanException;
import Persistence.exceptions.NonexistentEntityException;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

/**
 *
 * @author juand
 */
public class EscuderiaJpaController implements Serializable {

    public EscuderiaJpaController(EntityManagerFactory emf) {
        this.emf = emf;
    }
    private EntityManagerFactory emf = null;

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }

    public EscuderiaJpaController() {
        emf = Persistence.createEntityManagerFactory("F1_PU");
    }

    public void create(Escuderia escuderia) {
        if (escuderia.getPilotos() == null) {
            escuderia.setPilotos(new ArrayList<Piloto>());
        }
        if (escuderia.getPosicionesConstructores() == null) {
            escuderia.setPosicionesConstructores(new ArrayList<PosicionConstructor>());
        }
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Temporada temporada = escuderia.getTemporada();
            if (temporada != null) {
                temporada = em.getReference(temporada.getClass(), temporada.getIdTemporada());
                escuderia.setTemporada(temporada);
            }
            List<Piloto> attachedPilotos = new ArrayList<Piloto>();
            for (Piloto pilotosPilotoToAttach : escuderia.getPilotos()) {
                pilotosPilotoToAttach = em.getReference(pilotosPilotoToAttach.getClass(), pilotosPilotoToAttach.getIdPiloto());
                attachedPilotos.add(pilotosPilotoToAttach);
            }
            escuderia.setPilotos(attachedPilotos);
            List<PosicionConstructor> attachedPosicionesConstructores = new ArrayList<PosicionConstructor>();
            for (PosicionConstructor posicionesConstructoresPosicionConstructorToAttach : escuderia.getPosicionesConstructores()) {
                posicionesConstructoresPosicionConstructorToAttach = em.getReference(posicionesConstructoresPosicionConstructorToAttach.getClass(), posicionesConstructoresPosicionConstructorToAttach.getIdPosicion());
                attachedPosicionesConstructores.add(posicionesConstructoresPosicionConstructorToAttach);
            }
            escuderia.setPosicionesConstructores(attachedPosicionesConstructores);
            em.persist(escuderia);
            if (temporada != null) {
                temporada.getEscuderias().add(escuderia);
                temporada = em.merge(temporada);
            }
            for (Piloto pilotosPiloto : escuderia.getPilotos()) {
                Escuderia oldEscuderiaOfPilotosPiloto = pilotosPiloto.getEscuderia();
                pilotosPiloto.setEscuderia(escuderia);
                pilotosPiloto = em.merge(pilotosPiloto);
                if (oldEscuderiaOfPilotosPiloto != null) {
                    oldEscuderiaOfPilotosPiloto.getPilotos().remove(pilotosPiloto);
                    oldEscuderiaOfPilotosPiloto = em.merge(oldEscuderiaOfPilotosPiloto);
                }
            }
            for (PosicionConstructor posicionesConstructoresPosicionConstructor : escuderia.getPosicionesConstructores()) {
                Escuderia oldConstructorOfPosicionesConstructoresPosicionConstructor = posicionesConstructoresPosicionConstructor.getConstructor();
                posicionesConstructoresPosicionConstructor.setConstructor(escuderia);
                posicionesConstructoresPosicionConstructor = em.merge(posicionesConstructoresPosicionConstructor);
                if (oldConstructorOfPosicionesConstructoresPosicionConstructor != null) {
                    oldConstructorOfPosicionesConstructoresPosicionConstructor.getPosicionesConstructores().remove(posicionesConstructoresPosicionConstructor);
                    oldConstructorOfPosicionesConstructoresPosicionConstructor = em.merge(oldConstructorOfPosicionesConstructoresPosicionConstructor);
                }
            }
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public void edit(Escuderia escuderia) throws IllegalOrphanException, NonexistentEntityException, Exception {
        EntityManager em = null;
        try {
            em = getEntityManager();
            em.getTransaction().begin();
            Escuderia persistentEscuderia = em.find(Escuderia.class, escuderia.getIdEscuderia());
            Temporada temporadaOld = persistentEscuderia.getTemporada();
            Temporada temporadaNew = escuderia.getTemporada();
            List<Piloto> pilotosOld = persistentEscuderia.getPilotos();
            List<Piloto> pilotosNew = escuderia.getPilotos();
            List<PosicionConstructor> posicionesConstructoresOld = persistentEscuderia.getPosicionesConstructores();
            List<PosicionConstructor> posicionesConstructoresNew = escuderia.getPosicionesConstructores();
            List<String> illegalOrphanMessages = null;
            for (Piloto pilotosOldPiloto : pilotosOld) {
                if (!pilotosNew.contains(pilotosOldPiloto)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain Piloto " + pilotosOldPiloto + " since its escuderia field is not nullable.");
                }
            }
            for (PosicionConstructor posicionesConstructoresOldPosicionConstructor : posicionesConstructoresOld) {
                if (!posicionesConstructoresNew.contains(posicionesConstructoresOldPosicionConstructor)) {
                    if (illegalOrphanMessages == null) {
                        illegalOrphanMessages = new ArrayList<String>();
                    }
                    illegalOrphanMessages.add("You must retain PosicionConstructor " + posicionesConstructoresOldPosicionConstructor + " since its constructor field is not nullable.");
                }
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            if (temporadaNew != null) {
                temporadaNew = em.getReference(temporadaNew.getClass(), temporadaNew.getIdTemporada());
                escuderia.setTemporada(temporadaNew);
            }
            List<Piloto> attachedPilotosNew = new ArrayList<Piloto>();
            for (Piloto pilotosNewPilotoToAttach : pilotosNew) {
                pilotosNewPilotoToAttach = em.getReference(pilotosNewPilotoToAttach.getClass(), pilotosNewPilotoToAttach.getIdPiloto());
                attachedPilotosNew.add(pilotosNewPilotoToAttach);
            }
            pilotosNew = attachedPilotosNew;
            escuderia.setPilotos(pilotosNew);
            List<PosicionConstructor> attachedPosicionesConstructoresNew = new ArrayList<PosicionConstructor>();
            for (PosicionConstructor posicionesConstructoresNewPosicionConstructorToAttach : posicionesConstructoresNew) {
                posicionesConstructoresNewPosicionConstructorToAttach = em.getReference(posicionesConstructoresNewPosicionConstructorToAttach.getClass(), posicionesConstructoresNewPosicionConstructorToAttach.getIdPosicion());
                attachedPosicionesConstructoresNew.add(posicionesConstructoresNewPosicionConstructorToAttach);
            }
            posicionesConstructoresNew = attachedPosicionesConstructoresNew;
            escuderia.setPosicionesConstructores(posicionesConstructoresNew);
            escuderia = em.merge(escuderia);
            if (temporadaOld != null && !temporadaOld.equals(temporadaNew)) {
                temporadaOld.getEscuderias().remove(escuderia);
                temporadaOld = em.merge(temporadaOld);
            }
            if (temporadaNew != null && !temporadaNew.equals(temporadaOld)) {
                temporadaNew.getEscuderias().add(escuderia);
                temporadaNew = em.merge(temporadaNew);
            }
            for (Piloto pilotosNewPiloto : pilotosNew) {
                if (!pilotosOld.contains(pilotosNewPiloto)) {
                    Escuderia oldEscuderiaOfPilotosNewPiloto = pilotosNewPiloto.getEscuderia();
                    pilotosNewPiloto.setEscuderia(escuderia);
                    pilotosNewPiloto = em.merge(pilotosNewPiloto);
                    if (oldEscuderiaOfPilotosNewPiloto != null && !oldEscuderiaOfPilotosNewPiloto.equals(escuderia)) {
                        oldEscuderiaOfPilotosNewPiloto.getPilotos().remove(pilotosNewPiloto);
                        oldEscuderiaOfPilotosNewPiloto = em.merge(oldEscuderiaOfPilotosNewPiloto);
                    }
                }
            }
            for (PosicionConstructor posicionesConstructoresNewPosicionConstructor : posicionesConstructoresNew) {
                if (!posicionesConstructoresOld.contains(posicionesConstructoresNewPosicionConstructor)) {
                    Escuderia oldConstructorOfPosicionesConstructoresNewPosicionConstructor = posicionesConstructoresNewPosicionConstructor.getConstructor();
                    posicionesConstructoresNewPosicionConstructor.setConstructor(escuderia);
                    posicionesConstructoresNewPosicionConstructor = em.merge(posicionesConstructoresNewPosicionConstructor);
                    if (oldConstructorOfPosicionesConstructoresNewPosicionConstructor != null && !oldConstructorOfPosicionesConstructoresNewPosicionConstructor.equals(escuderia)) {
                        oldConstructorOfPosicionesConstructoresNewPosicionConstructor.getPosicionesConstructores().remove(posicionesConstructoresNewPosicionConstructor);
                        oldConstructorOfPosicionesConstructoresNewPosicionConstructor = em.merge(oldConstructorOfPosicionesConstructoresNewPosicionConstructor);
                    }
                }
            }
            em.getTransaction().commit();
        } catch (Exception ex) {
            String msg = ex.getLocalizedMessage();
            if (msg == null || msg.length() == 0) {
                int id = escuderia.getIdEscuderia();
                if (findEscuderia(id) == null) {
                    throw new NonexistentEntityException("The escuderia with id " + id + " no longer exists.");
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
            Escuderia escuderia;
            try {
                escuderia = em.getReference(Escuderia.class, id);
                escuderia.getIdEscuderia();
            } catch (EntityNotFoundException enfe) {
                throw new NonexistentEntityException("The escuderia with id " + id + " no longer exists.", enfe);
            }
            List<String> illegalOrphanMessages = null;
            List<Piloto> pilotosOrphanCheck = escuderia.getPilotos();
            for (Piloto pilotosOrphanCheckPiloto : pilotosOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Escuderia (" + escuderia + ") cannot be destroyed since the Piloto " + pilotosOrphanCheckPiloto + " in its pilotos field has a non-nullable escuderia field.");
            }
            List<PosicionConstructor> posicionesConstructoresOrphanCheck = escuderia.getPosicionesConstructores();
            for (PosicionConstructor posicionesConstructoresOrphanCheckPosicionConstructor : posicionesConstructoresOrphanCheck) {
                if (illegalOrphanMessages == null) {
                    illegalOrphanMessages = new ArrayList<String>();
                }
                illegalOrphanMessages.add("This Escuderia (" + escuderia + ") cannot be destroyed since the PosicionConstructor " + posicionesConstructoresOrphanCheckPosicionConstructor + " in its posicionesConstructores field has a non-nullable constructor field.");
            }
            if (illegalOrphanMessages != null) {
                throw new IllegalOrphanException(illegalOrphanMessages);
            }
            Temporada temporada = escuderia.getTemporada();
            if (temporada != null) {
                temporada.getEscuderias().remove(escuderia);
                temporada = em.merge(temporada);
            }
            em.remove(escuderia);
            em.getTransaction().commit();
        } finally {
            if (em != null) {
                em.close();
            }
        }
    }

    public List<Escuderia> findEscuderiaEntities() {
        return findEscuderiaEntities(true, -1, -1);
    }

    public List<Escuderia> findEscuderiaEntities(int maxResults, int firstResult) {
        return findEscuderiaEntities(false, maxResults, firstResult);
    }

    private List<Escuderia> findEscuderiaEntities(boolean all, int maxResults, int firstResult) {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            cq.select(cq.from(Escuderia.class));
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

    public List<Escuderia> findEscuderiasByAnio(int anio) {
        EntityManager em = getEntityManager();
        try {
            return em.createQuery("SELECT e FROM Escuderia e WHERE e.temporada.anio = :anio", Escuderia.class)
                    .setParameter("anio", anio)
                    .getResultList();
        } finally {
            em.close();
        }
    }

    public Escuderia findEscuderia(int id) {
        EntityManager em = getEntityManager();
        try {
            return em.find(Escuderia.class, id);
        } finally {
            em.close();
        }
    }

    public int getEscuderiaCount() {
        EntityManager em = getEntityManager();
        try {
            CriteriaQuery cq = em.getCriteriaBuilder().createQuery();
            Root<Escuderia> rt = cq.from(Escuderia.class);
            cq.select(em.getCriteriaBuilder().count(rt));
            Query q = em.createQuery(cq);
            return ((Long) q.getSingleResult()).intValue();
        } finally {
            em.close();
        }
    }

}
