package Model;

import Model.Carrera;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-11-09T14:45:30")
@StaticMetamodel(Circuito.class)
public class Circuito_ { 

    public static volatile ListAttribute<Circuito, Carrera> carreras;
    public static volatile SingularAttribute<Circuito, Double> lng;
    public static volatile SingularAttribute<Circuito, String> localidad;
    public static volatile SingularAttribute<Circuito, Integer> idCircuito;
    public static volatile SingularAttribute<Circuito, String> nombre;
    public static volatile SingularAttribute<Circuito, Double> lat;
    public static volatile SingularAttribute<Circuito, String> pais;

}