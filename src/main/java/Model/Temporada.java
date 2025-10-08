/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import com.google.gson.annotations.Expose;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author juand
 */
@Entity
@Table(name = "temporadas")
public class Temporada implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Expose
  private int idTemporada;

  @Column(nullable = false, unique = true)
  @Expose
  private int anio;

  @OneToMany(mappedBy = "temporada")
  private List<Escuderia> escuderias;

  @OneToMany(mappedBy = "temporada")
  private List<Piloto> pilotos;

  @OneToMany(mappedBy = "temporada")
  private List<Carrera> carreras;

  @OneToMany(mappedBy = "temporada")
  private List<PosicionConstructor> posicionesConstructores;

  public Temporada() {
  }

  public Temporada(int idTemporada, int anio, List<Escuderia> escuderias, List<Piloto> pilotos, List<Carrera> carreras, List<PosicionConstructor> posicionesConstructores) {
    this.idTemporada = idTemporada;
    this.anio = anio;
    this.escuderias = escuderias;
    this.pilotos = pilotos;
    this.carreras = carreras;
    this.posicionesConstructores = posicionesConstructores;
  }

  public int getIdTemporada() {
    return idTemporada;
  }

  public void setIdTemporada(int idTemporada) {
    this.idTemporada = idTemporada;
  }

  public int getAnio() {
    return anio;
  }

  public void setAnio(int anio) {
    this.anio = anio;
  }

  public List<Escuderia> getEscuderias() {
    return escuderias;
  }

  public void setEscuderias(List<Escuderia> escuderias) {
    this.escuderias = escuderias;
  }

  public List<Piloto> getPilotos() {
    return pilotos;
  }

  public void setPilotos(List<Piloto> pilotos) {
    this.pilotos = pilotos;
  }

  public List<Carrera> getCarreras() {
    return carreras;
  }

  public void setCarreras(List<Carrera> carreras) {
    this.carreras = carreras;
  }

  public List<PosicionConstructor> getPosicionesConstructores() {
    return posicionesConstructores;
  }

  public void setPosicionesConstructores(List<PosicionConstructor> posicionesConstructores) {
    this.posicionesConstructores = posicionesConstructores;
  }

  @Override
  public int hashCode() {
    int hash = 0;
    hash += (int) idTemporada;
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Temporada)) {
      return false;
    }
    Temporada other = (Temporada) object;
    if (this.idTemporada != other.idTemporada) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Model.Temporada[ id=" + idTemporada + " ]";
  }
}
