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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author juand
 */
@Entity
@Table(name = "escuderias")
public class Escuderia implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Expose
  private int idEscuderia;

  @Column(nullable = false)
  @Expose
  private String nombre;

  @Column(nullable = false)
  @Expose
  private String base;

  @Column(nullable = false)
  @Expose
  private String jefe_equipo;

  @Column(nullable = false)
  @Expose
  private String jefe_tecnico;

  @Column(nullable = false)
  @Expose
  private String chasis;

  @Column(nullable = false)
  @Expose
  private String unidad_potencia;

  @ManyToOne
  @JoinColumn(name = "idTemporada", nullable = false)
  @Expose
  private Temporada temporada;

  @OneToMany(mappedBy = "escuderia")
  private List<Piloto> pilotos;

  @OneToMany(mappedBy = "constructor")
  private List<PosicionConstructor> posicionesConstructores;

  public Escuderia() {
  }

  public Escuderia(int idEscuderia, String nombre, String base, String jefe_equipo, String jefe_tecnico, String chasis, String unidad_potencia, Temporada temporada, List<Piloto> pilotos, List<PosicionConstructor> posicionesConstructores) {
    this.idEscuderia = idEscuderia;
    this.nombre = nombre;
    this.base = base;
    this.jefe_equipo = jefe_equipo;
    this.jefe_tecnico = jefe_tecnico;
    this.chasis = chasis;
    this.unidad_potencia = unidad_potencia;
    this.temporada = temporada;
    this.pilotos = pilotos;
    this.posicionesConstructores = posicionesConstructores;
  }

  public int getIdEscuderia() {
    return idEscuderia;
  }

  public void setIdEscuderia(int idEscuderia) {
    this.idEscuderia = idEscuderia;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getBase() {
    return base;
  }

  public void setBase(String base) {
    this.base = base;
  }

  public String getJefe_equipo() {
    return jefe_equipo;
  }

  public void setJefe_equipo(String jefe_equipo) {
    this.jefe_equipo = jefe_equipo;
  }

  public String getJefe_tecnico() {
    return jefe_tecnico;
  }

  public void setJefe_tecnico(String jefe_tecnico) {
    this.jefe_tecnico = jefe_tecnico;
  }

  public String getChasis() {
    return chasis;
  }

  public void setChasis(String chasis) {
    this.chasis = chasis;
  }

  public String getUnidad_potencia() {
    return unidad_potencia;
  }

  public void setUnidad_potencia(String unidad_potencia) {
    this.unidad_potencia = unidad_potencia;
  }

  public Temporada getTemporada() {
    return temporada;
  }

  public void setTemporada(Temporada temporada) {
    this.temporada = temporada;
  }

  public List<Piloto> getPilotos() {
    return pilotos;
  }

  public void setPilotos(List<Piloto> pilotos) {
    this.pilotos = pilotos;
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
    hash += (int) idEscuderia;
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Escuderia)) {
      return false;
    }
    Escuderia other = (Escuderia) object;
    if (this.idEscuderia != other.idEscuderia) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Model.Escuderia[ id=" + idEscuderia + " ]";
  }

}
