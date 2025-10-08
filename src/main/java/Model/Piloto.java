/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

import com.google.gson.annotations.Expose;
import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author juand
 */
@Entity
@Table(name = "pilotos")
public class Piloto implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Expose
  private int idPiloto;

  @Column(nullable = false)
  @Expose
  private String nombre;

  @Column(name = "no_piloto", nullable = false)
  @Expose
  private int noPiloto;

  @Column(nullable = false)
  @Expose
  private String codigo;

  @Column(nullable = false)
  @Expose
  private String podios;

  @Column(nullable = false)
  @Expose
  private double puntos;

  @Column(name = "campeonatos_ganados", nullable = false)
  @Expose
  private int campeonatosGanados;

  @Column(name = "posicion_mas_alta", nullable = false)
  @Expose
  private int posicionMasAlta;

  @Temporal(TemporalType.DATE)
  @Column(name = "fecha_nacimiento", nullable = false)
  @Expose
  private Date fechaNacimiento;

  @Column(name = "lugar_nacimiento", nullable = false)
  @Expose
  private String lugarNacimiento;

  @ManyToOne
  @JoinColumn(name = "idEscuderia", nullable = false)
  @Expose
  private Escuderia escuderia;

  @ManyToOne
  @JoinColumn(name = "idTemporada", nullable = false)
  @Expose
  private Temporada temporada;

  @OneToMany(mappedBy = "piloto")
  private List<HistorialCarrera> historialCarreras;

  public Piloto() {
  }

  public Piloto(int idPiloto, String nombre, int noPiloto, String codigo, String podios, double puntos, int campeonatosGanados, int posicionMasAlta, Date fechaNacimiento, String lugarNacimiento, Escuderia escuderia, Temporada temporada, List<HistorialCarrera> historialCarreras) {
    this.idPiloto = idPiloto;
    this.nombre = nombre;
    this.noPiloto = noPiloto;
    this.codigo = codigo;
    this.podios = podios;
    this.puntos = puntos;
    this.campeonatosGanados = campeonatosGanados;
    this.posicionMasAlta = posicionMasAlta;
    this.fechaNacimiento = fechaNacimiento;
    this.lugarNacimiento = lugarNacimiento;
    this.escuderia = escuderia;
    this.temporada = temporada;
    this.historialCarreras = historialCarreras;
  }

  public int getIdPiloto() {
    return idPiloto;
  }

  public void setIdPiloto(int idPiloto) {
    this.idPiloto = idPiloto;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public int getNoPiloto() {
    return noPiloto;
  }

  public void setNoPiloto(int noPiloto) {
    this.noPiloto = noPiloto;
  }

  public String getCodigo() {
    return codigo;
  }

  public void setCodigo(String codigo) {
    this.codigo = codigo;
  }

  public String getPodios() {
    return podios;
  }

  public void setPodios(String podios) {
    this.podios = podios;
  }

  public double getPuntos() {
    return puntos;
  }

  public void setPuntos(double puntos) {
    this.puntos = puntos;
  }

  public int getCampeonatosGanados() {
    return campeonatosGanados;
  }

  public void setCampeonatosGanados(int campeonatosGanados) {
    this.campeonatosGanados = campeonatosGanados;
  }

  public int getPosicionMasAlta() {
    return posicionMasAlta;
  }

  public void setPosicionMasAlta(int posicionMasAlta) {
    this.posicionMasAlta = posicionMasAlta;
  }

  public Date getFechaNacimiento() {
    return fechaNacimiento;
  }

  public void setFechaNacimiento(Date fechaNacimiento) {
    this.fechaNacimiento = fechaNacimiento;
  }

  public String getLugarNacimiento() {
    return lugarNacimiento;
  }

  public void setLugarNacimiento(String lugarNacimiento) {
    this.lugarNacimiento = lugarNacimiento;
  }

  public Escuderia getEscuderia() {
    return escuderia;
  }

  public void setEscuderia(Escuderia escuderia) {
    this.escuderia = escuderia;
  }

  public Temporada getTemporada() {
    return temporada;
  }

  public void setTemporada(Temporada temporada) {
    this.temporada = temporada;
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
    hash += (int) idPiloto;
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Piloto)) {
      return false;
    }
    Piloto other = (Piloto) object;
    if (this.idPiloto != other.idPiloto) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Model.Piloto[ id=" + idPiloto + " ]";
  }

}
