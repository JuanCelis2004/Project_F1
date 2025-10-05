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
@Table(name = "historial_carreras")
public class HistorialCarrera implements Serializable {

    private static final long serialVersionUID = 1L;
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idHistorial;

    @ManyToOne
    @JoinColumn(name = "idCarrera", nullable = false)
    private Carrera carrera;

    @ManyToOne
    @JoinColumn(name = "idPiloto", nullable = false)
    private Piloto piloto;

    @Column(nullable = false)
    private int posicion;

    @Column(name = "posicion_parrilla_salida", nullable = false)
    private int posicionParrillaSalida;

    @Column(nullable = false)
    private int vueltas;

    @Column(name = "tiempo_carrera", nullable = false)
    private String tiempoCarrera;

    @Column(nullable = false)
    private double puntos;

    @Column(name = "mejor_tiempo")
    private String mejorTiempo;

    public HistorialCarrera() {
    }

    public HistorialCarrera(int idHistorial, Carrera carrera, Piloto piloto, int posicion, int posicionParrillaSalida, int vueltas, String tiempoCarrera, double puntos, String mejorTiempo) {
        this.idHistorial = idHistorial;
        this.carrera = carrera;
        this.piloto = piloto;
        this.posicion = posicion;
        this.posicionParrillaSalida = posicionParrillaSalida;
        this.vueltas = vueltas;
        this.tiempoCarrera = tiempoCarrera;
        this.puntos = puntos;
        this.mejorTiempo = mejorTiempo;
    }

    public int getIdHistorial() {
        return idHistorial;
    }

    public void setIdHistorial(int idHistorial) {
        this.idHistorial = idHistorial;
    }

    public Carrera getCarrera() {
        return carrera;
    }

    public void setCarrera(Carrera carrera) {
        this.carrera = carrera;
    }

    public Piloto getPiloto() {
        return piloto;
    }

    public void setPiloto(Piloto piloto) {
        this.piloto = piloto;
    }

    public int getPosicion() {
        return posicion;
    }

    public void setPosicion(int posicion) {
        this.posicion = posicion;
    }

    public int getPosicionParrillaSalida() {
        return posicionParrillaSalida;
    }

    public void setPosicionParrillaSalida(int posicionParrillaSalida) {
        this.posicionParrillaSalida = posicionParrillaSalida;
    }

    public int getVueltas() {
        return vueltas;
    }

    public void setVueltas(int vueltas) {
        this.vueltas = vueltas;
    }

    public String getTiempoCarrera() {
        return tiempoCarrera;
    }

    public void setTiempoCarrera(String tiempoCarrera) {
        this.tiempoCarrera = tiempoCarrera;
    }

    public double getPuntos() {
        return puntos;
    }

    public void setPuntos(double puntos) {
        this.puntos = puntos;
    }

    public String getMejorTiempo() {
        return mejorTiempo;
    }

    public void setMejorTiempo(String mejorTiempo) {
        this.mejorTiempo = mejorTiempo;
    }

    

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (int) idHistorial;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof HistorialCarrera)) {
            return false;
        }
        HistorialCarrera other = (HistorialCarrera) object;
        if (this.idHistorial != other.idHistorial) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Model.HistorialCarrera[ id=" + idHistorial + " ]";
    }
    
}
