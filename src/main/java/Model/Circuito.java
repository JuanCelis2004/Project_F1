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
@Table(name = "circuitos")
public class Circuito implements Serializable {

  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Expose
  private int idCircuito;

  @Column(nullable = false)
  @Expose
  private String nombre;

  @Column(nullable = false)
  @Expose
  private String localidad;

  @Column(nullable = false)
  @Expose
  private String pais;

  @Expose
  private Double lat;

  @Expose
  private Double lng;

  @OneToMany(mappedBy = "circuito")
  private List<Carrera> carreras;

  public Circuito() {
  }

  public Circuito(int idCircuito, String nombre, String localidad, String pais, Double lat, Double lng, List<Carrera> carreras) {
    this.idCircuito = idCircuito;
    this.nombre = nombre;
    this.localidad = localidad;
    this.pais = pais;
    this.lat = lat;
    this.lng = lng;
    this.carreras = carreras;
  }

  public int getIdCircuito() {
    return idCircuito;
  }

  public void setIdCircuito(int idCircuito) {
    this.idCircuito = idCircuito;
  }

  public String getNombre() {
    return nombre;
  }

  public void setNombre(String nombre) {
    this.nombre = nombre;
  }

  public String getLocalidad() {
    return localidad;
  }

  public void setLocalidad(String localidad) {
    this.localidad = localidad;
  }

  public String getPais() {
    return pais;
  }

  public void setPais(String pais) {
    this.pais = pais;
  }

  public Double getLat() {
    return lat;
  }

  public void setLat(Double lat) {
    this.lat = lat;
  }

  public Double getLng() {
    return lng;
  }

  public void setLng(Double lng) {
    this.lng = lng;
  }

  public List<Carrera> getCarreras() {
    return carreras;
  }

  public void setCarreras(List<Carrera> carreras) {
    this.carreras = carreras;
  }

  @Override
  public int hashCode() {
    int hash = 0;
    hash += (int) idCircuito;
    return hash;
  }

  @Override
  public boolean equals(Object object) {
    // TODO: Warning - this method won't work in the case the id fields are not set
    if (!(object instanceof Circuito)) {
      return false;
    }
    Circuito other = (Circuito) object;
    if (this.idCircuito != other.idCircuito) {
      return false;
    }
    return true;
  }

  @Override
  public String toString() {
    return "Model.Circuito[ id=" + idCircuito + " ]";
  }

}
