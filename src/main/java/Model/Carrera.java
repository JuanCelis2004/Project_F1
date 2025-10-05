/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author juand
 */
@Entity
@Table(name = "carreras")
public class Carrera implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCarrera;

    @ManyToOne
    @JoinColumn(name = "idTemporada", nullable = false)
    private Temporada temporada;

    @ManyToOne
    @JoinColumn(name = "idCircuito", nullable = false)
    private Circuito circuito;

    @OneToMany(mappedBy = "carrera")
    private List<HistorialCarrera> historialCarreras;

    public Carrera() {
    }

    public Carrera(int idCarrera, Temporada temporada, Circuito circuito, List<HistorialCarrera> historialCarreras) {
        this.idCarrera = idCarrera;
        this.temporada = temporada;
        this.circuito = circuito;
        this.historialCarreras = historialCarreras;
    }

    public int getIdCarrera() {
        return idCarrera;
    }

    public void setIdCarrera(int idCarrera) {
        this.idCarrera = idCarrera;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public void setTemporada(Temporada temporada) {
        this.temporada = temporada;
    }

    public Circuito getCircuito() {
        return circuito;
    }

    public void setCircuito(Circuito circuito) {
        this.circuito = circuito;
    }

    public List<HistorialCarrera> getHistorialCarreras() {
        return historialCarreras;
    }

    public void setHistorialCarreras(List<HistorialCarrera> historialCarreras) {
        this.historialCarreras = historialCarreras;
    }

    
   

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idCarrera;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Carrera)) {
            return false;
        }
        Carrera other = (Carrera) object;
        if (this.idCarrera != other.idCarrera) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Model.Carrera[ id=" + idCarrera + " ]";
    }
    
}
