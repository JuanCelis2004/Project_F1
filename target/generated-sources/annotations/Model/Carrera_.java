package Model;

import Model.Circuito;
import Model.HistorialCarrera;
import Model.Temporada;
import javax.annotation.Generated;
import javax.persistence.metamodel.ListAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.7.12.v20230209-rNA", date="2025-10-08T14:34:06")
@StaticMetamodel(Carrera.class)
public class Carrera_ { 

    public static volatile SingularAttribute<Carrera, Integer> idCarrera;
    public static volatile SingularAttribute<Carrera, Circuito> circuito;
    public static volatile SingularAttribute<Carrera, Temporada> temporada;
    public static volatile ListAttribute<Carrera, HistorialCarrera> historialCarreras;

}