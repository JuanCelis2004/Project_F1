package Model;

import Model.Carrera;
import Model.Piloto;
import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-11-09T14:45:30")
@StaticMetamodel(HistorialCarrera.class)
public class HistorialCarrera_ { 

    public static volatile SingularAttribute<HistorialCarrera, Integer> posicion;
    public static volatile SingularAttribute<HistorialCarrera, String> mejorTiempo;
    public static volatile SingularAttribute<HistorialCarrera, Integer> posicionParrillaSalida;
    public static volatile SingularAttribute<HistorialCarrera, Integer> vueltas;
    public static volatile SingularAttribute<HistorialCarrera, String> tiempoCarrera;
    public static volatile SingularAttribute<HistorialCarrera, Integer> idHistorial;
    public static volatile SingularAttribute<HistorialCarrera, Carrera> carrera;
    public static volatile SingularAttribute<HistorialCarrera, Double> puntos;
    public static volatile SingularAttribute<HistorialCarrera, Piloto> piloto;

}