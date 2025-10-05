/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 *
 * @author juand
 */
@Entity
@Table(name = "posicion_constructor")
public class PosicionConstructor implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idPosicion;

    @ManyToOne
    @JoinColumn(name = "idTemporada", nullable = false)
    private Temporada temporada;

    @ManyToOne
    @JoinColumn(name = "idConstructor", nullable = false)
    private Escuderia constructor;

    @Column(nullable = false)
    private int posicion;

    @Column(nullable = false)
    private double puntos;

    @Column(nullable = false)
    private int victorias;

    public PosicionConstructor() {
    }

    public PosicionConstructor(int idPosicion, Temporada temporada, Escuderia constructor, int posicion, double puntos, int victorias) {
        this.idPosicion = idPosicion;
        this.temporada = temporada;
        this.constructor = constructor;
        this.posicion = posicion;
        this.puntos = puntos;
        this.victorias = victorias;
    }

    public int getIdPosicion() {
        return idPosicion;
    }

    public void setIdPosicion(int idPosicion) {
        this.idPosicion = idPosicion;
    }

    public Temporada getTemporada() {
        return temporada;
    }

    public void setTemporada(Temporada temporada) {
        this.temporada = temporada;
    }

    public Escuderia getConstructor() {
        return constructor;
    }

    public void setConstructor(Escuderia constructor) {
        this.constructor = constructor;
    }

    public int getPosicion() {
        return posicion;
    }

    public void setPosicion(int posicion) {
        this.posicion = posicion;
    }

    public double getPuntos() {
        return puntos;
    }

    public void setPuntos(double puntos) {
        this.puntos = puntos;
    }

    public int getVictorias() {
        return victorias;
    }

    public void setVictorias(int victorias) {
        this.victorias = victorias;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idPosicion;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof PosicionConstructor)) {
            return false;
        }
        PosicionConstructor other = (PosicionConstructor) object;
        if (this.idPosicion != other.idPosicion) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Model.PosicionConstructor[ id=" + idPosicion + " ]";
    }

}
